import express from 'express';
import passport from 'passport';
const router = express.Router();

import { getUsers,addUser, deleteUser, updateUser, login, getUserByUsernameExceptPassword } from '../controllers/usersController.js';
import {loginValidator, reqValidator,uniqueValidator,updateValidator} from '../validators/userValidator.js';

router.get('/',getUsers);
router.get('/:username',[passport.authenticate('jwt', {session: false}),getUserByUsernameExceptPassword]);
router.post('/register',[reqValidator,uniqueValidator,addUser]);
router.post('/login',[loginValidator,login]);
router.patch('/:username',[updateValidator,updateUser])
router.delete('/:username',deleteUser);


export default router;