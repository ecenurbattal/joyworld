import React from 'react'
import { ActiveNewsImage, ActiveNewsSummary, ActiveNewsTitle, ActiveNewsWrapper } from './News.styles'

const ActiveNews = ({newsItem}) => {
    return (
        <ActiveNewsWrapper>
            <ActiveNewsImage src={newsItem?.image}></ActiveNewsImage>
            <ActiveNewsTitle href={newsItem?.href}>{newsItem?.title}</ActiveNewsTitle>
            <ActiveNewsSummary>{newsItem?.summary && <hr color='#2d3436' />}
                {newsItem?.summary && newsItem?.summary.length > 100
                ? newsItem?.summary.substr(0,100) + '...'
                : newsItem?.summary}</ActiveNewsSummary>
        </ActiveNewsWrapper>
    )
}

export default ActiveNews;
