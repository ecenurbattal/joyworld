import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import { upsertProductToChart } from '../../utils/cartUtils';
import Button from '../Button/Button';
import Counter from '../Counter/Counter';
import {FaShoppingCart} from 'react-icons/fa'

import {
  CartContent,
  CartContentList,
  CartContentListItem,
  Wrapper,
  Image,
  CartContentDetail,
} from './Cart.styles';

const Cart = () => {
  const history = useHistory();
  const [isContentOpen, setContentOpen] = useState(false);
  const cartContentRef = useRef(null);

  const { cart, updateCart } = useContext(CartContext);

  useEffect(() => {
    if(!!cart.length){setContentOpen(true)}
  },[cart.length])

  useOutsideAlerter(cartContentRef, () => {
    if (isContentOpen) {
      setContentOpen(false);
    }
  });


  const handleIncrement = (cartItem) => {
    updateCart((prevCart) => upsertProductToChart(prevCart, cartItem.product));
  };

  const handleDecrement = (cartItem) => {
    updateCart((prevCart) =>
      upsertProductToChart(prevCart, cartItem.product, false)
    );
  };

  const totalPrice = cart.reduce((previousValue, currentItem) => {
    return previousValue + currentItem.product.price * currentItem.qty;
  }, 0);

  return (
    <Wrapper>
      <Button
        fontSize='20px'
        width="33px"
        icon={<FaShoppingCart/>}
        role='cartButton'
        text={`${!!cart.length ? ` (${cart.length})` : ''} `}
        onClick={() => setContentOpen((prevState) => !prevState)}
      />

      <CartContent isOpen={isContentOpen} ref={cartContentRef}>
        <CartContentList>
          {cart.map((item) => (
            <CartContentListItem key={`product-${item.product.id}`}>
              <Image src={item.product.image} alt={item.product.name} />
              <CartContentDetail>
                <h4>{item.product.name}</h4>
                <Counter
                  value={item.qty}
                  onIncrement={() => handleIncrement(item)}
                  onDecrement={() => handleDecrement(item)}
                />
              </CartContentDetail>
            </CartContentListItem>
          ))}
          {!cart.length && <p>Sepetinize henüz bir ürün eklemediniz. </p>}
        </CartContentList>
        <h5>Toplam Tutar: {totalPrice.toFixed(2)}</h5>
        <Button
          text="Ödeme"
          onClick={() => {
            history.push('/checkout',totalPrice);
          }}
        />
      </CartContent>
    </Wrapper>
  );
};

export default Cart;
