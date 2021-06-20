import React, { useContext, useState } from 'react';
import Button from '../../components/Button/Button';
import InternalError from '../../components/Error/InternalError';
import { Box, FormContainer, RowWrapper, StyledTextArea, SubTitle, Title } from '../../components/FormElements/WrappedFormElements';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';
import { createPaymentRequest} from '../../services/api';
import CartContext from '../../contexts/CartContext';
import {getTotalPrice} from '../../utils/cartUtils';
import { SummaryWrapper, Information } from './Payment.styles';
import { getCurrentUser } from '../../services/Auth/authService';
import { paymentEnum,orderEnum } from '../../config/Constants';

const PaymentScreen = () => {

    const {cart} = useContext(CartContext);

    const [isLoading,setLoading] = useState(false);
    const [error,setError] = useState(false);

    const totalPrice = getTotalPrice(cart)

    const [paymentRequest,setPaymentRequest] = useState({
        price:totalPrice,
        paidPrice:totalPrice,
        order:{
            buyer: getCurrentUser().user._id,
            owner: cart[0].product.createdBy._id,
            cart:cart,
            payment:paymentEnum.IYZICO,
            status:orderEnum.STILL_PROGRESS
        },
        basketItems:cart.map((item) => {
            return {
                id:item.product._id,
                name:item.product.title,
                category1:item.product.category,
                price: String(item.product.price*item.qty)
            }
        })
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
            try {
                const {data} = await createPaymentRequest(paymentRequest);
                window.location.replace(data.data.paymentPageUrl)
            } catch(err) {
               if(err.response.status===500) setError(500)
               else setError(err.response.data.message)
            }
        setLoading(false)
    } 

    if (isLoading&&!error) {
        return <Loader/>
    }

    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
    }


    return (
        <RowWrapper>
            <Box>
            <Title>Gönderi Bilgileri</Title>
            <FormContainer onSubmit={handleSubmit}>
            <Input
                    style={{height:"30px",width:"65%"}}
                    type="text"
                    name="identity"
                    placeholder="Tc Kimlik No.."
                    required={true}
                    onChange={(event) => {
                        setPaymentRequest({
                            ...paymentRequest,
                            buyer:{
                                ...paymentRequest.buyer,
                                identityNumber:event.target.value
                            }
                        })
                    }}
                />
                <Input
                    style={{height:"30px",width:"65%"}}
                    type="text"
                    name="name"
                    placeholder="Ad.."
                    required={true}
                    onChange={(event) => {
                        setPaymentRequest({
                            ...paymentRequest,
                            buyer:{
                                ...paymentRequest.buyer,
                                name:event.target.value
                            }
                        })
                    }}
                />
                <Input
                    style={{height:"30px",width:"65%"}}
                    type="text"
                    name="surname"
                    placeholder="Soyad.."
                    required={true}
                    onChange={(event) => {
                        setPaymentRequest({
                            ...paymentRequest,
                            buyer:{
                                ...paymentRequest.buyer,
                                surname:event.target.value
                            }
                        })
                    }}
                />
                <Input
                    style={{height:"30px",width:"65%"}}
                    type="text"
                    name="gsm"
                    placeholder="Telefon Numarası.."
                    required={true}
                    onChange={(event) => {
                        setPaymentRequest({
                            ...paymentRequest,
                            buyer:{
                                ...paymentRequest.buyer,
                                gsmNumber:event.target.value
                            }
                        })
                    }}
                />
                <Input
                    style={{height:"30px",width:"65%"}}
                    type="email"
                    name="email"
                    placeholder="E-Posta.."
                    required={true}
                    onChange={(event) => {
                        setPaymentRequest({
                            ...paymentRequest,
                            buyer:{
                                ...paymentRequest.buyer,
                                email:event.target.value
                            }
                        })
                    }}
                />
                <StyledTextArea
                    style={{minHeight:"90px",minWidth:"65%"}}
                    type="text"
                    name="address"
                    placeholder="Adres.."
                    required={true}
                    onChange={(event) => {
                        setPaymentRequest({
                            ...paymentRequest,
                            buyer:{
                                ...paymentRequest.buyer,
                                address:event.target.value
                            },
                            shippingAddress:{
                                ...paymentRequest.shippingAddress,
                                address:event.target.value
                            }
                        })
                    }}
                />
                <Input
                    style={{height:"30px",width:"65%"}}
                    type="text"
                    name="city"
                    placeholder="Şehir..."
                    required={true}
                    onChange={(event) => {
                        setPaymentRequest({
                            ...paymentRequest,
                            buyer:{
                                ...paymentRequest.buyer,
                                city:event.target.value
                            },
                            shippingAddress:{
                                ...paymentRequest.shippingAddress,
                                city:event.target.value
                            }
                        })
                    }}
                />
                <Input
                    style={{height:"30px",width:"65%"}}
                    type="text"
                    name="country"
                    placeholder="Ülke.."
                    required={true}
                    onChange={(event) => {
                        setPaymentRequest({
                            ...paymentRequest,
                            buyer:{
                                ...paymentRequest.buyer,
                                country:event.target.value
                            },
                            shippingAddress:{
                                ...paymentRequest.shippingAddress,
                                country:event.target.value
                            }
                        })
                    }}
                />
                <Input
                    style={{height:"30px",width:"65%"}}
                    type="text"
                    name="zipcode"
                    placeholder="Zip Kodu.."
                    onChange={(event) => {
                        setPaymentRequest({
                            ...paymentRequest,
                            buyer:{
                                ...paymentRequest.buyer,
                                zipCode:event.target.value
                            },
                            shippingAddress:{
                                ...paymentRequest.shippingAddress,
                                zipCode:event.target.value
                            }
                        })
                    }}
                />
                <Button
                    type='submit'
                    text='Onayla'
                />
            </FormContainer>
            </Box>
            <SummaryWrapper>
                <SubTitle>Sipariş Özeti</SubTitle>
                <Information>{`Toplam ${cart.length} ürün`}</Information>
                <Information>{`Toplam ${totalPrice} TL`}</Information>
            </SummaryWrapper>
        </RowWrapper>
    )
}

export default PaymentScreen
