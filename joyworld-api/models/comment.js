const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    body: {type:String,required:true},
    createdAt: {type:Date,required:true},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps:true});