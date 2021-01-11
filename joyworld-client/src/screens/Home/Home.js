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
    const [activeIndex, setActiveIndex] = useState(0);
    const [comicNews, setComicNews] = useState([]);
    const comicNewsUrl = 'http://localhost:8080/comicnews'

    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveIndex((activeIndex+1)%3)
        }, 5000)
        return () => clearTimeout(timer);
    }, [activeIndex]);

    useEffect(() => {
        const getComicNews = async () => {
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
        }
        getComicNews();
    },[])

    return (
        <div style={{display:"flex",flexDirection:"column",minHeight:"100vh"}}>
            <Tabs
            tabs={initialTabs}
            activeIndex={activeIndex}
            onIndexChange={(index) => setActiveIndex(index)}
            />
            <ContainerWrapper>
                <News news={comicNews} title='Çizgi Roman Dünyası Haberleri'/>
                <News news={comicNews} title='Edebiyat Dünyası Haberleri'/>
            </ContainerWrapper>
        </div>
    )
}

export default Home
