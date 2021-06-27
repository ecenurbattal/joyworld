import Message from "../models/message.js";

export const createNewMessage = async (message) => {
    let user = await message.save()
    return await user.populate({path:'sender',select:'avatar'}).execPopulate();
};


export const findMessages = async (conversationId) => {
    return await Message.find({conversationId:conversationId}).populate({path:'sender',select:'avatar'})
};