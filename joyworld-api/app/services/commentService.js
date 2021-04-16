import Comment from '../models/comment.js';

export const getCommentsByPost = async (postId) => {
    return await Comment.find({belongTo:postId}).sort({updatedAt:-1});
}

export const getComment = async (commentId) => {
    return await Comment.findById(commentId);
}

export const createNewComment = async (comment) => {
    return await comment.save();
}

export const updateCommentById = async (commentId,newData) => {
    return await Comment.findByIdAndUpdate(commentId,newData,{new:true}).populate('comments');
}

export const deleteCommentById = async (commentId) => {
    return await Comment.findByIdAndDelete(commentId);
}

export const deleteCommentsByPost = async (postId) => {
    return await Comment.deleteMany({belongTo:postId})
}

//export const deleteCommentById = async ()



//silme işleminden sonra, örneğin post: o postun bağlı olduğu yorumlar da silinmeli. yorum silindiğinde de postun yorumlar dizisinden silinmeli.