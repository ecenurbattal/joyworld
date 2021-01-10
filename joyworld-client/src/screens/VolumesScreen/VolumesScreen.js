import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getVolumes, getFilteredVolumes } from '../../services/comicsVineApi';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import Volumes from '../../components/Volumes/Volumes';


const VolumesScreen = () => {
    const [volumes,setVolumes] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [error,setError] = useState('');
    const [value,setValue] = useState('');
    const [term, setTerm] = useState('');

    const history = useHistory();

    useEffect(() => {
        init();
    },[]);

    useEffect(() => {
            const filteredVolumes = async () => {
                setLoading(true)
                try {
                    const {data:{results}} = await getFilteredVolumes(term);
                    if(!!term && !!results.length) {setVolumes(results)}
                } catch (err) {
                    setError(err)
                }
                setLoading(false);
            }
            filteredVolumes();
    },[term])

    const init =  async () => {
        setLoading(true);
        try {
            const {data:{results}} = await getVolumes();
            setVolumes(results);
        } catch(err){
            setError(err);
        }
        setLoading(false);
    }

    const handleShowDetailClick = (volume) => {
        history.push(`/volumes/${volume.id}`,volume.api_detail_url);
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

    if (isLoading) {
        return <Loader/>
    }
    
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <SearchBar 
                placeHolder="Çizgi Roman Ara..."
                value={value}
                onInputChange={handleSearchChange}
                onButtonClick={handleSearchButtonClicked}
                onKeyPress={handleKeyPress}
            />
            <Volumes
                volumes={volumes}
                onShowDetail={handleShowDetailClick}
            />
        </div>
    )
}

export default VolumesScreen;
