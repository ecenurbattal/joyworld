import React from 'react'
import { Link } from 'react-router-dom'
import { TabInlineContent, TabInlineWrapper } from './Tabs.styles'

const BooksTab = () => {
    return (
        <TabInlineWrapper>
            <TabInlineContent>
                Kitaplar hakkında bilgi edinmek, içeriklerine göz atmak için
                <Link to="/books">TIKLAYINIZ</Link>
            </TabInlineContent>
        </TabInlineWrapper>
    )
}

export default BooksTab
