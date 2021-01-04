import React from 'react';

const CartContext = React.createContext({
    cart: [], // {qty: 1, product: {}}
    updateCart: (newBasket) => {},
});

export default CartContext;
