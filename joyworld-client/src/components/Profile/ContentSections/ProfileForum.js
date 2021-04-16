import React from 'react';
import {ContentsWrapper, ListItem, ListItemText} from '../Profile.styles';

const ProfileForum = ({posts}) => {
    return (
        <ContentsWrapper>
            {posts.map((post) => (
                <ListItem>
                    <ListItemText>{post?.title}</ListItemText>
                </ListItem>
            ))}
        </ContentsWrapper>
    )
}

export default ProfileForum
