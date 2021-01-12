import React from 'react'
import { NewsItemImage, NewsItemTitle, NewsItemWrapper } from './News.styles'

const NewsItem = ({newsItem,onIndexChange,index}) => {
    return (
        <NewsItemWrapper onMouseOver={() => onIndexChange(index)}>
            <NewsItemImage src={newsItem?.image}></NewsItemImage>
            <NewsItemTitle href={newsItem?.href}>{newsItem?.title}</NewsItemTitle>
        </NewsItemWrapper>
    )
}

export default NewsItem
