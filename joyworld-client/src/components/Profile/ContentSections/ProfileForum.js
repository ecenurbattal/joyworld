import React, { useState } from 'react';
import { getCurrentItems } from '../../../utils/paginationUtils';
import Pagination from '../../Pagination/Pagination';
import {ContentsWrapper, ListItem, ListItemText} from '../Profile.styles';

const ProfileForum = ({posts}) => {

    const [postsPerPage] = useState(5);

    const [currentPostsPage,setCurrentPostsPage] = useState(1);

    const currentPosts = getCurrentItems(posts,currentPostsPage,postsPerPage);

    return (
        <ContentsWrapper>
            {currentPosts.map((post) => (
                <ListItem>
                    <ListItemText
                        href={`/forum/${post._id}`}
                    >{post?.title}</ListItemText>
                </ListItem>
            ))}
            <div style={{display:"flex",justifyContent:"center",marginTop:"15px"}}>
                <Pagination
                itemsPerPage={postsPerPage}
                totalItems={posts.length}
                paginate = {(number) => setCurrentPostsPage(number)}
                />
            </div>
        </ContentsWrapper>
    )
}

export default ProfileForum
