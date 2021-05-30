import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:8080/auth',
})

export const login = (user) => {
    return instance.post('/login',user)
}

export const register = (user) => {
    return instance.post('/register',user)
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user-data'))
}

export const logout = () => {
    return localStorage.removeItem('user-data')
}

export const forgotPassword = (email) => {
    return instance.post('/forgotpassword',{email})
}

export const resetPassword = (password,resetToken) => {
    return instance.patch(`/resetpassword/${resetToken}`,{password});
}