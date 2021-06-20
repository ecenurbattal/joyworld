import errorMessages from "../../config/errorMessages.js";
import { ErrorHandler } from "../helpers/error.js";
import Order from "../models/order.js";
import { createNewOrder, deleteOrderById, findOrder, updateOrderById } from "../services/orderService.js";
import { updateProductsByCart } from "../services/productService.js";
import catchAsync from "../utils/catchAsync.js";

export const createOrder = catchAsync(async(req,res,next) => {
    try {
        const newOrder = new Order(req.body);
        const order = await createNewOrder(newOrder);
        if(order.payment==='HARİCİ') await updateProductsByCart(order.cart)
        res.status(201).json({
            message:'Order created successfully',
            data:order,
        })
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
});

export const updateOrder = catchAsync(async(req,res,next) => {
    try {
        const order = await findOrder(req.params.id);
        if(order){
            const newData = req.body;
            const updatedOrder = await updateOrderById(order._id,newData);
            res.status(200).json({
                message:'Order updated successfully',
                data:updatedOrder,
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.ORDER_NOT_FOUND));
        }
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})

export const deleteOrder = catchAsync(async(req,res,next) => {
    try {
        const order = await findOrder(req.params.id);
        if(order) {
            const orderId = order._id;
            const deletedOrder = await deleteOrderById(orderId);
            res.status(200).json({
                message:'Order deleted successfully',
                data:deletedOrder,
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.ORDER_NOT_FOUND));
        }
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
});