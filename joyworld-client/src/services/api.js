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

//exchange

export const getExchanges = (username) => {
    return instance.get(`/users/${username}/exchanges`)
}

export const createExchange = (exchange) => {
    return instance.post(`/users/exchanges`,exchange)
}

export const updateExchange = (id,newData) => {
    return instance.patch(`/users/exchanges/${id}`,newData);
}

export const deleteExchange = (id) => {
    return instance.delete(`/users/exchanges/${id}`);
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


//products


export const getProducts = () => {
    return instance.get('/products')
}

export const createProduct = (product) => {
    return instance.post('/products',product);
}

export const getProduct = (productId) => {
    return instance.get(`/products/${productId}`)
}

export const getFilteredProducts = (value) => {
    return instance.get('/products/search',{
        params:{
            query:`${value}`
        }
    })
}

export const getProductsWithCategoryFilter = (selectedValue) => {
    return instance.get('/products',{
        params:{
            category:`${selectedValue}`
        }
    })
}

export const updateProduct = (productId,newData) => {
    return instance.patch(`/products/${productId}`,newData);
}

export const deleteProduct = (productId) => {
    return instance.delete(`/products/${productId}`)
}