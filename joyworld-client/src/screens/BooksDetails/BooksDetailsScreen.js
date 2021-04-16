import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import BookDetail from '../../components/BookDetail/BookDetail';
import InternalError from '../../components/Error/InternalError';
import Loader from '../../components/Loader/Loader';
import { getBook } from '../../services/googleBooksApi';

const BooksDetailsScreen = () => {

    const [book,setBook] = useState();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const {bookId} = useParams();

    useEffect(() => {
        setLoading(true);
        const init = async () => {
            try {
                const {data} = await getBook(bookId);
                setBook(data);
                console.log(data)
            } catch(err) {
                setError(err)
            }
            setLoading(false);
        }
        init();
    },[bookId])

    if (isLoading) {
        return <Loader/>
    }
    
    if (error) {
        if(['500'].includes(error)!==-1) return <InternalError/>
        else return <h1>{error}</h1>
    }

    return (
       <BookDetail book={book}/>
    )
}

export default BooksDetailsScreen
