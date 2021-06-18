import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import { getTotalPrice } from '../../utils/cartUtils';
import Button from '../Button/Button';
import { ItemImage, ItemWrapper, ItemContent, Wrapper } from './Checkout.styles';
import {getCurrentUser} from '../../services/Auth/authService';


const Checkout = ({onAcceptClick,orderStatus}) => {
    const {cart, updateCart} = useContext(CartContext);
    const history = useHistory();

    return (
        <Wrapper>
            {!cart.length ? <h2>Sepetinizde ürün bulunmuyor.</h2> : (
                cart.map((item) => (
                    <ItemWrapper>
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
                            payment:'EXTERNAL',
                            status:'Bekliyor'
                        })
                        if(orderStatus?.status===201) {
                            alert('Siparişiniz onaylandı. Devam Eden İşlemler kısmından süreci takip edebilirsiniz.')
                            updateCart([])
                            history.push(`/profile/${getCurrentUser().user.username}`)
                        } else {
                            alert(orderStatus?.message)
                        }
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
