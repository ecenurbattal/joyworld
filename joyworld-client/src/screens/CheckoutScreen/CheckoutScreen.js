import React, { useState } from 'react';
import Checkout from '../../components/Checkout/Checkout';
import Loader from '../../components/Loader/Loader';
import {createOrder} from '../../services/api';
import InternalError from '../../components/Error/InternalError';

const CheckoutScreen = () => {

    const [orderStatus,setOrderStatus] = useState();
    const [isLoading,setLoading] = useState();
    const [error,setError] = useState();

    const handleAcceptClick = async (newOrder) => {
        try {
            setLoading(true);
            const response = await createOrder(newOrder);
            console.log(response)
            setOrderStatus({
                status:response.status,
                message:response.data.message
            })
        } catch(err){
            if(err.response.status===500) setError(err.response.status)
            else setError(err.response.data.message)
        }
    }

    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
    }

    if (isLoading||(!orderStatus.length&&!error)) {
        return <Loader/>
    }


    return (
        <Checkout
            onAcceptClick={handleAcceptClick}
            orderStatus={orderStatus}
        />
    )
}

export default CheckoutScreen
