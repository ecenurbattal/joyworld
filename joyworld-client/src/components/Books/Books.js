import React from 'react';
import BookItem from './BookItem';
import {Wrapper} from '../Card/Card.styles';

const Books = ({books,onShowDetail}) => {
    return (
        <Wrapper>
            {books?.map((book) => (
                <BookItem
                    key={book.id}
                    book={book}
                    onShowDetail={onShowDetail}
                />
            ))}
        </Wrapper>
    )
}

export default Books
