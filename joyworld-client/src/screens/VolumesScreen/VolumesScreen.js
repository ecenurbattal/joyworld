import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getVolumes, getFilteredVolumes } from '../../services/comicsVineApi';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import Volumes from '../../components/Volumes/Volumes';
import { getCurrentItems } from '../../utils/paginationUtils';
import Pagination from '../../components/Pagination/Pagination';


const VolumesScreen = () => {
    const [volumes,setVolumes] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [error,setError] = useState('');
    const [value,setValue] = useState('');
    const [term, setTerm] = useState('');

    const [volumesPerPage] = useState(10);

    const [currentVolumesPage,setCurrentVolumesPage] = useState(1);

    const currentVolumes = getCurrentItems(volumes,currentVolumesPage,volumesPerPage)

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
                    setError("Sunucu ile ilgili bir hata oluştu, lütfen daha sonra tekrar deneyiniz.")
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
            setError("Sunucu ile ilgili bir hata oluştu, lütfen daha sonra tekrar deneyiniz.")
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

    if (isLoading||!volumes.length) {
        return <Loader/>
    }
    
    if (error) {
        return <p style={{color:"white",textAlign:"center",fontSize:"30px"}}>{error}</p>;
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
