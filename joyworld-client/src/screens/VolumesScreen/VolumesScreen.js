import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getVolumes, getFilteredVolumes } from '../../services/comicsVineApi';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import Volumes from '../../components/Volumes/Volumes';
import { getCurrentItems } from '../../utils/paginationUtils';
import Pagination from '../../components/Pagination/Pagination';
import InternalError from '../../components/Error/InternalError';


const VolumesScreen = () => {
    const [volumes,setVolumes] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [error,setError] = useState('');
    const [value,setValue] = useState('');

    const [volumesPerPage] = useState(10);

    const [currentVolumesPage,setCurrentVolumesPage] = useState(1);

    const currentVolumes = getCurrentItems(volumes,currentVolumesPage,volumesPerPage)

    const history = useHistory();

    useEffect(() => {
        init();
    },[]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentVolumesPage])

    const filteredVolumes = async () => {
        setLoading(true)
        try {
            const {data:{results}} = await getFilteredVolumes(value);
            if(!!value && !!results.length) {setVolumes(results)}
        } catch (err) {
            setError(500)
        }
        setLoading(false);
    }

    const init =  async () => {
        setLoading(true);
        try {
            const {data:{results}} = await getVolumes();
            setVolumes(results);
        } catch(err){
            setError(500)
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
        filteredVolumes();
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            filteredVolumes();
        }
    }

    if (isLoading||(!volumes.length&&!error)) {
        return <Loader/>
    }
    
    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
    }

    return (
        <div style={{display:"flex",flexDirection:"column"}}>
            <SearchBar 
                placeHolder="Çizgi Roman Ara..."
                value={value}
                onInputChange={handleSearchChange}
                onButtonClick={handleSearchButtonClicked}
                onKeyPress={handleKeyPress}
            />
            <Volumes
                volumes={currentVolumes}
                onShowDetail={handleShowDetailClick}
            />
            <div style={{display:"flex",justifyContent:"center",marginTop:"25px"}}>
                <Pagination
                itemsPerPage={volumesPerPage}
                totalItems={volumes.length}
                paginate = {(number) => setCurrentVolumesPage(number)}
                />
            </div>
        </div>
    )
}

export default VolumesScreen;
