import Exchange from '../models/exchange.js';

export const getExchangesForBidder = async (userId) => {
    return await Exchange.find({bidder:userId})
    .populate({path:'offeredProduct',select:'title price'})
    .populate({path:'targetProduct',select:'title price'})
    .populate({path:'owner',select:'username'}).sort({createdAt:-1})
}

export const getExchangesForOwner = async (userId) => {
    return await Exchange.find({owner:userId})
    .populate({path:'offeredProduct',select:'title price'})
    .populate({path:'targetProduct',select:'title price'})
    .populate({path:'bidder',select:'username'}).sort({createdAt:-1})
}

export const createNewExchange = async (exchange) => {
    return await exchange.save();
}

export const updateExchangeById = async (exId,newData) => {
    return await Exchange.findByIdAndUpdate(exId,newData, {new:true}).populate('exchanges')
}

export const findExchange = async (id) => {
    return await Exchange.findById(id);
}

export const deleteExchangeById = async (exId) => {
    return await Exchange.findByIdAndDelete(exId).populate('exchanges')
}