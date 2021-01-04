import React, { useContext, useEffect, useState } from 'react'
import Products from '../../components/Products/Products';
import CartContext from '../../contexts/CartContext';
import {upsertProductToChart} from '../../utils/cartUtils';
import {getProducts} from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';

const ProductsScreen = () => {
    const [products,setProducts] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [error,setError] = useState('');
    const [value,setValue] = useState('');
    const [term, setTerm] = useState('');
    const { updateCart } = useContext(CartContext);
    const history = useHistory();

    useEffect(() => {
        const init =  async () => {
            setLoading(true);
            try {
                const {data} = await getProducts()
                setProducts(data);
            } catch(err){
                setError(err);
            }
            setLoading(false);
        }
        init();
    },[]);

    useEffect(() => {
        const getFilteredProducts = async () => {
            setLoading(true);
            try {
                const {data} = await getProducts()
                const filteredProducts = data.filter(
                    (product) => product.name.toLocaleLowerCase('tr').indexOf(term.toLocaleLowerCase('tr')) !== -1
                )
                if(!!term) {setProducts(filteredProducts)}
                else {setProducts(data)}
            } catch (err) {
                setError(err)
            }
            setLoading(false)
        }
        getFilteredProducts();    
    },[term])

    
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setValue(value);
        console.log(value)
    }

    const handleSearchButtonClick = () => {
        setTerm(value);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setTerm(value);
        }
    }

    const handleAddToCartClick = (product) => {
        updateCart((prevCart) => upsertProductToChart(prevCart, product));
    };

    const handleAddProductButtonClick = () => {
        history.push('/products/new');
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
            placeHolder="Ürün Ara... " 
            value={value} 
            onInputChange={handleSearchChange} 
            onButtonClick={handleSearchButtonClick} 
            onKeyPress={handleKeyPress}
            />
            <Button 
            marginBottom="30px" 
            height="30px"
            width="150px" 
            backgroundColor="red"
            color="white"
            text="Yeni ürün ekle"
            onClick={handleAddProductButtonClick}
            />
            <Products
                products={products}
                onAddToCart={handleAddToCartClick}
            />
        </div>
    )
}

export default ProductsScreen
