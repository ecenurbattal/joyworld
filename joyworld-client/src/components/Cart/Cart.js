import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import { getTotalPrice, upsertProductToChart } from '../../utils/cartUtils';
import Button from '../Button/Button';
import Counter from '../Counter/Counter';
import {FaShoppingCart} from 'react-icons/fa';
import {getCurrentUser} from '../../services/Auth/authService';

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
    updateCart(JSON.parse(localStorage.getItem(`cart${getCurrentUser().user._id}`)) ? JSON.parse(localStorage.getItem(`cart${getCurrentUser().user._id}`)) : [])
  },[updateCart])

  useEffect(() => {
    if(!!cart.length){setContentOpen(true)}
  },[cart.length])

  useOutsideAlerter(cartContentRef, () => {
    if (isContentOpen) {
      setContentOpen(false);
    }
  });

  useEffect(() => {
    !!cart.length ? localStorage.setItem(`cart${getCurrentUser().user._id}`,JSON.stringify(cart)) : 
    (localStorage.getItem(`cart${getCurrentUser().user._id}`) && localStorage.removeItem(`cart${getCurrentUser().user._id}`))
  },[cart])


  const handleIncrement = (cartItem) => {
    updateCart((prevCart) => upsertProductToChart(prevCart, cartItem.product));
  };

  const handleDecrement = (cartItem) => {
    updateCart((prevCart) =>
      upsertProductToChart(prevCart, cartItem.product, false)
    );
  };

  return (
    <Wrapper>
      <Button
        icon={<FaShoppingCart/>}
        text={`${!!cart.length ? ` (${cart.length})` : ''} `}
        onClick={() => setContentOpen((prevState) => !prevState)}
      />

      <CartContent isOpen={isContentOpen} ref={cartContentRef}>
        <CartContentList>
          {cart.map((item) => (
            <CartContentListItem key={item.product._id}>
              <Image src={`data:image/png;base64,${item.product.images[0]}`} alt={item.product.title} />
              <CartContentDetail>
                <h4>{item.product.title}</h4>
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
        <h5>Toplam Tutar: {getTotalPrice(cart).toFixed(2)}</h5>
        <Button
          text="Sepeti Onayla"
          onClick={() => {
            history.push('/checkout');
          }}
        />
      </CartContent>
    </Wrapper>
  );
};

export default Cart;
