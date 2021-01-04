import React from 'react';
import CharacterItem from './CharacterItem';
import {Wrapper} from './Characters.styles';

const Characters = ({characters,onShowDetail}) => {
    return (
        <Wrapper>
            {characters?.map((character) => (
                <CharacterItem
                    key={character.id}
                    character={character}
                    onShowDetail={onShowDetail}
                />
            ))}
        </Wrapper>
    )
}

export default Characters
