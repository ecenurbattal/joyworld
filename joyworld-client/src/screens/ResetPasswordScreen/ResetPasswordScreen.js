import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import Button from '../../components/Button/Button';
import InternalError from '../../components/Error/InternalError';
import { Box, ErrorMessage, FormContainer, Message, Title } from '../../components/FormElements/WrappedFormElements';
import Input from '../../components/Input/Input';
import { resetPassword } from '../../services/Auth/authService';

const ResetPasswordScreen = () => {

    const [password,setPassword] = useState();
    const [passwordAgain,setPasswordAgain] = useState();

    const history = useHistory();

    const {resetToken} = useParams();

    const [inputErr,setInputErr] = useState();
    const [error,setError] = useState(false);

    const [infoMessage,setInfoMessage] = useState();

    const [status,setStatus] = useState(false)
    const [countdown,setCountdown] = useState(3);

    useEffect(() => {
        if(status){
            const timer = setTimeout(() => {
                setCountdown(countdown-1)
            },1000)
            return () => clearTimeout(timer)
        }
    },[status,countdown])


    const handleSubmit = (event) => {
        event.preventDefault();
        if(password!==passwordAgain){
            setInputErr('Şifreler birbirleriyle eşleşmemektedir.')
        } else {
            sendData();
        }
    }

    const sendData = async () => {
        try {
            const {data} = await resetPassword(password,resetToken);
            setStatus(true)
            setInfoMessage('Şifreniz başarıyla sıfırlandı. Giriş sayfasına yönlendiriliyorsunuz.')
            setInputErr(null);
        } catch(err){
            if(err.response.status===500){
                setError(500)
            }
            if(err.response.status===409){
                setInputErr('Şifreniz minimum 8 karakterden oluşmalıdır.')
            } else {
                setInputErr('İsteğinizin süresi geçmiştir. Lütfen tekrar sıfırlama e-postası isteğinde bulunun.')
            }
        }
    }

    if (status&&!countdown) {
        history.push('/login');
        window.location.reload();
    }

    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
    }

    return (
        <Box>
            <Title>Şifre Sıfırlama</Title>
            <FormContainer onSubmit={handleSubmit}>
                {inputErr&&<ErrorMessage>{inputErr}</ErrorMessage>}
                {infoMessage&& <Message>{`${infoMessage} ${countdown} saniye...`}</Message>}
                <Input
                style={{height:"30px",width:"100%"}}
                type="password"
                name="password"
                placeholder="Yeni Şifrenizi Giriniz.."
                value={password}
                onChange={(event) => {
                   setPassword(event.target.value)
                }}
                />
                <Input
                style={{height:"30px",width:"100%"}}
                type="password"
                name="passwordAgain"
                placeholder="Şifrenizi tekrar giriniz..."
                value={passwordAgain}
                onChange={(event) => {
                    setPasswordAgain(event.target.value)
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

export default ResetPasswordScreen
