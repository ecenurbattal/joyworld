import React from 'react'
import { Box, Img, Message, Status, Wrapper } from './InternalError.styles'

const InternalError = () => {
    return (
        <Wrapper>
            <Box>
                <Status>500</Status>
                <Img></Img>
                <Message>Pardon, sorun sende değil, bende.</Message>
                <Message>&#58;&#40;</Message>
                <Message><a href="/">Yeniden denememe izin ver!</a></Message>
            </Box>
        </Wrapper>
    )
}

export default InternalError
