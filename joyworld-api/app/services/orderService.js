import Order from "../models/order.js";
import Product from "../models/product.js";

export const getOrdersForBuyer = async (userId) => {
    return await Order.find({buyer:userId})
    .populate({path:'owner',select:'username'})
    .populate({path:'cart', populate:{path:'product',select:'title price',Product}}).sort({createdAt:-1})
}

export const getOrdersForOwner = async (userId) => {
    return await Order.find({owner:userId})
    .populate({path:'buyer',select:'username'})
    .populate({path:'cart', populate:{path:'product',select:'title price',Product}}).sort({createdAt:-1})
}

export const createNewOrder = async (order) => {
    return await order.save();
}

export const updateOrderById = async (orderId,newData) => {
    return await Order.findByIdAndUpdate(orderId,newData, {new:true}).populate('order')
}

export const findOrder = async (id) => {
    return await Order.findById(id);
}

export const deleteOrderById = async (orderId) => {
    return await Order.findByIdAndDelete(orderId).populate('order')
}