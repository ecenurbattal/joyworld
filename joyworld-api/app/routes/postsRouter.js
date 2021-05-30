import express from 'express';
import passport from 'passport';
const router = express.Router();

import {createPost, getPost, getPostsWithoutContent, searchPosts, updatePost, createComment, updateComment, deletePost, deleteComment} from '../controllers/postsController.js';

router.get('/',getPostsWithoutContent);
router.post('/',[passport.authenticate('jwt', {session: false}),createPost]);
router.get('/search',searchPosts);
router.get('/:id',[passport.authenticate('jwt', {session: false}),getPost]);
router.patch('/:id',[passport.authenticate('jwt', {session: false}),updatePost]);
router.delete('/:id',[passport.authenticate('jwt', {session: false}),deletePost]);

router.post('/:id/comments',[passport.authenticate('jwt', {session: false}),createComment]);
router.patch('/:id/comments/:cid',[passport.authenticate('jwt', {session: false}),updateComment]);
router.delete('/:id/comments/:cid',[passport.authenticate('jwt', {session: false}),deleteComment]);

export default router;