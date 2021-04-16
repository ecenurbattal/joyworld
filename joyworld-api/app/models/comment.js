import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = Schema({
    body: {
        type:String,
        required:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    belongTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {timestamps:true});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;