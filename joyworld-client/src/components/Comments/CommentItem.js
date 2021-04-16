import React, { useState } from 'react'
import { ItemWrapper,CommentBody, CommentAuthor, CommentInfoBar, StyledCircle, CommentDate, IconsWrapper } from './Comments.styles';
import Button from '../Button/Button';
import { getCurrentUser } from '../../services/Auth/authService';
import {FaPenAlt} from 'react-icons/fa'
import {BsTrash} from 'react-icons/bs';

const CommentItem = ({comment,commentEdit,editingComment,onCommentEditClick,onCommentEditConfirmButtonClick,onCommentDeleteClick}) => {

    const [changedComment,setChangedComment] = useState({
        belongTo: comment.belongTo,
        body:comment.body
    })

    return (
        <ItemWrapper
        background={'#B33771'}
        textColor={'white'}
        >
            {getCurrentUser().user.username===comment.createdBy.username && 
            <IconsWrapper>
                <FaPenAlt onClick={(event) => onCommentEditClick(event,comment._id)}/>
                <BsTrash onClick={(e) => { if (window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) onCommentDeleteClick(comment.belongTo,comment._id) }}/>
            </IconsWrapper>
            }
            <CommentBody
            contentEditable = {commentEdit && editingComment===comment._id ? true : false}
            onInput = {(event) => {
                setChangedComment({
                    ...changedComment,
                    body:event.currentTarget.textContent
                })
            }}
            >{comment.body}</CommentBody>
            <CommentInfoBar>
                <CommentAuthor href={`/profile/${comment.createdBy.username}`}>{comment.createdBy.username}</CommentAuthor>
                <StyledCircle/>
                <CommentDate>
                    {comment.createdAt===comment.updatedAt ? 
                    new Date(comment.createdAt).toLocaleString('tr') : new Date(comment.createdAt).toLocaleString('tr') + ' - ' + new Date(comment.updatedAt).toLocaleString('tr')}
                </CommentDate>
                {commentEdit && editingComment===comment._id && <Button
                    text='Onayla'
                    type='submit'
                    marginLeft='auto'
                    padding='8px'
                    onClick={() => onCommentEditConfirmButtonClick(changedComment,comment._id)}
                />}
            </CommentInfoBar>
        </ItemWrapper>
    )
}

export default CommentItem
