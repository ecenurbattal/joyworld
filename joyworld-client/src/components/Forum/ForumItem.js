import React from 'react'
import ChatBubble from '../ChatBubble/ChatBubble'
import { AuthorPic, ItemInformation, ItemInformationWrapper, ItemWrapper, Wrapper } from './Forum.styles'
import avatar from '../../images/account.png';

const ForumItem = ({post,i,onShowDetail}) => {

    const directions = ['left','right'];
    
    return (
        <Wrapper>
                <ItemWrapper>
                    <ChatBubble 
                    background={'#B33771'} 
                    textColor={'white'}
                    direction={directions[i%2]}
                    item={post}
                    onShowDetail={onShowDetail}
                    >
                        {post.title}
                    </ChatBubble>
                    <ItemInformationWrapper direction={directions[i%2]}>
                        <AuthorPic src={post.createdBy.avatar ? "data:image/png;base64," + post.createdBy.avatar : avatar}/>
                        <ItemInformation>
                            <h6>Yazar</h6>
                            <a href={`/profile/${post.createdBy.username}`}>{post.createdBy.username}</a>
                        </ItemInformation>
                        <ItemInformation>
                            <h6>Yorumlar</h6>
                            <p>{post.comments.length}</p>
                        </ItemInformation>
                        <ItemInformation>
                            <h6>Son Etkileşim</h6>
                            <p>{new Date(post.updatedAt).toLocaleString('tr')}</p>
                        </ItemInformation>
                        <ItemInformation>
                            <h6>Etiket</h6>
                            <p>{post.tag}</p>
                        </ItemInformation>
                    </ItemInformationWrapper>
                </ItemWrapper>
        </Wrapper>
    )
}

export default ForumItem
