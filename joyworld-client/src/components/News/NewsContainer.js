import React from 'react'
import News from './News'
import { ContainerWrapper } from './News.styles'

const NewsContainer = ({news}) => {
    return (
        <ContainerWrapper>
            <News/>
        </ContainerWrapper>
    )
}

export default NewsContainer
