import React from 'react';
import ProductItem from './ProductItem';

import { Wrapper } from './Products.styles';

const Products = ({ products, onAddToCart, onShowDetail }) => {
  return (
    <Wrapper>
      {products?.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
          onShowDetail={onShowDetail}
        />
      ))}
    </Wrapper>
  );
};

export default Products;
