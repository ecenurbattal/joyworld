import axios from 'axios';
import authHeader from './Auth/authHeader';

const instance = axios.create({
    baseURL:'http://localhost:8080',
    headers: authHeader(),
})

//user

export const getUser = (username) => {
    return instance.get(`/users/${username}`)
}

export const updateUser = (username, newData) => {
    return instance.patch(`/users/${username}`,newData)
}

//posts

export const getPosts = () => {
    return instance.get('/posts')
}

export const getFilteredPosts = (value) => {
    return instance.get('/posts/search',{
        params:{
            query:`${value}`
        }
    })
}

export const getPost = (postId) => {
    return instance.get(`/posts/${postId}`)
}

export const getPostsWithTagFilter = (selectedValue) => {
    return instance.get('/posts',{
        params:{
            tag:`${selectedValue}`
        }
    })
}

export const updatePost = (postId, newData) => {
    return instance.patch(`/posts/${postId}`,newData)
}

export const deletePost = (postId) => {
    return instance.delete(`/posts/${postId}`)
}

export const createPost = (post) => {
    return instance.post('/posts',post)
}

//comment

export const createComment = (comment) => {
    return instance.post(`/posts/${comment.belongTo}/comments`,comment);
}

export const updateComment = (comment,commentId) => {
    return instance.patch(`/posts/${comment.belongTo}/comments/${commentId}`,comment)
}


export const deleteComment = (postId,commentId) => {
    return instance.delete(`/posts/${postId}/comments/${commentId}`);
}





export const getProducts = () => {
    return instance.get('/products')
}

export const createNewProduct = (product,currentUserProducts,id) => {
    return (
        instance.post('/products',product),
        instance.put(`/users/${id}`,{
                products:[
                    ...currentUserProducts,
                    product
                ]
            }
        )
    )
}