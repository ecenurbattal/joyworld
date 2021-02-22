import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from '../Page/Page';
import PageCover from '../Page/PageCover';
import {Content,DetailTitle,InlineContent} from './VolumeDetails.styles';

const VolumeDetails = ({volume}) => {

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
            <PageCover image={volume?.image.medium_url}>{volume?.name}</PageCover>
            <Page number={pageIndex} title='General'>
                <Content><p>{volume?.deck}</p>
                <InlineContent>
                    <DetailTitle color="darkblue">First Issue</DetailTitle>
                    <p>{volume?.first_issue.name}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="brown">Last Issue</DetailTitle>
                    <p>{volume?.last_issue.name}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="#e2096b">Start Year</DetailTitle>
                    <p>{volume?.start_year}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="#ed09c7">Publisher</DetailTitle>
                    <p>{volume?.publisher.name}</p>
                </InlineContent></Content>
            </Page>
        </HTMLFlipBook>
    )
}

export default VolumeDetails;
