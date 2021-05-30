import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD}@joyworld.n89cd.mongodb.net/${
        process.env.MONGO_DB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    console.log('Database is connected!');
};

export default connectDB;