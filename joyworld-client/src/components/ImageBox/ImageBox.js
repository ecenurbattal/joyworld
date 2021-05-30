import React from 'react'
import { Wrapper } from './ImageBox.styles'

const ImageBox = ({boxColor, boxNumber, handleDrag, handleDrop, image }) => {
    return (
        <Wrapper
            draggable={true}
            id={boxNumber}
            onDragOver={(ev) => ev.preventDefault()}
            onDragStart={handleDrag}
            onDrop={handleDrop}
            boxColor={boxColor}
            src={image}
            alt={`selected${boxNumber}`}
        />
    )
}

export default ImageBox
