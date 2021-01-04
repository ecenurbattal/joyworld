import React from 'react'
import { Link } from 'react-router-dom'
import { TabInlineContent, TabInlineWrapper } from './Tabs.styles'

const CharactersTab = () => {
    return (
        <TabInlineWrapper>
            <TabInlineContent>
                Adaletin sağlayıcıları kahramanlarımıza göz atmak, detaylı olarak tanımak için
                <Link to="/characters">TIKLAYINIZ</Link>
                </TabInlineContent>
        </TabInlineWrapper>
    )
}

export default CharactersTab
