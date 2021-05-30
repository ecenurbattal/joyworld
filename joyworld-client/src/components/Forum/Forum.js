import React from 'react'
import ForumItem from './ForumItem'

const Forum = ({posts,onShowDetail}) => {
    return (
        <div>
            {posts.map((post,i) => (
                <ForumItem
                    key={post._id} 
                    post={post}
                    i={i}
                    onShowDetail={onShowDetail}
                />
            ))}
            
        </div>
    )
}

export default Forum
