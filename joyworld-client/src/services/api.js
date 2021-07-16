import axios from 'axios';
import authHeader from './Auth/authHeader';

const instance = axios.create({
    baseURL:process.env.REACT_APP_API_URL,
    headers: authHeader(),
})

//user

export const getUser = (username) => {
    return instance.get(`/users/${username}`)
}

export const getUserInfoForConversations = (userId) => {
    return instance.get(`/users/conversation-info/${userId}`)
}

export const updateUser = (username, newData) => {
    return instance.patch(`/users/${username}`,newData)
}

export const getProductsByUser = (username) => {
    return instance.get(`/users/${username}/products`)
}

export const getIyzicoAccountId = (username) => {
    return instance.get(`/users/${username}/iyzico`)
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



//payment

export const createPaymentRequest = (request) => {
    return instance.post(`/payment`,request)
}


export const createSubMerchant = (request) => {
    return instance.post(`/payment/submerchant`,request)
}

//order

export const getOrders = (username) => {
    return instance.get(`/users/${username}/orders`)
}

export const createOrder = (order) => {
    return instance.post(`/orders`,order)
}

export const updateOrder = (id,newData) => {
    return instance.patch(`/orders/${id}`,newData);
}

export const deleteOrder = (id) => {
    return instance.delete(`/orders/${id}`);
}


//conversations

export const getConversations = async (userId) => {
    return instance.get(`/conversations/${userId}`)
}

export const createConversation = async(conversation) => {
    return instance.post(`/conversations`,conversation)
}


//messages
export const getMessages = async (chatId) => {
    return instance.get(`/messages/${chatId}`)
}

export const createMessage = async (message) => {
    return instance.post(`/messages`,message)
}

