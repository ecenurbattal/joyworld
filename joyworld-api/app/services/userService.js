import User from '../models/user.js';

export const getAllUsers = async () => {
    return await User.find().populate('users');
}

export const findUserByUsername = async (userName) => {
    return await User.findOne({username:userName});
}

export const createUser = async (user) => {
    return await user.save();
}

export const findUserById = async (id) => {
    return await User.findById(id).populate('users')
}

export const updateUserById = async (userId,user) => {
    return await User.findByIdAndUpdate(userId, user, {new: true}).populate('users');
}

export const deleteUserById = async (id) => {
    return await User.findByIdAndRemove(id);
}


