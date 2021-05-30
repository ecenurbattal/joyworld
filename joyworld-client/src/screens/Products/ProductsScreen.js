import React, { useContext, useEffect, useState } from 'react'
import Products from '../../components/Products/Products';
import CartContext from '../../contexts/CartContext';
import {upsertProductToChart} from '../../utils/cartUtils';
import {getFilteredProducts, getProducts, getProductsWithCategoryFilter} from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';
import InternalError from '../../components/Error/InternalError';
import { ColumnWrapper } from '../../components/FormElements/WrappedFormElements';
import Menu from '../../components/Menu/Menu';
import FilterBar from '../../components/FilterBar/FilterBar';
import { OutsideWrapper } from '../../components/Pagination/Pagination.styles';
import { getCurrentItems } from '../../utils/paginationUtils';
import Pagination from '../../components/Pagination/Pagination';

const ProductsScreen = () => {
    const [products,setProducts] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [error,setError] = useState('');
    const [value,setValue] = useState('');
    const [selectedFilterValue,setSelectedFilterValue] = useState();
    const { updateCart } = useContext(CartContext);

    const [productsPerPage] = useState(10);

    const [currentProductsPage,setCurrentProductsPage] = useState(1);

    const currentProducts = getCurrentItems(products,currentProductsPage,productsPerPage);


    const history = useHistory();

    const categoriesList = ['Genel','Çizgi Roman','Kitap']

    useEffect(() => {
        const init =  async () => {
            setLoading(true);
            try {
                const {data:{data}} = await getProducts()
                setProducts(data);
            } catch(err){
                setError(500);
            }
            setLoading(false);
        }
        init();
    },[]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentProductsPage])

    const filteredProducts = async () => {
        setLoading(true);
        try {
            const {data:{data}} = await getFilteredProducts(value)
            if(!!value && !!data.length) {setProducts(data)}
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    }
    
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setValue(value);
    }

    const handleSearchButtonClick = () => {
        filteredProducts();
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            filteredProducts();
        }
    }

    const handleAddToCartClick = (product) => {
        updateCart((prevCart) => upsertProductToChart(prevCart, product));
    };

    const handleShowDetailClick = (product) => {
        history.push(`/products/${product._id}`)
    }

    const handleAddProductButtonClick = () => {
        history.push('/products/new');
    }

    const handleSelectBoxChange = async (event) => {
        event.preventDefault();
        setLoading(true);
        setSelectedFilterValue(event.target.value);
        try {
            const {data:{data}} = await getProductsWithCategoryFilter(encodeURI(event.target.value))
            if(!!event.target.value && !!data.length) {setProducts(data)}
        } catch(err) {
            setError(err)
        }

        setLoading(false);
    }

    if (isLoading||(!products.length&&!error)) {
        return <Loader/>
    }
    
    
    if (error) {
        if(['500'].includes(error)!==-1) return <InternalError/>
        else return <h1>{error}</h1>
    }

    return (
        <ColumnWrapper>
            <Menu>
                <Button 
                marginRight='auto'
                padding='8px'
                text="Yeni ürün ekle"
                onClick={handleAddProductButtonClick}
                />
                <SearchBar 
                placeHolder="Ürün Ara... " 
                value={value} 
                onInputChange={handleSearchChange} 
                onButtonClick={handleSearchButtonClick} 
                onKeyPress={handleKeyPress}
                />
                <FilterBar
                    optionList={categoriesList}
                    onChange={handleSelectBoxChange}
                    selectedValue={selectedFilterValue}
                    background={'#B33771'}
                    color={'white'}
                />
            </Menu>
            <Products
                products={currentProducts}
                onAddToCart={handleAddToCartClick}
                onShowDetail={handleShowDetailClick}
            />
            <OutsideWrapper>
                <Pagination
                    itemsPerPage={productsPerPage}
                    totalItems={products.length}
                    paginate={(number) => setCurrentProductsPage(number)}
                />
            </OutsideWrapper>
        </ColumnWrapper>
    )
}

export default ProductsScreen
