import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import request from 'request';
import { ErrorHandler } from './app/helpers/error.js';


const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
    origin: (origin,callback) => {
        callback(null,true)
    }
}

app.options('*', cors(corsOptions))

app.use('/comicvine/api',cors(corsOptions), (req,res) => {
    const request_url = `${process.env.COMV_SERVICE_URL}${req.url.replace(`${req.baseUrl}-`,'')}`
    req.pipe(request(request_url)).pipe(res)
})

import comicNewsRouter from './app/routes/comicNewsRouter.js';
app.use('/comicnews',comicNewsRouter);

import booksNewsRouter from './app/routes/booksNewsRouter.js';
app.use('/booksnews',booksNewsRouter);

import usersRouter from './app/routes/usersRouter.js';
app.use('/users',usersRouter);


app.all('*', (req, res, next) => {
    next(new ErrorHandler(404,`Can't find ${req.originalUrl} on this server!`));
    });

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD}@joyworld.n89cd.mongodb.net/${
    process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Database is connected!');
}).catch(error => {
    console.log(error)
});

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
})
