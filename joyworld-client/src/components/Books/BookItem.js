import React from 'react'
import {CardContent, CardWrapper} from '../Card/Card.styles';
import bookPicture from '../../images/book.png';

const BookItem = ({book,onShowDetail}) => {

    return (
        <CardWrapper
            onClick = {() => {
                onShowDetail && onShowDetail(book)
            }}
        >
            <img width='250px' height='190px' 
            src={book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks?.thumbnail : bookPicture} 
            alt={book&&book.id}/>
            <CardContent>
                <h3>{book?.volumeInfo.title}</h3>
                {book?.volumeInfo.description && <hr />}
                {book?.volumeInfo.description && book?.volumeInfo.description.length > 50
                ? book?.volumeInfo.description.substr(0,50) + '...'
                : book?.volumeInfo.description
                }
            </CardContent>
        </CardWrapper>
    )
}

export default BookItem
