import User from '../models/user.js';

export const getAllUsers = async () => {
    return await User.find().populate('users');
}

export const findUserByUsername = async (userName) => {
    return await User.findOne({username:userName}).populate({path:'posts',select:'title',options:{sort:{updatedAt:-1}}});
}

export const findUserByEmail = async (mail) => {
    return await User.findOne({email:mail}).populate('users');
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


