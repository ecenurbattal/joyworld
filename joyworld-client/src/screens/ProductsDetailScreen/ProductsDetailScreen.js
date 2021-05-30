import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {ColumnWrapper} from '../../components/FormElements/WrappedFormElements';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import { createExchange, getProduct } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import InternalError from '../../components/Error/InternalError';
import { upsertProductToChart } from '../../utils/cartUtils';
import CartContext from '../../contexts/CartContext';

const ProductsDetailScreen = () => {

    const [currentSlide,setCurrentSlide] = useState(0);
    const [product,setProduct] = useState();

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const {productId} = useParams();
    const {updateCart} = useContext(CartContext);

    useEffect(() => {
        setLoading(true)
        const init = async () => {
            try {
                const {data:{data}} = await getProduct(productId);
                setProduct(data);
            } catch(error) {
                setError(error)
            }
            setLoading(false)
        }
        init();
    },[productId])

    const handleSlideChange = (isRight) => {
        setCurrentSlide((isRight ? currentSlide+1 : (currentSlide === 0 ? (product.images.length-1) : currentSlide-1))%(product?.images.length))
    }

    const handleAddToCartClick = (product) => {
        updateCart((prevCart) => upsertProductToChart(prevCart, product));
    };

    const handleExchangeSubmit = async (exchangeInfo) => {
        setLoading(true);
        try {
            const {data:{data}} = await createExchange(exchangeInfo);
            alert('Takas isteği başarıyla gerçekleştirildi. Profilinizdeki takas istekleri kısmından takip edebilirsiniz.')
            window.location.reload();
        } catch(err) {
            setError(err)
        }
        setLoading(false)
    }

    if (isLoading) {
        return <Loader/>
    }
    
    if (error) {
        if(['500'].includes(error)!==-1) return <InternalError/>
        else return <h1>{error}</h1>
    }


    return (
        <ColumnWrapper>
            <ProductDetail
                product={product}
                onSlideChange={handleSlideChange}
                currentSlide={currentSlide}
                onAddCart={handleAddToCartClick}
                onExchangeSubmit={handleExchangeSubmit}
            />
        </ColumnWrapper>
    )
}

export default ProductsDetailScreen
