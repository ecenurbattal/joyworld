import User from '../models/user.js';
import {getAllUsers,findUserByUsername,createUser,deleteUserById,updateUserById} from '../services/userService.js';
import errorMessages from '../../config/errorMessages.js';
import { ErrorHandler } from '../helpers/error.js';

const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

export const getUsers = catchAsync(async (req,res,next) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            message:'Data fetched successfully',
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
})

export const addUser = catchAsync(async (req,res,next) => {
    const newUser = new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.password,
        name:req.body.name,
        avatar:req.body.avatar,
    })
    // const newUser = req.body;
    try {
        const user = await createUser(newUser);
            res.status(201).json({
            message:'User created successfully',
            data:newUser,
            })
    } catch(err) {
        throw new ErrorHandler(409,err.message)
    }
})

export const updateUser = catchAsync(async(req,res,next) => {
    try {
        const user = await findUserByUsername(req.params.username);
        if(user) {
            const newData = req.body;
            const updatedUser = await updateUserById(user._id,newData);
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