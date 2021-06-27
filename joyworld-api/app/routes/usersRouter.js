import express from 'express';
import passport from 'passport';
const router = express.Router();

import { getUsers, deleteUser, updateUser, getUserByUsernameExceptPassword, getExchanges, createExchanges, updateExchange, deleteExchange, getProductsByUser, getOrders, getIyzicoAccountId, getUserInfoForConversations } from '../controllers/usersController.js';
import {updateValidator} from '../validators/userValidator.js';

//router.get('/',getUsers);

//user
router.get('/:username',[passport.authenticate('jwt', {session: false}),getUserByUsernameExceptPassword]);
router.get('/conversation-info/:userId',[passport.authenticate('jwt', {session: false}),getUserInfoForConversations]);
router.patch('/:username',[passport.authenticate('jwt',{session:false}),updateValidator,updateUser])
router.delete('/:username',[passport.authenticate('jwt', {session: false}),deleteUser]);
router.get('/:username/iyzico',[passport.authenticate('jwt', {session: false}),getIyzicoAccountId]);

//exchange
router.get('/:username/exchanges',[passport.authenticate('jwt', {session: false}),getExchanges]);
router.post('/exchanges',createExchanges);
router.patch('/exchanges/:id',updateExchange);
router.delete('/exchanges/:id',deleteExchange);

//products
router.get('/:username/products',[passport.authenticate('jwt', {session:false}), getProductsByUser])


//orders
router.get('/:username/orders',[passport.authenticate('jwt',{session:false}), getOrders]);

export default router;