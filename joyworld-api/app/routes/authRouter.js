import express from 'express';
const router = express.Router();

import { register, login, forgotPassword, resetPassword } from '../controllers/authController.js';
import {loginValidator, reqValidator,uniqueValidator, updateValidator} from '../validators/userValidator.js';

router.post('/register',[reqValidator,uniqueValidator,register]);
router.post('/login',[loginValidator,login]);
router.post('/forgotpassword',forgotPassword);
router.patch('/resetpassword/:resetToken',[updateValidator,resetPassword])

export default router;