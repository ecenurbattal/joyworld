import React, { useState } from 'react'
import CommentItem from './CommentItem'
import { AddCommentWrapper, StyledTextArea, Title, Wrapper } from './Comments.styles';
import { useParams } from 'react-router';
import { getCurrentUser } from '../../services/Auth/authService';
import Button from '../Button/Button';

const Comments = ({comments,commentEdit,onCommentEditClick,onCommentConfirmClick,onCommentEditConfirmButtonClick,onCommentDeleteClick,editingComment}) => {

    const {postId} = useParams();

    const [comment,setComment] = useState({
        belongTo: postId,
        createdBy: getCurrentUser().user._id
    });

    return (
        <Wrapper>
            <Title>Yorumlar <hr color='white'/></Title>
            {comments?.map((comment) => (
                <CommentItem 
                comment={comment}
                commentEdit = {commentEdit}
                editingComment={editingComment}
                onCommentEditClick={onCommentEditClick}
                onCommentEditConfirmButtonClick={onCommentEditConfirmButtonClick}
                onCommentDeleteClick={onCommentDeleteClick}
                />
            ))}
            {/* <Input
                placeHolder={'Yorum yaz...'}
                style={{
                    minWidth:'70%',
                    minHeight:'200px',
                    alignSelf:'center',
                    marginTop:'10px',
                    background:'#d3d3d3'
                }}
            /> */}
            <AddCommentWrapper>
                <StyledTextArea
                    placeholder='Yorum Yaz...'
                    name='comment'
                    onChange={(event) => {
                        setComment({
                            ...comment,
                            body:event.target.value
                        })
                    }}
                />
                <Button
                    text='Onayla'
                    type='submit'
                    margin='7px 0px 0px auto'
                    padding='8px'
                    onClick={() => onCommentConfirmClick(comment)}
                />
            </AddCommentWrapper>
        </Wrapper>
    )
}

export default Comments
