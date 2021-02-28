import axios from 'axios';
import authHeader from './Auth/authHeader';

const instance = axios.create({
    baseURL:'http://localhost:8080',
    headers: authHeader(),
})


export const getUser = (username) => {
    return instance.get(`/users/${username}`)
}

export const updateUser = (username, newData) => {
    return instance.patch(`/users/${username}`,newData)
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