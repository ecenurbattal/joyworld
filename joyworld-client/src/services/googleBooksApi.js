import axios from 'axios';

const instance = axios.create({
    baseURL:'https://www.googleapis.com/books/v1',
    params: {
        key:process.env.REACT_APP_GOOGLE_BOOKS_API_KEY,
    }
})

export const getBooks = (searchQuery) => {
    return instance.get('/volumes',{
        params: {
            maxResults:'40',
            q:`${searchQuery}`,
            projection:'lite'
        }
    })
}

export const getBook = (bookId) => {
    return instance.get(`/volumes/${bookId}`)
}