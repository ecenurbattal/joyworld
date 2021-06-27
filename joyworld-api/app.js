import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import request from 'request';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { ErrorHandler } from './app/helpers/error.js';
import {applyPassportStrategy} from './config/passport.js';
import connectDB from './config/db.js';

const app = express();
dotenv.config();


app.set('trust proxy', true)


const __dirname = path.resolve(path.dirname(''))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/app/views'));



const PORT = process.env.PORT || 8080;

applyPassportStrategy(passport);
app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(cookieParser());
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

import authRouter from './app/routes/authRouter.js';
app.use('/auth',authRouter);

import postsRouter from './app/routes/postsRouter.js';
app.use('/posts',postsRouter);

import productsRouter from './app/routes/productsRouter.js';
app.use('/products',productsRouter);

import paymentRouter from './app/routes/paymentRouter.js';
app.use('/payment',paymentRouter);

import ordersRouter from './app/routes/ordersRouter.js';
app.use('/orders',ordersRouter);

import conversationRouter from './app/routes/conversationRouter.js';
app.use('/conversations',conversationRouter);

import messageRouter from './app/routes/messageRouter.js';
app.use('/messages',messageRouter)



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

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
//     process.env.MONGO_PASSWORD}@joyworld.n89cd.mongodb.net/${
//     process.env.MONGO_DB}?retryWrites=true&w=majority`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// }).then(() => {
//     console.log('Database is connected!');
//     app.listen(PORT, () => {
//         console.log(`Server is running on ${PORT}`);
//     });
// });


//database and server

connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})


import io from './sockets.js';
io.attach(server);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});


