import React, { useState } from 'react';
import Button from '../../Button/Button';
import {FormContainer,ErrorMessage} from '../../FormElements/WrappedFormElements';
import Input from '../../Input/Input';
import { ContentsWrapper, ProfilePic } from '../Profile.styles';
import account from '../../../images/account.png';
import { updateUser } from '../../../services/api';

const ProfileUpdate = ({currentUser}) => {

    const [user,setUser] = useState({});
    const [error,setError] = useState();
    const [selectedImageLink, setSelectedImageLink] = useState(!!(currentUser?.avatar) ? "data:image/png;base64," + currentUser?.avatar : account);

    const handleSubmit = (e) => {
        e.preventDefault();
        if((!!user.password&&!!user.oldPassword)||(!user.password&&!user.oldPassword)){
            sendData();
        } else {
            setError('Eski şifrenizi girdikten sonra yeni şifrenizi giriniz.')
        }
    }

    const sendData = async () => {
        try{
            // eslint-disable-next-line no-unused-vars
            const {data} = await updateUser(currentUser.username,user);
            window.location.reload();
        } catch(err){
            if(['400'].includes(err)!==-1){
                setError('Eski şifre yanlış.')
            }
        }
    }

    const handleImageChange = async (event) => {
        event.preventDefault();
        event.target.files[0]&&setSelectedImageLink(URL.createObjectURL(event.target.files[0]))
        if(event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsBinaryString(event.target.files[0])
            reader.onload = (readerEvt) => handleReaderLoaded(readerEvt)
        }
    }

    const handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        setUser({
            ...user,
            avatar:btoa(binaryString)
        })
    }

    return (
        <ContentsWrapper>
            <FormContainer onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
                <ProfilePic src={selectedImageLink}></ProfilePic>
                <Input
                    type="file"
                    name="post[image]"
                    accept="image/*"
                    onChange = {(event) => {
                        handleImageChange(event)
                    }}
                />
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
                name="description"
                placeholder="Açıklama"
                autoComplete="off"
                value={user.description}
                onChange={(event) => {
                    setUser({
                        ...user,
                        description:event.target.value
                    })
                }}
                />
                 <Input
                style={{height:"30px",width:"100%"}}
                type="password"
                name="oldPassword"
                placeholder="Eski Şifre"
                value={user.oldPassword}
                onChange={(event) => {
                    setUser({
                        ...user,
                        oldPassword:event.target.value
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
                <Button type="submit" text="Güncelle" />
            </FormContainer>
        </ContentsWrapper>
    )
}

export default ProfileUpdate
