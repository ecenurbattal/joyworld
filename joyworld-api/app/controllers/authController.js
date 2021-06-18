import User from '../models/user.js';
import {createUser,findUserByEmail,findUserByResetToken,findUserByUsername, updateUserById} from '../services/userService.js';
import errorMessages from '../../config/errorMessages.js';
import { ErrorHandler } from '../helpers/error.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import catchAsync from '../utils/catchAsync.js'
import sendEmail from '../utils/sendEmail.js';

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
        res.status(201).json({
        message:'User created successfully',
        data:{
            token:token,
            user:{
                _id:user._id,
                username:user.username,
                name:user.name
            },
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
            res.status(200).json({
            message:'Logged in successfully',
            data:{
                token:token,
                user:{
                    _id:user._id,
                    username:user.username,
                    name:user.name
                },
                }
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND));
        }
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})

export const forgotPassword = catchAsync( async (req,res,next) => {
    try {
        const user = await findUserByEmail(req.body.email)
        if(!user) {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        }

        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        const resetPasswordExpire = Date.now() + 10 * (60 * 1000)

        await updateUserById(user._id,{
            resetPasswordToken,
            resetPasswordExpire
        })

        const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;

        const message = `
            <h1>Parola sıfırlama isteğinde bulundunuz.</h1>
            <p>Lütfen aşağıdaki linke tıklayınız:</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        try {
            await sendEmail({
                to: user.email,
                subject:'Şifre Sıfırlama İsteği',
                text: message
            })

            res.status(200).json({
                message:'Success',
                data:'Email sent successfully'
            })
        } catch(err) {
            await updateUserById(user._id,{
                resetPasswordToken:undefined,
                resetPasswordExpire:undefined
            })
            return next(new ErrorHandler(500,errorMessages.EMAIL_NOT_SEND))
        }
    } catch(err) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR)
    }
})

export const resetPassword = catchAsync(async(req,res,next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        const user = await findUserByResetToken(resetPasswordToken)
        if(!user){
            return next(new ErrorHandler(400,errorMessages.INVALID_RESET_TOKEN))
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        await updateUserById(user._id,{
            password:hashedPassword,
            resetPasswordToken:undefined,
            resetPasswordExpire:undefined
        })

        res.status(200).json({
            message:'Success',
            data:'Password Reset Success'
        })
    } catch(err){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR)
    }
})
