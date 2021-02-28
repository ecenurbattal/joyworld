import mongoose from 'mongoose';
import {convertDateToTurkeyTz} from '../utils/dateUtils.js';

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
    trustPoint: {
        count: {
            type:Number,
            default: 0,
            trim:true,
        },
        point : {
            type:Number,
            default: 0,
            trim:true,
        }
    },
    description: {
        type:String,
        trim:true,
        maxlength:250,
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
},{timestamps: { currentTime: () => convertDateToTurkeyTz()}});

const User = mongoose.model('User',userSchema);

export default User;