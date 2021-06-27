import express from 'express';
import passport from 'passport';
import { createMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.post('/', [passport.authenticate('jwt', {session: false}), createMessage]);
router.get('/:conversationId',[passport.authenticate('jwt', {session: false}),getMessages]);

export default router;