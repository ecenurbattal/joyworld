import errorMessages from "../../config/errorMessages.js";
import { ErrorHandler } from "../helpers/error.js";
import Message from "../models/message.js";
import { createNewMessage, findMessages } from "../services/messageService.js";
import catchAsync from "../utils/catchAsync.js";

export const createMessage = catchAsync(async(req,res,next) => {
    try {
        const newMessage = new Message(req.body)
        const message = await createNewMessage(newMessage);
        //const messages = await findMessages(message.conversationId)
        res.status(201).json({
            message:'Message created successfully',
            data:message
        })
    } catch (error) {
        console.log(error)
        throw new ErrorHandler(500,error);
    }
});

export const getMessages = catchAsync(async(req,res,next) => {
    try {
        const messages = await findMessages(req.params.conversationId);
        res.status(200).json({
            message:'Messages fetched successfully',
            data:messages
        })
    } catch (error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})