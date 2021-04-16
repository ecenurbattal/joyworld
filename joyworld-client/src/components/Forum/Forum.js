import React from 'react'
import ForumItem from './ForumItem'

const Forum = ({posts,onShowDetail}) => {
    return (
        <div>
            {posts.map((post,i) => (
                <ForumItem 
                    post={post}
                    i={i}
                    onShowDetail={onShowDetail}
                />
            ))}
            
        </div>
    )
}

export default Forum
