import {getAllPosts,createNewPost, getAllPostsWithoutContent,search, findPost, updatePostById, deletePostById, deleteCommentFromPost} from '../services/postService.js';
import errorMessages from '../../config/errorMessages.js';
import { ErrorHandler } from '../helpers/error.js';
import catchAsync from '../utils/catchAsync.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';
import { deletePostFromUser, findUserById, updateUserById } from '../services/userService.js';
import { createNewComment, deleteCommentById, deleteCommentsByPost, getComment, updateCommentById } from '../services/commentService.js';

export const getPosts = catchAsync(async (req,res,next) => {
    try {
        const posts = await getAllPosts();
        res.status(200).json({
            message:'Posts fetched successfully',
            data:posts,
        });
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
});

export const getPostsWithoutContent = catchAsync(async (req,res,next) => {
    try{
        const posts = await getAllPostsWithoutContent(req.query);
        res.status(200).json({
            message:'Posts fetched successfully',
            data:posts,
        });
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
    
});

export const searchPosts = catchAsync(async(req,res,next) => {
    try {
        const posts = await search(req.query.query);
        res.status(200).json({
            message:'Posts fetched successfully',
            data:posts,
        });
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})

export const createPost = catchAsync(async(req,res,next) => {
    try {
        const newPost = new Post({
            title:req.body.title,
            content:req.body.content,
            tag:req.body.tag,
            createdBy:req.body.createdBy,
        })
        const user = await findUserById(req.body.createdBy);
        if(!user) return next(new ErrorHandler(404,errorMessages.USER_NOT_FOUND))
        const post = await createNewPost(newPost);
        user.posts.push(post._id)
        await updateUserById(user._id,user)
        res.status(200).json({
            message:'Post created successfully',
            data:post
        })
    } catch(error){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})


export const getPost = catchAsync(async(req,res,next) => {
    try {
        const post = await findPost(req.params.id)
        if(post) {
            res.status(200).json({
                message:'Post fetched successfully',
                data:post,
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.POST_NOT_FOUND))
        }
    } catch(error){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})

export const updatePost = catchAsync(async(req,res,next) => {
    try {
        const post = await findPost(req.params.id);
        if(post) {
            const newData = req.body;
            const updatedPost = await updatePostById(post._id,newData);
            res.status(200).json({
            message:'Post updated successfully',
            data:updatedPost
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.POST_NOT_FOUND));
        }
        
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})

export const deletePost = catchAsync(async(req,res,next) => {
    try {
        const post = await findPost(req.params.id);
        if(post) {
            const postId = post._id;
            const deletedPost = await deletePostById(postId);
            await deleteCommentsByPost(postId);
            await deletePostFromUser(post.createdBy,postId);
            res.status(200).json({
                message:'Post deleted successfully',
                data:deletedPost,
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.POST_NOT_FOUND))
        }
    } catch(err){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR)
    }
})

//comment

export const createComment = catchAsync(async(req,res,next) => {
    try {
        const newComment = new Comment({
            body: req.body.body,
            createdBy: req.body.createdBy,
            belongTo: req.params.id
        })
        const post = await findPost(req.params.id);
        if(!post) return next(new ErrorHandler(404,errorMessages.POST_NOT_FOUND))
        const comment = await createNewComment(newComment)
        post.comments.push(comment._id)
        await updatePostById(post._id,post)
        res.status(200).json({
            message:'Comment created successfully',
            data:comment
        })
    } catch(error){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR)
    }
})


export const updateComment = catchAsync(async(req,res,next) => {
    try {
        const comment = await getComment(req.params.cid);
        if(comment) {
            const newData = req.body;
            const updatedComment = await updateCommentById(comment.id,newData);
            res.status(200).json({
            message:'Comment updated successfully',
            data:updatedComment
            })
        } else {
            return next(new ErrorHandler(404,errorMessages.COMMENT_NOT_FOUND));
        }
        
    } catch(error) {
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})

export const deleteComment = catchAsync(async(req,res,next) => {
    try {
        const comment = await getComment(req.params.cid);
        if(comment) {
            const commentId = comment._id;
            const deletedComment = await deleteCommentById(commentId);
            await deleteCommentFromPost(req.params.id,commentId);
            res.status(200).json({
                message:'Comment deleted successfully',
                data:deletedComment,
            })
        } else {
            return next(new Error(404,errorMessages.COMMENT_NOT_FOUND));
        } 
    } catch(err){
        throw new ErrorHandler(500,errorMessages.SERVER_ERROR);
    }
})
