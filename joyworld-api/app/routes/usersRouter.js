import express from 'express';
import passport from 'passport';
const router = express.Router();

import { getUsers, deleteUser, updateUser, getUserByUsernameExceptPassword, getExchanges, createExchanges, updateExchange, deleteExchange } from '../controllers/usersController.js';
import {updateValidator} from '../validators/userValidator.js';

//router.get('/',getUsers);

//user
router.get('/:username',[passport.authenticate('jwt', {session: false}),getUserByUsernameExceptPassword]);
router.patch('/:username',[passport.authenticate('jwt',{session:false}),updateValidator,updateUser])
router.delete('/:username',[passport.authenticate('jwt', {session: false}),deleteUser]);

//exchange
router.get('/:username/exchanges',[passport.authenticate('jwt', {session: false}),getExchanges]);
router.post('/exchanges',createExchanges);
router.patch('/exchanges/:id',updateExchange);
router.delete('/exchanges/:id',deleteExchange);

export default router;