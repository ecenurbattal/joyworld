import express from 'express';
import passport from 'passport';
const router = express.Router();

import { getUsers, deleteUser, updateUser, getUserByUsernameExceptPassword } from '../controllers/usersController.js';
import {updateValidator} from '../validators/userValidator.js';

router.get('/',getUsers);
router.get('/:username',[passport.authenticate('jwt', {session: false}),getUserByUsernameExceptPassword]);
router.patch('/:username',[updateValidator,updateUser])
router.delete('/:username',deleteUser);


export default router;