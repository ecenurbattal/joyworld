import {getAllUsers,findUserByUsername,deleteUserById,updateUserById, findUserByEmail, findUserById} from '../services/userService.js';
import {findProductsByUser, updateProductsByCart} from '../services/productService.js';
import errorMessages from '../../config/errorMessages.js';
import { ErrorHandler } from '../helpers/error.js';
import bcrypt from 'bcryptjs';
import catchAsync from '../utils/catchAsync.js'
import { createNewExchange, deleteExchangeById, findExchange, getExchangesForBidder, getExchangesForOwner, updateExchangeById } from '../services/exchangeService.js';
import Exchange from '../models/exchange.js';
import { getOrdersForBuyer, getOrdersForOwner } from '../services/orderService.js';

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

export const getUserInfoForConversations = catchAsync(async (req,res,next) => {
    try {
        const user = await findUserById(req.params.userId)
        if(user) {
            res.status(200).json({
                message:'User fetched successfully',
                data:{
                    _id:user._id,
                    username:user.username,
                    name:user.name,
                    avatar:user.avatar
                },
            });
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


export const getProductsByUser = catchAsync( async(req,res,next) => {
    try {
        const user = await findUserByUsername(req.params.username);
        if(!user) return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        const products = await findProductsByUser(user._id);
        res.status(200).json({
            message:'Products fetched successfully',
            data:products,
        });
    } catch(error){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR)
    }
})


//exchanges

export const getExchanges = catchAsync(async(req,res,next) => {
    try {
        // const exchanges = req.body.bidder ? (await getExchangesForBidder(req.body.bidder)) : 
        // (req.body.owner ? await getExchangesForOwner(req.body.owner) : null)

        const user = await findUserByUsername(req.params.username)
        if(user) {
            const offeredExchanges = await getExchangesForOwner(user._id);
            const bidExchanges = await getExchangesForBidder(user._id);
                res.status(200).json({
                    message:'Exchanges fetched succesfully',
                    data:{
                        offeredExchanges:offeredExchanges,
                        bidExchanges:bidExchanges
                    }
                })
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        }
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR)
    }
});


export const createExchanges = catchAsync(async(req,res,next) => {
    try {
        const newExchange = new Exchange(req.body)
        const exchange = await createNewExchange(newExchange);
        res.status(201).json({
            message:'Exchange created successfully',
            data:exchange,
        })
    } catch(error){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR)
    }
})

export const updateExchange = catchAsync(async(req,res,next) => {
    try {
        const exchange = await findExchange(req.params.id);
        if(exchange) {
            const newData = req.body
            if(req.body.isRated){
                newData.isRated.bidder ? newData.isRated.owner=exchange.isRated.owner : newData.isRated.bidder=exchange.isRated.bidder
            }
            const updatedExchange = await updateExchangeById(exchange._id,newData);
            if(req.body.status==='KABUL EDİLDİ') await updateProductsByCart([
                {
                    qty:1,
                    product:updatedExchange.offeredProduct
                },
                {
                    qty:1,
                    product:updatedExchange.targetProduct
                }
            ])
            res.status(200).json({
                message:'Exchange updated successfully',
                data:updatedExchange,
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.EXCHANGE_NOT_FOUND));
        }
    } catch(error) {
        console.log(error)
        throw new ErrorHandler(500,errorMessages.errorMessages.SERVER_ERROR);
    }
})

export const deleteExchange = catchAsync(async(req,res,next) => {
    try {
        const exchange = await findExchange(req.params.id);
        if(exchange) {
            const exchangeId = exchange._id;
            const deletedExchange = await deleteExchangeById(exchangeId);
            res.status(200).json({
                message:'Exchange deleted successfully',
                data:deletedExchange,
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.EXCHANGE_NOT_FOUND));
        }
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
});


//orders

export const getOrders = catchAsync(async(req,res,next) => {
    try {
        const user = await findUserByUsername(req.params.username);
        if(user) {
            const received = await getOrdersForBuyer(user._id);
            const sold = await getOrdersForOwner(user._id);
            res.status(200).json({
                message:'Orders fetched successfully',
                data:{
                    received,
                    sold
                }
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        }
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
});

export const getIyzicoAccountId = catchAsync(async(req,res,next)=> {
    try {
        const user = await findUserByUsername(req.params.username);
        if(user){
            res.status(200).json({
                message:'Iyzico account id fetched successfully',
                data:user.subMerchantId
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND));
        }
    } catch(error){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
});