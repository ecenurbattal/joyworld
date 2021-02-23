import React, { useState } from 'react';
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
import { login } from '../../services/Auth/authService';

const Login = () => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [logError, setLogError] = useState('');
  const [error,setError] = useState('');
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLogError('');
    try {
      const {data:{data}} = await login({username,password})
      if (data.token) {
        localStorage.setItem('user-data',JSON.stringify(data));
        history.push('/');
        window.location.reload();
      }
    } catch(err){
        if(err.status==='fail') setLogError(err.message)
        else setError(err.status)
    }
    
  };

  if (error) {
    if(error===500) return <InternalError/>
    else return <h1>{error}</h1>
  }

  return (
    <Box>
      <Title>Giriş Yap</Title>
      <FormContainer onSubmit={handleSubmit}>
        {logError && <ErrorMessage>{logError}</ErrorMessage>}
        <Input
          style={{height:"30px",width:"100%"}}
          type="text"
          name="username"
          placeholder="Kullanıcı Adı"
          autoComplete="off"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <Input
          style={{height:"30px",width:"100%"}}
          type="password"
          name="password"
          placeholder="Şifre"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button type="submit" text="Giriş Yap" />
          <RouteText>Hesabın yok mu?
          <Link to='/register'> Kayıt Ol</Link>
          </RouteText>
      </FormContainer>
    </Box>
  );
};

export default Login;
