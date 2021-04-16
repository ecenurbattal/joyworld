import Post from '../models/post.js';
import Comment from '../models/comment.js';

export const getAllPosts = async () => {
    return await Post.find().populate({path:'createdBy',select:'username avatar'}).sort({createdAt:-1});
}

export const getAllPostsWithoutContent = async (queryList) => {
    const findQuery = queryList ? queryList.tag ? {tag:decodeURI(queryList.tag)} : {} : {}
    return await Post.find(findQuery,{content:0,__v:0}).populate({path:'createdBy',select:'username avatar'}).sort({updatedAt:-1});
}

export const createNewPost = async (post) => {
    return await post.save();
}

export const search = async (query) => {
    return await Post.find({
        $or: [
            {title:{$regex: query,$options: 'i'}},
            //{content:{$regex: query,$options: 'i'}},
        ],
    },{content:0,__v:0}).populate({path:'createdBy',select:'username avatar'}).sort({updatedAt:-1});
}

export const findPost = async (id) => {
    return await Post.findById(id)
    .populate({path:'createdBy',select:'username avatar'})
    .populate({path:'comments',populate:{path:'createdBy',select:'username -_id',Comment},options:{sort:{updatedAt:-1}}})
}

export const findPostsByTag = async (tag) => {
    return await Post.find({tag:tag}).sort({updatedAt:-1});
}

export const updatePostById = async (postId,newData) => {
    return await Post.findByIdAndUpdate(postId,newData, {new:true}).populate('posts')
}

export const deletePostById = async (postId) => {
    return await Post.findByIdAndDelete(postId).populate('posts');
}

export const deleteCommentFromPost = async (postId,commentId) => {
    return await Post.updateOne({_id:postId},{  $pullAll: {comments:[commentId]}})
}