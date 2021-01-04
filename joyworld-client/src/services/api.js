import axios from 'axios';

const instance = axios.create({
    baseURL:'https://5fc27cda9210060016869827.mockapi.io',
    timeout:3000
})

export const getProducts = () => {
    return instance.get('/products')
}

export const getUsers = () => {
    return instance.get('/users')
}

export const getCurrentUser = (username) => {
    return instance.get('/users',{
        params:{
            filter:`${username}`
        }
    })
}

export const createNewUser = (user) => {
    return instance.post('/users',user)
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