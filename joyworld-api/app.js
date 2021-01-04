const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD}@joyworld.n89cd.mongodb.net/${
    process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('db is connected!')
}).catch(error => {
    console.log(error)
});


app.use(cors());
app.use(express.json());




app.listen(8080, () => {
    console.log('Server is running!');
})