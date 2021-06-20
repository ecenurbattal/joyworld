import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import { getTotalPrice } from '../../utils/cartUtils';
import Button from '../Button/Button';
import { ItemImage, ItemWrapper, ItemContent, Wrapper } from './Checkout.styles';
import {getCurrentUser} from '../../services/Auth/authService';
import { orderEnum, paymentEnum } from '../../config/Constants';


const Checkout = ({onAcceptClick}) => {
    const {cart} = useContext(CartContext);
    const history = useHistory();

    return (
        <Wrapper>
            {!cart.length ? <h2>Sepetinizde ürün bulunmuyor.</h2> : (
                cart.map((item,index) => (
                    <ItemWrapper key={`checkout${index}`}>
                        <ItemImage src={"data:image/png;base64," + item.product.images[0]} alt={item.product.name}/>
                        <ItemContent>
                        <h2>{item.product.title}</h2>
                        <h4>Fiyat: {item.product.price} TL</h4>
                        <h3>Adet: {item.qty}</h3>
                        <h2>Toplam: {item.qty*item.product.price} TL</h2>
                        </ItemContent>
                    </ItemWrapper>
                ))
            )}
            {!!cart.length && (
                <>
                    <h3>Toplam Tutar</h3>
                    <h2>{getTotalPrice(cart).toFixed(2)} TL</h2>
                    <Button
                    text='Onayla'
                    margin='15px'
                    padding='7px'
                    onClick={() =>{
                        onAcceptClick({
                            buyer: getCurrentUser().user._id,
                            owner: cart[0].product.createdBy._id,
                            cart:cart,
                            payment:paymentEnum.EXTERNAL,
                            status:orderEnum.STILL_PROGRESS
                        })
                    }}
                    />
                    <Button
                    text='Iyzico ile Ödeme'
                    margin='15px'
                    padding='7px'
                    onClick={() =>history.push('/payment')}
                    />
                </>
                
            )}
        </Wrapper>
    )
}

export default Checkout
