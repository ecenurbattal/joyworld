import Conversation from '../models/conversation.js';

export const createNewConversation = async (conversation) => {
    return await conversation.save();
}

export const findConversationOfAUser = async (userId) => {
    return await Conversation.find({
        members: {$in: [userId]},
    })
}

export const findConversationIncludesTwoUser = async (firstUserId, secondUserId) => {
    return await Conversation.findOne({
        members: {$all:[firstUserId,secondUserId]}
    })
}