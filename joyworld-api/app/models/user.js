import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:5
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password: {
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    avatar: {
        type:String,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
});

const User = mongoose.model('User',userSchema);

export default User;