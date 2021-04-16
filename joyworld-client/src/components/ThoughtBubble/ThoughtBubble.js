import React from 'react'
import { Thought } from './ThoughtBubble.styles'

const ThoughtBubble = ({children,contenteditable,onChange,...restProps}) => {
    return (
        <Thought
        onChange = {onChange}
        contentEditable = {contenteditable ? true : false}
         {...restProps}
         >
            {children}
        </Thought>
    )
}

export default ThoughtBubble

