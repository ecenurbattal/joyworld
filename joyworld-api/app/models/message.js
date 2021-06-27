import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Conversation'
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    text: {
        type:String,
    }
},{timestamps:true});

const Message = mongoose.model('Message',messageSchema);

export default Message;