import React, { useState } from 'react'
import { getCurrentItems } from '../../../utils/paginationUtils';
import Pagination from '../../Pagination/Pagination';
import { OutsideWrapper } from '../../Pagination/Pagination.styles';
import { ContentsWrapper, ListItem, ListItemText } from '../Profile.styles';

const ProfileProducts = ({products}) => {
    const [productsPerPage] = useState(5);

    const [currentProductsPage,setCurrentProductsPage] = useState(1);

    const currentProducts = getCurrentItems(products,currentProductsPage,productsPerPage);

    return (
        <ContentsWrapper>
            {currentProducts.map((product,index) => (
                <ListItem key={`profileProduct${index}`}>
                    <ListItemText
                        href={`/products/${product._id}`}
                    >{product?.title}</ListItemText>
                </ListItem>
            ))}
            <OutsideWrapper>
                <Pagination
                itemsPerPage={productsPerPage}
                totalItems={products.length}
                paginate = {(number) => setCurrentProductsPage(number)}
                />
            </OutsideWrapper>
        </ContentsWrapper>
    )
}

export default ProfileProducts;
