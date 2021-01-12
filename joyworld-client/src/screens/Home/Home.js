import React, { useState, useEffect} from 'react'
import WelcomeTab from '../../components/Tabs/WelcomeTab';
import CharactersTab from '../../components/Tabs/CharactersTab';
import ProductsTab from '../../components/Tabs/ProductsTab';
import Tabs from '../../components/Tabs/Tabs';

import welcomeBgImage from '../../images/welcomeBgImage.jpg';
import charactersBgImage from '../../images/charactersBgImage.jpg';
import productsBgImage from '../../images/productsBgImage.jpg';

import {ContainerWrapper} from '../../components/News/News.styles';
import News from '../../components/News/News';
import axios from 'axios';
import { getCurrentItems } from '../../utils/paginationUtils';
import Loader from '../../components/Loader/Loader';

const initialTabs = [
    {
        header: () => 'Hoşgeldiniz',
        content: () => <WelcomeTab/>,
        bgImage: () => welcomeBgImage,
    },
    {
        header: () => 'Karakterler',
        content: () => <CharactersTab/>,
        bgImage: () => charactersBgImage,
    },
    {
        header: () => 'Ürünler',
        content: () => <ProductsTab/>,
        bgImage:() => productsBgImage,
    },
];


const Home = () => {
    const [isLoading,setLoading] = useState(false);

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const [activeComicNewsIndex,setActiveComicNewsIndex] = useState(0);
    const [activeBookNewsIndex,setActiveBookNewsIndex] = useState(0);

    const [comicNews, setComicNews] = useState([]);
    const [currentComicNewsPage,setCurrentComicNewsPage] = useState(1);

    const [currentBookNewsPage, setCurrentBookNewsPage] = useState(1);

    const [newsPerPage] = useState(4);

    const comicNewsUrl = 'http://localhost:8080/comicnews';


    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveTabIndex((activeTabIndex+1)%3)
        }, 5000)
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
            setActiveBookNewsIndex((activeBookNewsIndex+1)%newsPerPage)
        }, 5000)
        return () => clearTimeout(timer);
    }, [activeBookNewsIndex,newsPerPage]);

    useEffect(() => {
        const getComicNews = async () => {
            setLoading(true)
            try {
                await axios.get(comicNewsUrl)
                        .then(response => {
                            setComicNews(response.data)
                        })
                        .catch(error => {
                            console.log(error)
                        })
            } catch(err){
                console.log(err)
            }
            setLoading(false)
        }
        getComicNews();
    },[])

    const currentComicNews = getCurrentItems(comicNews, currentComicNewsPage, newsPerPage)
    const currentBookNews = getCurrentItems(comicNews, currentBookNewsPage, newsPerPage)

    if(isLoading){
        return <Loader/>
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
                news={currentBookNews}
                title='Edebiyat Dünyası Haberleri'
                activeIndex={activeBookNewsIndex}
                onIndexChange={(index) => setActiveBookNewsIndex(index)}

                itemsPerPage={newsPerPage}
                totalItems={comicNews.length}
                paginate={(number) => setCurrentBookNewsPage(number)} 
                />
            </ContainerWrapper>
        </div>
    )
}

export default Home
