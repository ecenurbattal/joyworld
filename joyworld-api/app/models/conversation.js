import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
        members:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ],
    },
    {timestamps: true}
);

const Conversation = mongoose.model('Conversation',conversationSchema);

export default Conversation;