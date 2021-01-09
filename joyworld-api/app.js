const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const {createProxyMiddleware} = require('http-proxy-middleware');
const request = require('request');


const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD}@joyworld.n89cd.mongodb.net/${
    process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Database is connected!')
}).catch(error => {
    console.log(error)
});


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


const corsOptions = {
    origin: (origin,callback) => {
        callback(null,true)
    }
}

app.options('*', cors(corsOptions))

app.use('/api',cors(corsOptions), (req,res) => {
    console.log(req)
    const request_url = `${process.env.COMV_SERVICE_URL}${req.url}`
    req.pipe(request({qs:req.query, uri:request_url})).pipe(res)
})


// app.get('/api',createProxyMiddleware({
//     target: process.env.COMV_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         [`^/api`]: '',
//     }
// }))


app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
})