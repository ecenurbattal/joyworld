import React from 'react'
import { PageContent, PageFooter, PageTitle, PageWrapper } from './Page.styles';

const Page = React.forwardRef((props,ref) => {
    return (
        <PageWrapper ref={ref}>
            <PageTitle color={props.color}>{props.title}</PageTitle>
            <PageContent>{props.children}</PageContent>
            <PageFooter>{props.number}</PageFooter>
        </PageWrapper>
    )
});

export default Page
