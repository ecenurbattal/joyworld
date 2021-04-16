import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from '../Page/Page';
import PageCover from '../Page/PageCover';
import {Content,DetailTitle,InlineContent} from './BookDetail.styles';

const BookDetail = ({book}) => {

    const [pageIndex,setPageIndex] = useState();


    const getPageNumber = (e) => {
        setPageIndex(e.data)
    }

    return (
        <HTMLFlipBook   
        width={500}
        height={733}
        size="stretch"
        minWidth={200}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={getPageNumber}
        >
            <PageCover fontSize={'200%'} image={book?.volumeInfo.imageLinks?.medium}>{book?.volumeInfo.title}</PageCover>
            <Page number={pageIndex} title='Description'>
                <Content><p>{book?.volumeInfo.description}</p></Content>
            </Page>
            <Page number={pageIndex} title='General'>
                <Content>
                <InlineContent>
                    <DetailTitle color="darkblue">Authors</DetailTitle>
                    <p>{book?.volumeInfo.authors?.map((author) => (
                        `${author}`
                    ))}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="brown">Categories</DetailTitle>
                    <p>{book?.volumeInfo.categories?.map((category) => (
                        `${category}`
                    ))}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="#e2096b">Language</DetailTitle>
                    <p>{book?.volumeInfo.language}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="#ed09c7">Page Count</DetailTitle>
                    <p>{book?.volumeInfo.pageCount}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="orange">Published Date</DetailTitle>
                    <p>{book?.volumeInfo.publishedDate}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="#ED4C67">Publisher</DetailTitle>
                    <p>{book?.volumeInfo.publisher}</p>
                </InlineContent>
                </Content>
            </Page>
        </HTMLFlipBook>
    )
}

export default BookDetail
