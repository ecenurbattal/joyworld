import React from 'react'
import { Title, Wrapper } from './News.styles';
import NewsItem from './NewsItem';

const News = ({news,title}) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            {news.map((item) => (
                <NewsItem newsItem={item} />
            ))}
        </Wrapper>
    )
}

export default News
