import React from 'react'
import { ActiveNewsImage, ActiveNewsTitle, ActiveNewsWrapper } from './News.styles'

const ActiveNews = ({newsItem}) => {
    return (
        <ActiveNewsWrapper>
            <ActiveNewsImage src={newsItem?.image}></ActiveNewsImage>
            <ActiveNewsTitle href={newsItem?.href}>{newsItem?.title}</ActiveNewsTitle>
        </ActiveNewsWrapper>
    )
}

export default ActiveNews;
