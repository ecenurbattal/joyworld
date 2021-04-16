import mongoose from 'mongoose';
import {convertDateToTurkeyTz} from '../utils/dateUtils.js';


const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    },
    tag: {
        type:String,
        required:true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
},{timestamps:true});

const Post = mongoose.model('Post',postSchema);

export default Post;