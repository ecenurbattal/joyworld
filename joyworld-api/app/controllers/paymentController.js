import errorMessages from '../../config/errorMessages.js';
import { ErrorHandler } from '../helpers/error.js';
import catchAsync from '../utils/catchAsync.js';
import iyzipay from '../../config/iyzipay.js';
import {paymentRequest, subMerchantRequest} from '../../config/paymentRequest.js';
import {createNewOrder, deleteOrderById} from '../services/orderService.js';
import Iyzipay from 'iyzipay';
import Order from '../models/order.js';
import { updateProductsByCart } from '../services/productService.js';
import { findUserById, updateUserById } from '../services/userService.js';

var token = null;
var conversationId = null;
var cart = null;

export const createPaymentRequest = catchAsync(async (req,res,next) => {
    const order = await createNewOrder(new Order(req.body.order));
    const request = paymentRequest(req,order);
    //console.log(request);
    await iyzipay.checkoutFormInitialize.create(request, async (err, result) => {
        //console.log(request.buyer.lastLoginDate)
        if(err) {
            await deleteOrderById(order._id);
            throw new ErrorHandler(500,err)
        } else {
            if(result.status==='failure') {
                await deleteOrderById(order._id);
                return next(new ErrorHandler(500,result.errorMessage))
            }
            token = result.token;
            conversationId = result.conversationId;
            cart = order.cart;
            res.status(200).json({
                message:'Payment request created successfully',
                data:result
            })
        }
    });
});

export const paymentRetrieveRequest = catchAsync(async(req,res,next) => {
    //console.log(req)
    const retrieveData = {
        conversationId: conversationId,
        locale:Iyzipay.LOCALE.TR,
        token:token,
    }
    await iyzipay.checkoutForm.retrieve(retrieveData, async (err,result) => {
        if(err){
            await deleteOrderById(conversationId);
            throw new ErrorHandler(500,err)
        } else {
            if(result.status==='success'){
                await updateProductsByCart(cart)
                res.render('paymentStatus', {
                    error:undefined
                })
                // var customTimeout = 3000;

                // res.setTimeout(customTimeout,function(){
                //     console.log("TIMED!");
                //     res.redirect(process.env.CLIENT_URL)
                // });
                // res.render('paymentStatus', { error: undefined });
                
            } else {
                await deleteOrderById(conversationId);
                res.render('paymentStatus',{
                    error:result.errorMessage
                })
            }
            
        }
    })
})


export const createSubMerchant = catchAsync(async(req,res,next) => {
    const request = subMerchantRequest(req);
    await iyzipay.subMerchant.create(request, async(err,result) => {
        if(err){
            throw new ErrorHandler(500,err);
        } else {
            if(result.status==='failure'){
                return next(new ErrorHandler(500,result.errorMessage))
            } else {
                const user = await findUserById(req.body._id);
                user.subMerchantId = result.subMerchantKey
                await updateUserById(user._id,user);
                res.status(200).json({
                    message:'Sub Merchant created successfully',
                    data:result
                })
            }
        }
    })
})