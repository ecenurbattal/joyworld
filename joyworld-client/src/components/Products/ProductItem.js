import React, { useContext } from 'react';
import SessionContext from '../../contexts/SessionContext';
import Button from '../Button/Button';
import { CardContent, CardWrapper } from './Products.styles';

const ProductItem = ({ product, onAddToCart }) => {
  const {user} = useContext(SessionContext);
  return (
    <CardWrapper>
      <img data-testid="productImage" width="250px" height="190px" src={product.image} alt={product.name} />
      <CardContent>
        <h3>{product.name}</h3>
        <h4>{product.price} TL</h4>
        <p><strong>Ürünün Sahibi: </strong>{product.createdBy}</p>
        {(product.createdBy!==user.username)&&<Button
          text="Sepete Ekle"
          onClick={(event) => {
            event.stopPropagation();
            onAddToCart && onAddToCart(product);
          }}
        />}
      </CardContent>
    </CardWrapper>
  );
};

export default ProductItem;
