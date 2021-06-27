import React, { useEffect, useState } from 'react'
import { ConversationImg, ConversationName, Wrapper, ConversationImageContainer, ConversationOnline } from './Conversation.styles';
import noAvatar from '../../images/noAvatar.png';
import { getUserInfoForConversations } from '../../services/api';

const Conversation = ({conversation,currentUser,isOnline}) => {

    const [user,setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try {
                const {data:{data}} = await getUserInfoForConversations(friendId);
                setUser(data);
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    },[currentUser._id,conversation.members])

    return (
        <Wrapper>
           <ConversationImageContainer>
                <ConversationImg
                    src={user?.avatar ? "data:image/png;base64," + user.avatar : noAvatar}
                    alt={'conversationAvatar'}
                />
                {isOnline && <ConversationOnline/>}
           </ConversationImageContainer>
            <ConversationName>
                {user?.username}
            </ConversationName>
        </Wrapper>
    )
}

export default Conversation
