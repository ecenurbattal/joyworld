import React, { useState, useEffect} from 'react'
import WelcomeTab from '../../components/Tabs/WelcomeTab';
import ComicTab from '../../components/Tabs/ComicTab';
import ProductsTab from '../../components/Tabs/ProductsTab';
import Tabs from '../../components/Tabs/Tabs';

import welcomeBgImage from '../../images/welcomeBgImage.jpg';
import comicBgImage from '../../images/comicBgImage.jpg';
import productsBgImage from '../../images/productsBgImage.jpg';
import booksBgImage from '../../images/booksBgImage.jpg';
import forumBgImage from '../../images/forumBgImage.jpg';

import {ContainerWrapper} from '../../components/News/News.styles';
import News from '../../components/News/News';
import axios from 'axios';
import { getCurrentItems } from '../../utils/paginationUtils';
import Loader from '../../components/Loader/Loader';
import InternalError from '../../components/Error/InternalError';
import BooksTab from '../../components/Tabs/BooksTab';
import ForumTab from '../../components/Tabs/ForumTab';

const initialTabs = [
    {
        header: () => 'Hoşgeldiniz',
        content: () => <WelcomeTab/>,
        bgImage: () => welcomeBgImage,
    },
    {
        header: () => 'Çizgi Roman',
        content: () => <ComicTab/>,
        bgImage: () => comicBgImage,
    },
    {
        header: () => 'Kitaplar',
        content: () => <BooksTab/>,
        bgImage: () => booksBgImage,
    },
    {
        header: () => 'Ürünler',
        content: () => <ProductsTab/>,
        bgImage:() => productsBgImage,
    },
    {
        header: () => 'Forum',
        content: () => <ForumTab/>,
        bgImage:() => forumBgImage,
    },
];


const Home = () => {
    const [isLoading,setLoading] = useState(false);
    const [error,setError] = useState('');

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const [activeComicNewsIndex,setActiveComicNewsIndex] = useState(0);
    const [activeBooksNewsIndex,setActiveBooksNewsIndex] = useState(0);

    const [comicNews, setComicNews] = useState([]);
    const [currentComicNewsPage,setCurrentComicNewsPage] = useState(1);

    const [booksNews,setBooksNews] = useState([]);
    const [currentBooksNewsPage, setCurrentBooksNewsPage] = useState(1);

    const [newsPerPage] = useState(4);

    const comicNewsUrl = 'http://localhost:8080/comicnews';
    const booksNewsUrl = 'http://localhost:8080/booksnews'


    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveTabIndex((activeTabIndex+1)%initialTabs.length)
        }, 10000)
        return () => clearTimeout(timer);
    }, [activeTabIndex]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveComicNewsIndex((activeComicNewsIndex+1)%newsPerPage)
        }, 5000)
        return () => clearTimeout(timer);
    }, [activeComicNewsIndex,newsPerPage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveBooksNewsIndex((activeBooksNewsIndex+1)%newsPerPage)
        }, 5000)
        return () => clearTimeout(timer);
    }, [activeBooksNewsIndex,newsPerPage]);

    useEffect(() => {
        const getComicNews = async () => {
            setLoading(true)
            try {
                await axios.get(comicNewsUrl)
                        .then(response => {
                            setComicNews(response.data)
                        })
                        .catch(error => {
                            setError(500)
                        })
            } catch(err){
                setError(err.message)
            }
            setLoading(false)
        }
        getComicNews();
    },[])

    useEffect(() => {
        const getBooksNews = async () => {
            setLoading(true)
            try {
                await axios.get(booksNewsUrl)
                        .then(response => {
                            setBooksNews(response.data)
                        })
                        .catch(error => {
                            setError(500)
                        })
            } catch(err){
                setError(err.message)
            }
            setLoading(false)
        }
        getBooksNews();
    },[])


    const currentComicNews = getCurrentItems(comicNews, currentComicNewsPage, newsPerPage)
    const currentBooksNews = getCurrentItems(booksNews, currentBooksNewsPage, newsPerPage)

    if(isLoading || ((!currentBooksNews.length || !currentComicNews.length) &&!error)){
        return <Loader/>
    }

    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
    }

    return (
        <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
            <Tabs
            tabs={initialTabs}
            activeIndex={activeTabIndex}
            onIndexChange={(index) => setActiveTabIndex(index)}
            />
            <ContainerWrapper>
                <News 
                news={currentComicNews}
                title='Çizgi Roman Dünyası Haberleri'
                activeIndex={activeComicNewsIndex}
                onIndexChange={(index) => setActiveComicNewsIndex(index)}

                itemsPerPage={newsPerPage}
                totalItems={comicNews.length}
                paginate = {(number) => setCurrentComicNewsPage(number)}
                />
                <News
                news={currentBooksNews}
                title='Edebiyat Dünyası Haberleri'
                activeIndex={activeBooksNewsIndex}
                onIndexChange={(index) => setActiveBooksNewsIndex(index)}

                itemsPerPage={newsPerPage}
                totalItems={booksNews.length}
                paginate={(number) => setCurrentBooksNewsPage(number)} 
                />
            </ContainerWrapper>
        </div>
    )
}

export default Home
