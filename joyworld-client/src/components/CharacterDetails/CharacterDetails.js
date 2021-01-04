import React from 'react';
import {Wrapper,Image,CharacterName,Content,DetailTitle,InlineContent,Container} from './CharacterDetail.styles';

const CharacterDetails = ({character}) => {

    const Gender = (gender) => {
        switch(gender) {
            case 1:
                return "Male"
            case 2:
                return "Female"
            default:
                return "Other"
        }
    }

    return (
        <Wrapper>
            <CharacterName>{character?.name}</CharacterName>
            <Image data-testid='characterImage' src={character?.image.medium_url} alt={character?.name}/>
            <Content>
                <p>{character?.deck}</p>
                <InlineContent>
                    <DetailTitle color="darkblue">Real name:</DetailTitle>
                    <p>{character?.real_name}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="purple">Gender:</DetailTitle>
                    <p data-testid='characterGender'>{Gender(character?.gender)}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="brown">Publisher:</DetailTitle>
                    <p>{character?.publisher.name}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="#e2096b">Origin:</DetailTitle>
                    <p>{character?.origin.name}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="#ed09c7">Volumes:</DetailTitle>
                    <p>{character?.volume_credits.map((volume) => (
                        `${volume.name}, `
                    ))}</p>
                </InlineContent>
                <InlineContent>
                    <Container color="orange">
                            <DetailTitle>Powers</DetailTitle>
                            {character?.powers.map((power) => (
                                <p>{power.name}</p>
                            ))}
                    </Container>
                    <Container color="brown">
                        <DetailTitle>Movies</DetailTitle>
                        {character?.movies.map((movie) => (
                            <p>{movie.name}</p>
                        ))}
                    </Container>
                    <Container color="blue">
                        <DetailTitle>Teams</DetailTitle>
                        {character?.teams.map((team) => (
                            <p>{team.name}</p>
                        ))}
                    </Container>
                    <Container color="green">
                        <DetailTitle>Team Friends</DetailTitle>
                        {character?.team_friends.map((friend) => (
                            <p>{friend.name}</p>
                        ))}
                    </Container>
                    <Container color="red">
                        <DetailTitle>Team Enemies</DetailTitle>
                        {character?.team_enemies.map((enemy) => (
                            <p>{enemy.name}</p>
                        ))}
                    </Container>
                </InlineContent>
            </Content>
        </Wrapper>
    )
}

export default CharacterDetails
