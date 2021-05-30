import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Button from '../../components/Button/Button';
import InternalError from '../../components/Error/InternalError';
import FilterBar from '../../components/FilterBar/FilterBar';
import Forum from '../../components/Forum/Forum';
import Loader from '../../components/Loader/Loader';
import Menu from '../../components/Menu/Menu';
import Pagination from '../../components/Pagination/Pagination';
import { OutsideWrapper } from '../../components/Pagination/Pagination.styles';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getFilteredPosts, getPosts, getPostsWithTagFilter } from '../../services/api';
import { getCurrentItems } from '../../utils/paginationUtils';

const ForumScreen = () => {

    const [posts,setPosts] = useState([]);
    const [isLoading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [value,setValue] = useState();
    const [selectedFilterValue,setSelectedFilterValue] = useState();

    const [postsPerPage] = useState(7);

    const [currentPostsPage,setCurrentPostsPage] = useState(1);

    const currentPosts = getCurrentItems(posts,currentPostsPage,postsPerPage)


    const history = useHistory();

    const tagsList = ['Genel','Çizgi Roman','Kitap']

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const {data:{data}} = await getPosts();
                setPosts(data)
            }
            catch(err){
                setError(err)
            }
            setLoading(false)
        }
        init();
    },[])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentPostsPage])

    const filteredCharacters = async () => {
        setLoading(true)
        try {
            const {data:{data}} = await getFilteredPosts(value);
            if(!!value && !!data.length) {setPosts(data)}
        } catch (err) {
            setError(err)
        }
        setLoading(false);
    }

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

    const handleShowDetailClick = (post) => {
        history.push(`/forum/${post._id}`);
    };

    const handleSelectBoxChange = async (event) => {
        event.preventDefault();
        setLoading(true)
        setSelectedFilterValue(event.target.value)
        try {
            const {data:{data}} = await getPostsWithTagFilter(encodeURI(event.target.value));
            if(!!event.target.value && !!data.length) {setPosts(data)}
        } catch (err) {
            setError(err)
        }
        
        setLoading(false);
    }

    const handleAddPostClick = async (event) => {
        event.preventDefault();
        history.push('/post/new')
    }



    if (isLoading||(!posts.length&&!error)) {
        return <Loader/>
    }
    
    if (error) {
        if(['500'].includes(error)!==-1) return <InternalError/>
        else return <h1>{error}</h1>
    }

    return (
        <div>
           <Menu>
           <Button
                    text='Yeni Gönderi Ekle'
                    marginRight='auto'
                    padding='8px'
                    onClick={(event) => handleAddPostClick(event)}
                />
            <SearchBar
                placeHolder={'İleti Ara...'}
                value={value}
                onInputChange={handleSearchChange}
                onButtonClick={handleSearchButtonClicked}
                onKeyPress={handleKeyPress}
                />
                <FilterBar
                optionList={tagsList}
                onChange={handleSelectBoxChange}
                selectedValue={selectedFilterValue}
                background={'#B33771'}
                color={'white'}
                />
           </Menu>
           <Forum 
           posts={currentPosts}
           onShowDetail={handleShowDetailClick}
           />
           <OutsideWrapper>
                <Pagination
                itemsPerPage={postsPerPage}
                totalItems={posts.length}
                paginate = {(number) => setCurrentPostsPage(number)}
                />
            </OutsideWrapper>
        </div>
    )
}

export default ForumScreen
