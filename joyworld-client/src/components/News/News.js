import React from 'react'
import Pagination from '../Pagination/Pagination';
import { InlineWrapper, NewsWrapper, Title, Wrapper } from './News.styles';
import NewsItem from './NewsItem';
import ActiveNews from './ActiveNews'

const News = ({news,title,activeIndex,onIndexChange,itemsPerPage, totalItems,paginate}) => {
    return (
        <Wrapper>
            <Title>{title} <hr color='white'/></Title>
            <InlineWrapper>
                <ActiveNews
                newsItem={{
                    ...news[activeIndex],
                    summary:news[activeIndex].summary ? news[activeIndex].summary : news[activeIndex].title
                }}
                />
                <NewsWrapper>
                    {news.map((item,index) => (
                        <NewsItem
                        key={`news${index}`}
                        onIndexChange={onIndexChange}
                        index={index}
                        newsItem={item}
                        />
                    ))}
                </NewsWrapper>
            </InlineWrapper>
            <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    paginate={paginate}
            />
        </Wrapper>
    )
}

export default News
