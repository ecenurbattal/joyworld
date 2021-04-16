import express from 'express';
const router = express.Router();

import {createPost, getPost, getPostsWithoutContent, searchPosts, updatePost, createComment, updateComment, deletePost, deleteComment} from '../controllers/postsController.js';

router.get('/',getPostsWithoutContent);
router.post('/',createPost);
router.get('/search',searchPosts);
router.get('/:id',getPost)
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);

router.post('/:id/comments',createComment);
router.patch('/:id/comments/:cid',updateComment);
router.delete('/:id/comments/:cid',deleteComment);

export default router;