import React from 'react'
import { PageCoverImage, PageCoverTitle, PageWrapper } from './Page.styles';

const PageCover = React.forwardRef((props,ref) => {
    return (
        <PageWrapper ref={ref}>
            <PageCoverTitle fontSize = {props.fontSize}>{props.children}</PageCoverTitle>
            <PageCoverImage src={props.image} alt={props.children}></PageCoverImage>
        </PageWrapper>
    )
});

export default PageCover
