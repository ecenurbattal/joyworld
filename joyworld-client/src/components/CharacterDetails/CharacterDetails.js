import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from '../Page/Page';
import PageCover from '../Page/PageCover';
import {Content,DetailTitle,InlineContent, Parts} from './CharacterDetail.styles';

const CharacterDetails = ({character}) => {

    const [pageIndex,setPageIndex] = useState();

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

    const splitArray = (arr,chunkSize) => {
        let groups = arr.map((e,i) => { 
            return i % chunkSize === 0 ? arr.slice(i, i + chunkSize) : null; 
       }).filter(e => { return e; });

       return groups;
    }

    const getPageNumber = (e) => {
        setPageIndex(e.data)
    }


    const getItemsGroup = (items) => {
        if(items.length > 30 && items.length < 60){
            return splitArray(items,Math.floor(items.length/3)+1)
        } else if (items.length > 60) {
            console.log(Math.ceil(items.length/3))
            return splitArray(items,Math.floor(items.length/4)+1)
        } else {
            return [[...items]]
        }
    }

    return (
        <HTMLFlipBook   
        width={500}
        height={733}
        size="stretch"
        minWidth={200}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={getPageNumber}
        >
            <PageCover image={character?.image.medium_url}>{character?.name}</PageCover>
            <Page number={pageIndex} title='General'>
                <Content><p>{character?.deck}</p>
                <InlineContent>
                    <DetailTitle color="darkblue">Real name</DetailTitle>
                    <p>{character?.real_name}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="purple">Gender</DetailTitle>
                    <p data-testid='characterGender'>{Gender(character?.gender)}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="brown">Publisher</DetailTitle>
                    <p>{character?.publisher.name}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="#e2096b">Origin</DetailTitle>
                    <p>{character?.origin.name}</p>
                </InlineContent>
                <InlineContent>
                    <DetailTitle color="#ed09c7">Volumes</DetailTitle>
                    <p>{character?.volume_credits.map((volume) => (
                        `${volume.name}, `
                    ))}</p>
                </InlineContent></Content>
            </Page>
            <Page color='orange' number={pageIndex+1} title='Powers'>
                <Parts>
                    {splitArray(character?.powers,9).map((powersPart,index) => (
                        <Content
                            key={`powerContent${index}`}
                        >
                            {powersPart?.map((power) => (
                                <p
                                    key={power.id}
                                >► {power.name} </p>
                            ))}
                        </Content>
                    ))}
                </Parts>
            </Page>
            {getItemsGroup(character?.movies).map((movies,index) => (
                <Page key={`moviePage${index}`} color='#ED4C67' number={pageIndex%2===0 ? pageIndex : pageIndex+1} title='Movies'>
                    <Parts>
                        {splitArray(movies,11).map((moviesPart,index) => (
                            <Content key={`movieContent${index}`}>
                                {moviesPart?.map((movie) => (
                                    <p key={movie.id}>►{movie.name}</p>
                                ))}
                            </Content>
                        ))}
                    </Parts>
                </Page>
            ))}
            <Page color='#81ecec' number={pageIndex%2===0 ? pageIndex : pageIndex+1} title='Teams'>
                <Parts>
                    {splitArray(character?.teams,12).map((teamsPart,index) => (
                        <Content
                            key={`teamContent${index}`}
                        >
                            {teamsPart?.map((team) => (
                                <p key={team.id}>► {team.name} </p>
                            ))}
                        </Content>
                    ))}
                </Parts>
            </Page>
            {getItemsGroup(character?.team_friends).map((teamFriendsGroup,index) => (
                <Page key={`teamFriendsPage${index}`} color='lightgreen' number={pageIndex%2===0 ? pageIndex : pageIndex+1} title="Team's Friends">
                    <Parts>
                        {splitArray(teamFriendsGroup,9).map((teamFriendsPart,index) => (
                            <Content
                                key={`teamFriendsContent${index}`}
                            >
                                {teamFriendsPart?.map((teamFriend) => (
                                    <p key={teamFriend.id}>►{teamFriend.name}</p>
                                ))}
                            </Content>
                        ))}
                    </Parts>
                </Page>
            ))}
            {getItemsGroup(character?.team_enemies).map((teamEnemiesGroup,index) => (
                <Page key={`teamEnemiesPage${index}`} color='red' number={pageIndex%2===0 ? pageIndex : pageIndex+1} title="Team's Enemies">
                    <Parts>
                        {splitArray(teamEnemiesGroup,9).map((teamEnemiesPart,index) => (
                            <Content key={`teamEnemiesContent${index}`}>
                                {teamEnemiesPart?.map((teamEnemy) => (
                                    <p key={teamEnemy.id}>►{teamEnemy.name}</p>
                                ))}
                            </Content>
                        ))}
                    </Parts>
                </Page>
            ))}
        </HTMLFlipBook>
    )
}

export default CharacterDetails
