import catchAsync from "../utils/catchAsync.js";
import Conservation from '../models/conversation.js';
import { createNewConversation, findConversationIncludesTwoUser, findConversationOfAUser } from "../services/conversationService.js";
import { ErrorHandler } from "../helpers/error.js";
import errorMessages from "../../config/errorMessages.js";
import { findUserById, findUserByUsername } from "../services/userService.js";

export const createConversation = catchAsync(async(req,res,next) => {
    try {
        const sender = await findUserByUsername(req.body.senderUsername)
        const receiver = await findUserByUsername(req.body.receiverUsername)
        if(sender&&receiver){
            const newConservation = new Conservation({
                members: [sender._id,receiver._id],
            });
            const conversation = await createNewConversation(newConservation);
            res.status(201).json({
                message:'Conversation created successfully',
                data:conversation
            });
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        }
    } catch(err) {
        console.log(err)
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})

export const getConversationOfAUser = catchAsync(async(req,res,next) => {
    try {
        const user = await findUserById(req.params.userId);
        if(user){
        const conversation = await findConversationOfAUser(req.params.userId);
        res.status(200).json({
            message:'Conversations fetched successfully',
            data:conversation
        })
        } else {
        return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        }
    } catch (error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR)
    }
})

export const getConversationIncludeTwoUser = catchAsync(async(req,res,next) => {
    try {
        const firstUser = await findUserById(req.params.firstUserId);
        const secondUser = await findUserById(req,params.secondUserId);
        if(firstUser&&secondUser){
            const conversation = await findConversationIncludesTwoUser(req.params.firstUserId,req.params.secondUserId);
            res.status(200).json({
                message:'Conversation fetched successfully',
                data:conversation
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        }
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})