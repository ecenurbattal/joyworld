import React from 'react'
import {CardContent, CardWrapper} from './Characters.styles';

const CharacterItem = ({character,onShowDetail}) => {

    return (
        <CardWrapper data-testid='characterCardWrapper'
            onClick={() => {
            onShowDetail && onShowDetail(character)
            }}
        >
            <img data-testid="characterItemImage" width="250px" height="190px" src={character?.image.medium_url} alt={character&&character.name}/>
            <CardContent>
                <h3>{character?.name}</h3>
                {character?.deck && <hr />}
                {character?.deck && character?.deck.length > 50
                ? character?.deck.substr(0,50) + '...'
                : character?.deck}
            </CardContent>
        </CardWrapper>
    )
}

export default CharacterItem
