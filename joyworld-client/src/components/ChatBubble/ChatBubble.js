import React from 'react'
import { ChatBubbleWrapper } from './ChatBubble.styles'

const ChatBubble = ({children,onShowDetail,item,...restProps}) => {
    return (
        <ChatBubbleWrapper
            onClick={() => {
            onShowDetail && onShowDetail(item)
            }}
        {...restProps}>
            {children}
        </ChatBubbleWrapper>
    )
}

export default ChatBubble
