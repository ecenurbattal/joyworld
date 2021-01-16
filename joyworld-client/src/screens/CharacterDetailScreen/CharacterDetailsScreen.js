import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getCharacter } from '../../services/comicsVineApi';
import Loader from '../../components/Loader/Loader';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails';
import InternalError from '../../components/Error/InternalError';

const CharacterDetailsScreen = () => {

    const  {state}  = useLocation();

    const [character,setCharacter] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true)
        const init = async () => {
            try {
                const {data:{results}} = await getCharacter(state);
                setCharacter(results);
            } catch (err){
                setError(500);
            }
            setLoading(false);
        }
    init();
    }, [state]);

    if (isLoading) {
        return <Loader/>
    }
    
    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
    }
    
    return (
        <CharacterDetails character={character}/>
    )
}

export default CharacterDetailsScreen
