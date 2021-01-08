import React from 'react';
import VolumeItem from './VolumeItem';
import {Wrapper} from '../Card/Card.styles';

const Volumes = ({volumes,onShowDetail}) => {
    return (
        <Wrapper>
            {volumes?.map((volume) => (
                <VolumeItem
                    key={volume.id}
                    volume={volume}
                    onShowDetail={onShowDetail}
                />
            ))}
        </Wrapper>
    )
}

export default Volumes
