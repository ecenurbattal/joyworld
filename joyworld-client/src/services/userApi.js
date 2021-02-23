import axios from 'axios';
import authHeader from './Auth/authHeader';

const instance = axios.create({
    baseURL:'http://localhost:8080/users',
    headers: authHeader(),
})

export const getProducts = () => {
    return instance.get('/products')
}


export const getUser = (username) => {
    return instance.get('/users',{
        params:{
            filter:`${username}`
        }
    })
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