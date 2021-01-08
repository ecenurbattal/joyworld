import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Characters from '../../components/Characters/Characters';
import { getCharacters, getFilteredCharacters } from '../../services/comicsVineApi';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';


const CharactersScreen = () => {
    const [characters,setCharacters] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [error,setError] = useState('');
    const [value,setValue] = useState('');
    const [term, setTerm] = useState('');

    const history = useHistory();

    useEffect(() => {
        init();
    },[]);

    useEffect(() => {
            const filteredCharacters = async () => {
                setLoading(true)
                try {
                    const {data:{results}} = await getFilteredCharacters(term);
                    if(!!term) {setCharacters(results)}
                } catch (err) {
                    setError(err)
                }
                setLoading(false);
            }
            filteredCharacters();
    },[term])

    const init =  async () => {
        setLoading(true);
        try {
            const {data:{results}} = await getCharacters();
            setCharacters(results);
        } catch(err){
            setError(err);
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
        setTerm(value);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setTerm(value);
        }
    }

    if (isLoading || !characters.length) {
        return <Loader/>
    }
    
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <SearchBar 
                placeHolder="Karakter Ara..."
                value={value}
                onInputChange={handleSearchChange}
                onButtonClick={handleSearchButtonClicked}
                onKeyPress={handleKeyPress}
            />
            <Characters
                characters={characters}
                onShowDetail={handleShowDetailClick}
            />
        </div>
    )
}

export default CharactersScreen
