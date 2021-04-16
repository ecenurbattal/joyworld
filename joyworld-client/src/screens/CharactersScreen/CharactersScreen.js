import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Characters from '../../components/Characters/Characters';
import { getCharacters, getFilteredCharacters } from '../../services/comicsVineApi';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getCurrentItems } from '../../utils/paginationUtils';
import Pagination from '../../components/Pagination/Pagination';
import InternalError from '../../components/Error/InternalError';


const CharactersScreen = () => {
    const [characters,setCharacters] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [error,setError] = useState('');
    const [value,setValue] = useState('');

    const [charactersPerPage] = useState(10);

    const [currentCharactersPage,setCurrentCharactersPage] = useState(1);

    const currentCharacters = getCurrentItems(characters,currentCharactersPage,charactersPerPage)

    const history = useHistory();

    useEffect(() => {
        init();
    },[]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentCharactersPage])

    const filteredCharacters = async () => {
        setLoading(true)
        try {
            const {data:{results}} = await getFilteredCharacters(value);
            if(!!value && !!results.length) {setCharacters(results)}
        } catch (err) {
            setError(err)
        }
        setLoading(false);
    }

    const init =  async () => {
        setLoading(true);
        try {
            const {data:{results}} = await getCharacters();
            setCharacters(results);
        } catch(err){
            setError(500);
        }
        setLoading(false);
    }

    const handleShowDetailClick = (character) => {
        history.push(`/characters/${character.id}`,character.api_detail_url);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setValue(value);
    }

    const handleSearchButtonClicked = () => {
        filteredCharacters();
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            filteredCharacters();
        }
    }

    if (isLoading||(!characters.length&&!error)) {
        return <Loader/>
    }
    
    
    if (error) {
        if(['500'].includes(error)!==-1) return <InternalError/>
        else return <h1>{error}</h1>
    }

    return (
        <div style={{display:"flex",flexDirection:"column"}}>
            <SearchBar 
                placeHolder="Karakter Ara..."
                value={value}
                onInputChange={handleSearchChange}
                onButtonClick={handleSearchButtonClicked}
                onKeyPress={handleKeyPress}
            />
            <Characters
                characters={currentCharacters}
                onShowDetail={handleShowDetailClick}
            />
            <div style={{display:"flex",justifyContent:"center",marginTop:"25px"}}>
                <Pagination
                itemsPerPage={charactersPerPage}
                totalItems={characters.length}
                paginate = {(number) => setCurrentCharactersPage(number)}
                />
            </div>
        </div>
    )
}

export default CharactersScreen


