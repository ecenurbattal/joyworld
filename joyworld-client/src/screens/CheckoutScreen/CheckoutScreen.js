import React, { useContext, useState } from 'react';
import Checkout from '../../components/Checkout/Checkout';
import Loader from '../../components/Loader/Loader';
import {createOrder} from '../../services/api';
import InternalError from '../../components/Error/InternalError';
import CartContext from '../../contexts/CartContext';
import { useHistory } from 'react-router-dom';
import { getCurrentUser } from '../../services/Auth/authService';

const CheckoutScreen = () => {

    const {updateCart} = useContext(CartContext)
    const [isLoading,setLoading] = useState(false);
    const [error,setError] = useState('');

    const history = useHistory();

    const handleAcceptClick = async (newOrder) => {
        setLoading(true);
        try {
            const response = await createOrder(newOrder);
            if(response.status===201) {
                alert('Siparişiniz onaylandı. Devam Eden İşlemler kısmından süreci takip edebilirsiniz.')
                updateCart([])
                history.push(`/profile/${getCurrentUser().user.username}`)
            } else {
                alert(response.data.message)
            }
        } catch(err){
            if(err.response.status===500) setError(err.response.status)
            else setError(err.response.data.message)
        }
        setLoading(false)
    }

    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
    }

    if (isLoading) {
        return <Loader/>
    }


    return (
        <Checkout
            onAcceptClick={handleAcceptClick}
        />
    )
}

export default CheckoutScreen
