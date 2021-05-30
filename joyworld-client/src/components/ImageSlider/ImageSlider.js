import React from 'react'
import { Image, Slide, Slider, StyledLeftArrow, StyledRightArrow } from './ImageSlider.styles'

const ImageSlider = ({slides, current, onSlideChange}) => {

    return (
        <Slider>
            <StyledLeftArrow
                onClick={() => onSlideChange(false)}
            />
            <StyledRightArrow
                onClick={() => onSlideChange(true)}
            />
            {slides.map((slide,index) => (
                <Slide
                    isActive = {index === current}
                    key={`slide${index}`}
                >
                    {index === current && (
                        <Image
                        src={`data:image/png;base64,${slide}`} alt='slide'
                    />
                    )}
                </Slide>
            ))}
        </Slider>
    )
}

export default ImageSlider
