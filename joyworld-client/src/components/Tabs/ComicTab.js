import React from 'react'
import { Link } from 'react-router-dom'
import { TabInlineContent, TabInlineWrapper } from './Tabs.styles'

const ComicTab = () => {
    return (
        <TabInlineWrapper>
            <TabInlineContent>
                Adaletin sağlayıcıları kahramanlarımıza göz atmak, detaylı olarak tanımak için
                <Link to="/characters">TIKLAYINIZ</Link>
                </TabInlineContent>
                <TabInlineContent>
                Çizgi romanlar hakkında bilgi edinmek, içeriğine göz atmak için
                <Link to="/volumes">TIKLAYINIZ</Link>
                </TabInlineContent>
        </TabInlineWrapper>
    )
}

export default ComicTab
