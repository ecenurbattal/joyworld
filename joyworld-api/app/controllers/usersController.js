import User from '../models/user.js';
import {getAllUsers,findUserByUsername,createUser,deleteUserById,updateUserById, findUserByEmail} from '../services/userService.js';
import errorMessages from '../../config/errorMessages.js';
import { ErrorHandler } from '../helpers/error.js';
import bcrypt from 'bcryptjs';

const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

export const getUsers = catchAsync(async (req,res,next) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            message:'Users fetched successfully',
            data:users,
        });
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
});


export const getUserByUsername = catchAsync(async (req,res,next) => {
    try {
        const user = await findUserByUsername(req.params.username)
        if(user) {
            res.status(200).json({
                message:'User fetched successfully',
                data:user,
            });
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        }
    } catch(error){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
});

export const getUserByUsernameExceptPassword = catchAsync(async (req,res,next) => {
    try {
        const user = await findUserByUsername(req.params.username)
        if(user) {
            delete user._doc['password'];
            res.status(200).json({
                message:'User fetched successfully',
                data:user,
            });
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        }
    } catch(error){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})

export const getUserByEmail = catchAsync(async (req,res,next) => {
    try {
        const user = await findUserByEmail(req.body.email)
        if(user) {
            res.status(200).json({
                message:'User fetched successfully',
                data:user,
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        }
    } catch(error){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})



export const updateUser = catchAsync(async(req,res,next) => {
    try {
        const user = await findUserByUsername(req.params.username);
        if(user) {
            const newData = req.body
            if(newData.password&&newData.oldPassword) {
                const isMatch = await bcrypt.compare(req.body.oldPassword,user.password);
                if(!isMatch) return next(new ErrorHandler(400,errorMessages.USER_INVALID_CREDENTIALS));
                const hashedPassword = await bcrypt.hash(req.body.password,10);
                newData.password = hashedPassword;
            }
            if(newData.trustPoint) {
                newData.trustPoint = {
                    point: ((((user.trustPoint.point)*user.trustPoint.count) + Number(req.body.trustPoint)) / (user.trustPoint.count+1)).toFixed(2)%6,
                    count: user.trustPoint.count + 1
                }
            }
            //const newData = Object.assign(user,req.body)
            const updatedUser = await updateUserById(user._id,newData);
            delete updatedUser._doc['password'];
            res.status(200).json({
                message:'User updated successfully',
                data:updatedUser,
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        }
    } catch(err){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR)
    }
})

export const deleteUser = catchAsync(async (req,res,next) => {
    try{
        const user = await findUserByUsername(req.params.username);
        if(user) {
            const userId = user._id;
            const deletedUser = await deleteUserById(userId);
            res.status(200).json({
                message:'User deleted successfully',
                data:deletedUser,
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        }
    } catch(err) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR)
    }
})