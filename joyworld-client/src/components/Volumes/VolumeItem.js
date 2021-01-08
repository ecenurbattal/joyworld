import React from 'react';
import {CardWrapper,CardContent} from '../Card/Card.styles';

const VolumeItem = ({volume,onShowDetail}) => {
    return (
        <CardWrapper 
            onClick={() => {
            onShowDetail && onShowDetail(volume)
            }}
        >
            <img width="250px" height="190px" src={volume?.image.medium_url} alt={volume&&volume.name}/>
            <CardContent>
                <h3>{volume?.name}</h3>
                {volume?.deck && <hr />}
                {volume?.deck && volume?.deck.length > 50
                ? volume?.deck.substr(0,50) + '...'
                : volume?.deck}
            </CardContent>
        </CardWrapper>
    )
}

export default VolumeItem
