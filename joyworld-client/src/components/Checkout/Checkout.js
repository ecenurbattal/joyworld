import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import { ItemImage, ItemWrapper, ItemContent, Wrapper } from './Checkout.styles';

const Checkout = () => {
    const {cart} = useContext(CartContext);
    const {state} = useLocation();
    return (
        <Wrapper>
            {!cart.length ? <p style={{color:"white",textAlign:"center",fontWeight:"800",fontSize:"50px"}}>Sepetinizde ürün bulunmuyor.</p> : (
                cart.map((item) => (
                    <ItemWrapper>
                        <ItemImage data-testid='checkoutItemImage' src={item.product.image} alt={item.product.name}/>
                        <ItemContent>
                        <h1 style={{color:"red"}}>{item.product.name}</h1>
                        <h4>Fiyat: {item.product.price} TL</h4>
                        <h3>Adet: {item.qty}</h3>
                        <h2 data-testid='itemTotalPrice'>Toplam: {item.qty*item.product.price} TL</h2>
                        </ItemContent>
                    </ItemWrapper>
                ))
            )}
            {!!state && (<p style={{color:"white",textAlign:"center",fontSize:"40px",fontWeight:"900"}}>
                Toplam Tutar: {state.toFixed(2)} TL</p>)}
        </Wrapper>
    )
}

export default Checkout
