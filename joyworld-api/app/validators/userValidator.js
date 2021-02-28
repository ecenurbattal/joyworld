import {isEmpty} from '../utils/validationUtils.js';
import errorMessages from '../../config/errorMessages.js';
import {findUserByEmail, findUserByUsername} from '../services/userService.js';
import {ErrorHandler} from '../helpers/error.js';


const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const validateEmail = (email) => {
    if (!email)
        return false;

    if(email.length>254)
        return false;

    const valid = emailRegex.test(email);
    if(!valid)
        return false;

    const parts = email.split("@");
    if(parts[0].length>64)
        return false;

    const domainParts = parts[1].split(".");
    if(domainParts.some((part) => { return part.length>63; }))
        return false;

    return true;
}

export const reqValidator = (req,res,next) => {
    const body = req.body;
    let message;
    if (body) {
        if (!body.username ||body.username.length < 5) {
            message = errorMessages.USER_DATA_USERNAME_INVALID;
        } else if (isEmpty(body.name)) {
            message = errorMessages.USER_DATA_NAME_INVALID;
        } else if (!body.password || body.password.length < 8) {
            message = errorMessages.USER_DATA_PASSWORD_INVALID;
        } else if(!validateEmail(body.email)) {
            message = errorMessages.USER_DATA_EMAIL_INVALID;
        } else {
            next();
            return;
        }
    } else {
        message = errorMessages.USER_DATA_INVALID;
    }
    throw new ErrorHandler(409,message)
}

export const uniqueValidator = async (req,res,next) => {
    const username = await findUserByUsername(req.body.username);
    const email = await findUserByEmail(req.body.email)
    if(username) {
        return next(new ErrorHandler(400,errorMessages.USER_USERNAME_TAKEN))
    }
    else if(email) {
        return next(new ErrorHandler(400,errorMessages.USER_EMAIL_TAKEN))
    } else {
        next();
    }
}

export const updateValidator = (req,res,next) => {
    const body = req.body;
    let message;
    if(body){
        if(body.username) {
            if (body.username.length < 5) message = errorMessages.USER_DATA_USERNAME_INVALID;
        } 
        if(body.password) {
            if (body.password.length < 8) message = errorMessages.USER_DATA_PASSWORD_INVALID;
        }
        if (body.email){
            if(!validateEmail(body.email)) message = errorMessages.USER_DATA_EMAIL_INVALID;
        }
        if(body.description) {
            if(body.description.length > 250) message = errorMessages.USER_DATA_DESCRIPTION_INVALID;
        }
    } else {
        message = errorMessages.USER_DATA_INVALID;
    }
    if (message) {throw new ErrorHandler(409,message);}
    else {
        next();
        return;
    }
}

export const loginValidator = (req,res,next) => {
    const body = req.body;
    let message;
    if(body){
        if(isEmpty(body.username)) message = errorMessages.USER_DATA_USERNAME_INVALID;
        else if (isEmpty(body.password)) message = errorMessages.USER_DATA_PASSWORD_INVALID;
        else {
            next();
            return;
        }
    } else {
        message = errorMessages.USER_DATA_INVALID;
    }
    throw new ErrorHandler(409,message);
}