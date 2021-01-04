import React from 'react'
import { TabInlineContent, TabInlineWrapper } from './Tabs.styles'
import { Link } from 'react-router-dom'

const ProductsTab = () => {
    return (
        <TabInlineWrapper>
            <TabInlineContent>
                Diğer kullanıcıların yüklediği ürünlere göz atmak, satın almak, kendi ürünlerinizi kolayca satmak için
                <Link to="/products">TIKLAYINIZ</Link>
            </TabInlineContent>
        </TabInlineWrapper>
    )
}

export default ProductsTab
