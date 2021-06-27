import express from 'express';
import passport from 'passport';
import { createConversation, getConversationIncludeTwoUser, getConversationOfAUser } from '../controllers/conversationController.js';

const router = express.Router();

router.post('/',[passport.authenticate('jwt', {session: false}),createConversation]);
router.get('/:userId',[passport.authenticate('jwt', {session: false}),getConversationOfAUser]);
router.get('/find/:firstUserId/:secondUserId',[passport.authenticate('jwt', {session: false}),getConversationIncludeTwoUser]);

export default router;