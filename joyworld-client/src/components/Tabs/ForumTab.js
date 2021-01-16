import React from 'react'
import { Link } from 'react-router-dom'
import { TabInlineContent, TabInlineWrapper } from './Tabs.styles'

const ForumTab = () => {
    return (
        <TabInlineWrapper>
            <TabInlineContent>
                Forumda tartışılan konulara dahil olmak, yeni bir tartışma başlatmak için
                <Link to="/forum">TIKLAYINIZ</Link>
            </TabInlineContent>
        </TabInlineWrapper>
    )
}

export default ForumTab
