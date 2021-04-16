import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Books from '../../components/Books/Books';
import InternalError from '../../components/Error/InternalError';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getBooks } from '../../services/googleBooksApi';
import { getCurrentItems } from '../../utils/paginationUtils';

const BooksScreen = () => {

    const [books,setBooks] = useState([]);
    const [isLoading,setLoading] = useState(false);
    const [error,setError] = useState(false);

    const [value,setValue] = useState('');

    const [booksPerPage] = useState(10);

    const [currentBooksPage,setCurrentBooksPage] = useState(1);

    const currentBooks = getCurrentItems(books,currentBooksPage,booksPerPage);

    const history = useHistory();
    
    useEffect(() => {
        init();
    },[]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentBooksPage])

    const init = async () => {
        setLoading(true);
        try {
            const {data:{items}} = await getBooks('zweig');
            setBooks(items);
        } catch(err){
            setError(err)
        }
        setLoading(false)
    }

    const filteredBooks = async () => {
        setLoading(true);
        try {
            const {data:{items}} = await getBooks(value);
            if(!!value && !!items.length) {setBooks(items)}
        } catch(err){
            setError(err)
        }
        setLoading(false);
    }

    const handleShowDetailClick = (book) => {
        history.push(`/books/${book.id}`)
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setValue(value)
    };

    const handleSearchButtonClicked = () => {
        filteredBooks();
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            filteredBooks();
        }
    }

    if (isLoading||(!books.length&&!error)) {
        return <Loader/>
    }
    
    
    if (error) {
        if(['500'].includes(error)!==-1) return <InternalError/>
        else return <h1>{error}</h1>
    }


    return (
        <div style={{display:"flex",flexDirection:"column"}}>
            {console.log(books)}
        <SearchBar 
            placeHolder="Kitap Ara..."
            value={value}
            onInputChange={handleSearchChange}
            onButtonClick={handleSearchButtonClicked}
            onKeyPress={handleKeyPress}
        />
        <Books
            books={currentBooks}
            onShowDetail={handleShowDetailClick}
        />
        <div style={{display:"flex",justifyContent:"center",marginTop:"25px"}}>
            <Pagination
            itemsPerPage={booksPerPage}
            totalItems={books.length}
            paginate = {(number) => setCurrentBooksPage(number)}
            />
        </div>
    </div>
    )
}

export default BooksScreen
