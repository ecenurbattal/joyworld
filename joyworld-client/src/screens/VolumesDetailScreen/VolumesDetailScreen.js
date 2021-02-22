import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getVolume } from '../../services/comicsVineApi';
import Loader from '../../components/Loader/Loader';
import VolumeDetails from '../../components/VolumeDetails/VolumeDetails';
import InternalError from '../../components/Error/InternalError';

const VolumeDetailsScreen = () => {

    const  {state}  = useLocation();

    const [volume,setVolume] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true)
        const init = async () => {
            try {
                const {data:{results}} = await getVolume(state);
                setVolume(results);
                console.log(results)
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
        <VolumeDetails volume={volume}/>
    )
}

export default VolumeDetailsScreen
