import React from 'react'
import { Star } from './StarRating.styles'

const StarRating = ({size,value, count, onChange}) => {

    const stars = Array.from({length: count}, () => '🟊')

    return (
        <div>
            {stars.map((s,index) => (
                <Star
                    key={`star${index}`}
                    isActive={(index < value) ? true : false}
                    onClick={() => onChange(index+1)}
                    size={size}
                >
                    {s}
                </Star>
            ))}
            {value}
        </div>
    )
}

export default StarRating
