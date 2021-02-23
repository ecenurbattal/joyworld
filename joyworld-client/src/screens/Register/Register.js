import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from '../../components/Button/Button';
import InternalError from '../../components/Error/InternalError';
import {
    Box,
    Title,
    ErrorMessage,
    FormContainer,
    RouteText,
} from '../../components/FormElements/WrappedFormElements';
import Input from '../../components/Input/Input';
import {register} from '../../services/Auth/authService';

const Register = () => {

    const [user,setUser] = useState({});
    const history = useHistory();

    const [regError, setRegError] = useState('');
    const [error, setError] = useState('');

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

    const goToHomePage = () => {
        history.push('/');
        window.location.reload();
    }

    const handleSubmit =  async (event) => {
        event.preventDefault();
        setRegError('');
            try{
                //post request
                const {data:{data}} = await register(user);
                if (data.token) {
                    localStorage.setItem('user-data',data);
                }
                setStatus(true);
            } catch (err){
                if(err.status==='fail') setRegError(err.message)
                else setError(err.status)
            }
        }
    
    if (status) {
        return (
            <div>
                <p style={{color:"white",fontWeight:"800",fontSize:"45px",textAlign:"center"}}>
                    Başarıyla kayıt oldunuz. Ana sayfaya yönlendiriliyorsunuz <br/>
                    <p>{countdown} SANİYE</p>
                    {!countdown&&goToHomePage()}
                </p>
            </div>
        )
    }

    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
    }


    return (
        <Box>
            <Title>Kayıt Ol</Title>
            <FormContainer onSubmit={handleSubmit}>
                {regError && <ErrorMessage>{regError}</ErrorMessage>}
                <Input
                style={{height:"30px",width:"100%"}}
                type="text"
                name="name"
                placeholder="Ad Soyad"
                autoComplete="off"
                value={user.name}
                onChange={(event) => {
                    setUser({
                        ...user,
                        name:event.target.value
                    })
                }}
                />
                <Input
                style={{height:"30px",width:"100%"}}
                type="email"
                name="email"
                placeholder="E-Posta"
                value={user.email}
                onChange={(event) => {
                    setUser({
                        ...user,
                        email:event.target.value
                    })
                }}
                />
                <Input
                style={{height:"30px",width:"100%"}}
                type="text"
                name="username"
                placeholder="Kullanıcı Adı"
                autoComplete="off"
                value={user.username}
                onChange={(event) => {
                    setUser({
                        ...user,
                        username:event.target.value
                    })
                }}
                />
                <Input
                style={{height:"30px",width:"100%"}}
                type="password"
                name="password"
                placeholder="Şifre"
                value={user.password}
                onChange={(event) => {
                    setUser({
                        ...user,
                        password:event.target.value
                    })
                }}
                />
                <Button type="submit" text="Kayıt Ol" />
                    <RouteText>Hesabın var mı?
                        <Link to='/login'> Giriş Yap</Link>
                    </RouteText>
            </FormContainer>

            
        </Box>
    )
}

export default Register
