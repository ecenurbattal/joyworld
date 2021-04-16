/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router';
import InternalError from '../../components/Error/InternalError';
import ForumDetail from '../../components/ForumDetail/ForumDetail';
import Loader from '../../components/Loader/Loader';
import { createComment, deleteComment, deletePost, getPost, updateComment, updatePost } from '../../services/api';

const ForumDetailScreen = () => {

    const [post,setPost] = useState();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [postEdit,setPostEdit] = useState(false);
    const [commentEdit,setCommentEdit] = useState(false);
    const [editingComment,setEditingComment] = useState();

    const {postId} = useParams();
    const history = useHistory();

    useEffect(() => {
        setLoading(true)
        const init = async () => {
            try {
                const {data:{data}} = await getPost(postId);
                setPost(data);
            } catch (err){
                setError(err);
            }
            setLoading(false);
        }
    init();
    }, [postId]);

    const handlePostEditClick = (event) => {
        event.preventDefault();
        setPostEdit(!postEdit)
    }

    const handleCommentEditClick = (event,commentId) => {
        event.preventDefault();
        setCommentEdit(!commentEdit);
        setEditingComment(commentId);
    }

    const handleConfirmButtonClick = async (newPost) => {
        try {
            const {data} = await updatePost(postId,newPost);
            window.location.reload();
        } catch(err){
            setError(err)
        }
    }

    const handleCommentConfirmButtonClick = async (comment) => {
        try {
            const {data} = await createComment(comment);
            window.location.reload();
        } catch(err){
            setError(err)
        }
    }

    const handleCommentEditConfirmButtonClick = async (comment,commentId) => {
        try {
            const {data} = await updateComment(comment,commentId);
            window.location.reload();
        } catch(err){
            setError(err)
        }
    }

    const handlePostDeleteClick = async (postId) => {
        try {
            const {data} = await deletePost(postId);
            history.push('/forum')
        } catch(err) {
            setError(err)
        }
    }

    const handleCommentDeleteClick = async (postId,commentId) => {
        try {
            const {data} = await deleteComment(postId,commentId);
            window.location.reload();
        } catch(err){
            setError(err)
        }
    }

    if (isLoading) {
        return <Loader/>
    }
    
    if (error) {
        if(['500'].includes(error)!==-1) return <InternalError/>
        else return <h1>{error}</h1>
    }


    return (
        <div>
            <ForumDetail
                post={post}
                onPostEditClick = {handlePostEditClick}
                postEdit = {postEdit}
                onPostDeleteClick = {handlePostDeleteClick}
                onCommentEditClick = {handleCommentEditClick}
                commentEdit = {commentEdit}
                editingComment={editingComment}
                onConfirmButtonClick = {handleConfirmButtonClick}
                onCommentConfirmButtonClick = {handleCommentConfirmButtonClick}
                onCommentEditConfirmButtonClick = {handleCommentEditConfirmButtonClick}
                onCommentDeleteClick = {handleCommentDeleteClick}
            />
        </div>
    )
}

export default ForumDetailScreen
