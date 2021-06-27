import React, { useState } from 'react';
import { getCurrentItems } from '../../../utils/paginationUtils';
import Pagination from '../../Pagination/Pagination';
import { OutsideWrapper } from '../../Pagination/Pagination.styles';
import {ContentsWrapper, ListItem, ListItemText} from '../Profile.styles';

const ProfileForum = ({posts}) => {

    const [postsPerPage] = useState(5);

    const [currentPostsPage,setCurrentPostsPage] = useState(1);

    const currentPosts = getCurrentItems(posts,currentPostsPage,postsPerPage);

    return (
        <ContentsWrapper>
            {currentPosts.map((post,index) => (
                <ListItem key={`profileForum${index}`}>
                    <ListItemText
                        href={`/forum/${post._id}`}
                    >{post?.title}</ListItemText>
                </ListItem>
            ))}
            <OutsideWrapper>
                <Pagination
                itemsPerPage={postsPerPage}
                totalItems={posts.length}
                paginate = {(number) => setCurrentPostsPage(number)}
                />
            </OutsideWrapper>
        </ContentsWrapper>
    )
}

export default ProfileForum
