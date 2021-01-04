import React, { useState, useEffect} from 'react'
import WelcomeTab from '../../components/Tabs/WelcomeTab';
import CharactersTab from '../../components/Tabs/CharactersTab';
import ProductsTab from '../../components/Tabs/ProductsTab';
import Tabs from '../../components/Tabs/Tabs';

import welcomeBgImage from '../../images/welcomeBgImage.jpg';
import charactersBgImage from '../../images/charactersBgImage.jpg';
import productsBgImage from '../../images/productsBgImage.jpg';

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveIndex((activeIndex+1)%3)
        }, 5000)
        return () => clearTimeout(timer);
    }, [activeIndex]);

    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"60vh"}}>
            <Tabs
            tabs={initialTabs}
            activeIndex={activeIndex}
            onIndexChange={(index) => setActiveIndex(index)}
            />
        </div>
    )
}

export default Home
