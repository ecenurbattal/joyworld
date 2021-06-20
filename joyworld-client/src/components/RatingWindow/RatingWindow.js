import React, { useRef, useState } from 'react'
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import StarRating from '../StarRating/StarRating';
import { RatingContent, Wrapper } from './RatingWindow.styles';
import Button from '../Button/Button';

const RatingWindow = ({onAcceptRating,...restProps}) => {

    const [rating,setRating] = useState(5);
    const ratingRef = useRef(null);
    const [isContentOpen,setContentOpen] = useState(false);



    const handleChange = (value) => {
        setRating(value)
    }

    useOutsideAlerter(ratingRef, () => {
        if (isContentOpen){
            setContentOpen(false)
        }
    });

    return (
        <Wrapper>
            <Button
                alignSelf='center'
                text='Satıcıyı Oyla'
                onClick={() => setContentOpen((prevState) => !prevState)}
            />
            <RatingContent ref={ratingRef} isOpen={isContentOpen}>
                <StarRating
                    count={5}
                    size={40}
                    value={rating}
                    onChange={handleChange}
                />
                <Button
                    text='Onayla'
                    onClick={() => onAcceptRating(rating,restProps)}
                />
            </RatingContent>
        </Wrapper>
    )
}

export default RatingWindow
