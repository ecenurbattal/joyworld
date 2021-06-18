import React, { useState } from 'react'
import Button from '../../components/Button/Button';
import InternalError from '../../components/Error/InternalError';
import { Box, ErrorMessage, FormContainer, Message, Title } from '../../components/FormElements/WrappedFormElements'
import Input from '../../components/Input/Input';
import { forgotPassword } from '../../services/Auth/authService';

const ForgotPasswordScreen = () => {

    const [infoMessage,setInfoMessage] = useState();
    const [email,setEmail] = useState();
    const [inputErr,setInputErr] = useState();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await forgotPassword(email);
            setInfoMessage('Tarafınıza bir e-posta iletildi. Lütfen gelen kutunuzu kontrol ediniz. Spam kutusunu da kontrol etmeyi unutmayınız.')
        } catch(err){
            if(err.response.status===404){
                setInputErr('Sistemde girdiğiniz e-posta ile kayıtlı kullanıcı bulunmamaktadır.')
            } else {
                setError(500)
            }
        }
    }

    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
    }

    
    return (
        <Box>
            <Title>Sıfırlama E Postası</Title>
            <FormContainer onSubmit={handleSubmit}>
                {infoMessage&&<Message>{infoMessage}</Message>}
                {inputErr&&<ErrorMessage>{inputErr}</ErrorMessage>}
                <Input
                    style={{height:"30px",width:"65%"}}
                    type="email"
                    name="email"
                    placeholder="Sistemde kayıtlı e-postanızı giriniz..."
                    required={true}
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                />
                <Button
                    type="submit"
                    text="Onayla"
                    minWidth='45%'
                />
            </FormContainer>
        </Box>
    )
}

export default ForgotPasswordScreen
