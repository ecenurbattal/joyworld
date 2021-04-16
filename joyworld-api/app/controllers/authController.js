import User from '../models/user.js';
import {createUser,findUserByUsername} from '../services/userService.js';
import errorMessages from '../../config/errorMessages.js';
import { ErrorHandler } from '../helpers/error.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js'

export const register = catchAsync( async (req,res,next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const newUser = new User({
            username:req.body.username,
            password:hashedPassword,
            email:req.body.email,
            name:req.body.name,
            avatar:req.body.avatar,
        })
        const user = await createUser(newUser);
        const token = jwt.sign ({id:user._id}, process.env.JWT_SECRET, {expiresIn: 3600});
        delete user._doc['password'];
        res.status(201).json({
        message:'User created successfully',
        data:{
            token:token,
            user:user,
            }
        })
    } catch(err) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR)
    }
})

export const login = catchAsync( async (req,res,next) => {
    try {
        const user = await findUserByUsername(req.body.username);
        if(user){
            const isMatch = await bcrypt.compare(req.body.password,user.password);
            if(!isMatch) return next(new ErrorHandler(400,errorMessages.USER_INVALID_CREDENTIALS));
            const token = jwt.sign ({id:user._id}, process.env.JWT_SECRET, {expiresIn: 3600});
            delete user._doc['password'];
            res.status(200).json({
            message:'Logged in successfully',
            data:{
                token:token,
                user:user,
                }
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND));
        }
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})
