import React from 'react';
import {format} from 'timeago.js';
import {Wrapper,MessageImg, MessageText, MessageBottom, MessageTop} from './Message.styles';


const Message = ({message,own}) => {
    return (
        <Wrapper
            own={own}
        >
            <MessageTop>
                <MessageImg
                    src={"data:image/png;base64," + message.sender.avatar}
                    alt=""
                />
                <MessageText
                    own={own}
                >{message.text}</MessageText>
            </MessageTop>
            <MessageBottom>{format(message.createdAt)}</MessageBottom>
        </Wrapper>
    )
}

export default Message
