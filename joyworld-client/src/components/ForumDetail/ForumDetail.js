import React, { useState } from 'react';
import Comments from '../Comments/Comments';
import ThoughtBubble from '../ThoughtBubble/ThoughtBubble';
import {Wrapper, PostContent, InfoBar, Info, StyledCircle, CreateDate, StyledTime, InfoBarWrapper,IconsWrapper} from './ForumDetail.styles';
import {getCurrentUser} from '../../services/Auth/authService';
import Button from '../Button/Button';
import {FaPenAlt} from 'react-icons/fa';
import {BsTrash} from 'react-icons/bs';

const ForumDetail = ({post,onPostEditClick,postEdit,onConfirmButtonClick,onPostDeleteClick,
    onCommentEditClick,commentEdit,editingComment,onCommentConfirmButtonClick,onCommentEditConfirmButtonClick,onCommentDeleteClick
}) => {

    const [changedPost,setChangedPost] = useState({title:post.title,content:post.content});

    return (
        <Wrapper>
            {getCurrentUser().user.username===post.createdBy.username && 
            <IconsWrapper >
                <FaPenAlt onClick={onPostEditClick}/>
                <BsTrash onClick={(e) => { if (window.confirm('Bu gönderiyi silmek istediğinize emin misiniz?')) onPostDeleteClick(post._id) }}/>
            </IconsWrapper>}
            <ThoughtBubble
                contenteditable = {postEdit ? true : false}
                background={'#B33771'}
                textColor={'#fff'}
                onInput={(event)=> {
                    setChangedPost({
                        ...changedPost,
                        title:event.currentTarget.textContent
                    })
                }}       
            >{post.title}</ThoughtBubble>
            <PostContent
            contentEditable = {postEdit ? true : false}
            onInput={(event)=> {
                setChangedPost({
                    ...changedPost,
                    content:event.currentTarget.textContent
                })
            }}    
            >
                    {post.content}
            </PostContent>
            <InfoBarWrapper>
                <InfoBar>
                    <StyledCircle/>
                    <Info href={`/profile/${post.createdBy.username}`}>{post.createdBy.username}</Info>
                </InfoBar>
                <InfoBar>
                    <StyledTime/>
                    <CreateDate>
                        {post.createdAt===post.updatedAt ?
                        new Date(post.createdAt).toLocaleString('tr') :
                        new Date(post.createdAt).toLocaleString('tr') + ' - ' + new Date(post.updatedAt).toLocaleString('tr')}
                    </CreateDate>
                </InfoBar>
               {postEdit && <Button
                    text='Onayla'
                    type='submit'
                    marginLeft='auto'
                    padding='8px'
                    onClick={() => onConfirmButtonClick(changedPost)}
                />}
            </InfoBarWrapper>
            <Comments 
            comments={post.comments}
            onCommentEditClick = {onCommentEditClick}
            commentEdit = {commentEdit}
            onCommentConfirmClick = {onCommentConfirmButtonClick}
            onCommentEditConfirmButtonClick = {onCommentEditConfirmButtonClick}
            onCommentDeleteClick={onCommentDeleteClick}
            editingComment={editingComment}
            />
        </Wrapper>
    )
}

export default ForumDetail
