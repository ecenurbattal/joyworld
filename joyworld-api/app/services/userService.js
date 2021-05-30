import User from '../models/user.js';

export const getAllUsers = async () => {
    return await User.find().populate('users');
}

export const findUserByUsername = async (userName) => {
    return await User.findOne({username:userName}).populate({path:'posts',select:'title',options:{sort:{updatedAt:-1}}}).populate({path:'products',select:'title',options:{sort:{updatedAt:-1}}});
}

export const findUserByEmail = async (mail) => {
    return await User.findOne({email:mail}).populate('users');
}

export const findUserByResetToken = async (token) => {
    return await User.findOne({
        resetPasswordToken:token,
        resetPasswordExpire: {$gt:Date.now()}
    })
}

export const createUser = async (user) => {
    return await user.save();
}

export const findUserById = async (id) => {
    return await User.findById(id).populate('users')
}

export const updateUserById = async (userId,newData) => {
    return await User.findByIdAndUpdate(userId, newData, {new: true}).populate('users');
}

export const deleteUserById = async (id) => {
    return await User.findByIdAndRemove(id);
}

export const deletePostFromUser = async (userId,postId) => {
    return await User.updateOne({_id:userId},{$pullAll:{posts:[postId]}})
}

export const deleteProductFromUser = async (userId, productId) => {
    return await User.updateOne({_id:userId},{$pullAll:{products:[productId]}})
}

// export const addExchangeOfferToUser = async (userId,exOfferId) => {
//     return await User.updateOne({_id:userId},{$push:{exchangeOffers:[exOfferId]}})
// }

export const deleteExchangeOfferFromUser = async(userId,exOfferId) => {
    return await User.updateOne({_id:userId},{$pullAll:{exchangeOffers:[exOfferId]}})
}