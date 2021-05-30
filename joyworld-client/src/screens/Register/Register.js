import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from '../../components/Button/Button';
import InternalError from '../../components/Error/InternalError';
import {
    Box,
    Title,
    ErrorMessage,
    FormContainer,
    RouteText,
    Message,
} from '../../components/FormElements/WrappedFormElements';
import Input from '../../components/Input/Input';
import SessionContext from '../../contexts/SessionContext';
import {register} from '../../services/Auth/authService';

const Register = () => {

    const {isAuthenticated} = useContext(SessionContext);

    const [user,setUser] = useState({});
    const history = useHistory();

    const [regError, setRegError] = useState('');
    const [error, setError] = useState('');
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

    const handleSubmit =  async (event) => {
        event.preventDefault();
        setRegError('');
            try{
                //post request
                const {data:{data}} = await register(user);
                if (data.token) {
                    localStorage.setItem('user-data',JSON.stringify(data));
                }
                setStatus(true);
                setInfoMessage(`Başarıyla kayıt oldunuz. Ana sayfaya yönlendiriliyorsunuz.`)
                setRegError(null)
            } catch (err){
                if(err.response.data.status==='fail') setRegError('Kullanıcı adı veya email kullanılıyor.') 
                else setError(err.response.status)
            }
        }
    
    if (status&&!countdown) {
        history.push('/');
        window.location.reload();
    }

    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
    }

    if(isAuthenticated){
        history.push('/')
      }


    return (
        <Box>
            <Title>Kayıt Ol</Title>
            <FormContainer onSubmit={handleSubmit}>
                {infoMessage&& <Message>{`${infoMessage} ${countdown} saniye...`}</Message>}
                {regError && <ErrorMessage>{regError}</ErrorMessage>}
                <Input
                style={{height:"30px",width:"65%"}}
                type="text"
                name="name"
                placeholder="Ad Soyad"
                autoComplete="off"
                required={true}
                value={user.name}
                onChange={(event) => {
                    setUser({
                        ...user,
                        name:event.target.value
                    })
                }}
                />
                <Input
                style={{height:"30px",width:"65%"}}
                type="email"
                name="email"
                placeholder="E-Posta"
                required={true}
                value={user.email}
                onChange={(event) => {
                    setUser({
                        ...user,
                        email:event.target.value
                    })
                }}
                />
                <Input
                style={{height:"30px",width:"65%"}}
                type="text"
                name="username"
                placeholder="Kullanıcı Adı"
                autoComplete="off"
                required={true}
                value={user.username}
                onChange={(event) => {
                    setUser({
                        ...user,
                        username:event.target.value
                    })
                }}
                />
                <Input
                style={{height:"30px",width:"65%"}}
                type="password"
                name="password"
                placeholder="Şifre"
                required={true}
                value={user.password}
                onChange={(event) => {
                    setUser({
                        ...user,
                        password:event.target.value
                    })
                }}
                />
                <Button 
                type="submit" 
                text="Kayıt Ol" 
                minWidth='45%'
                />
                    <RouteText>Hesabın var mı?
                        <Link to='/login'> Giriş Yap</Link>
                    </RouteText>
            </FormContainer>

            
        </Box>
    )
}

export default Register
