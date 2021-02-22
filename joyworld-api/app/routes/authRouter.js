import express from 'express';
const router = express.Router();

import { register, login } from '../controllers/authController.js';
import {loginValidator, reqValidator,uniqueValidator} from '../validators/userValidator.js';

router.post('/register',[reqValidator,uniqueValidator,register]);
router.post('/login',[loginValidator,login]);

export default router;