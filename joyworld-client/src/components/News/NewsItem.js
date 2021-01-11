import React from 'react'
import { ItemImage, ItemTitle, ItemWrapper } from './News.styles'

const NewsItem = ({newsItem}) => {
    return (
        <ItemWrapper>
            <ItemImage src={newsItem.image}></ItemImage>
            <ItemTitle href={newsItem.href}>{newsItem.title}</ItemTitle>
        </ItemWrapper>
    )
}

export default NewsItem
