/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Button from '../../components/Button/Button';
import InternalError from '../../components/Error/InternalError';
import FilterBar from '../../components/FilterBar/FilterBar';
import {
  Box,
  Title,
  ErrorMessage,
  FormContainer,
  StyledTextArea,
  SubTitle,
} from '../../components/FormElements/WrappedFormElements';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';
import { createPost } from '../../services/api';
import { getCurrentUser } from '../../services/Auth/authService';

const AddPostScreen = () => {

    const [post,setPost] = useState({createdBy:getCurrentUser().user._id,tag:'Genel'});
    const [postError,setPostError] = useState();
    const [error,setError] = useState();
    const [isLoading,setLoading] = useState(false);

    const history = useHistory();

    const tagsList = ['Genel','Çizgi Roman','Kitap']


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(post)
        setLoading(true);
        try{
            const {data} = await createPost(post);
            history.push('/forum')
        } catch(err){
            if(['400','404'].includes(err)!==-1) setPostError('Girilen bilgiler uyumsuz.') 
            else setError(err.status)
        }
        setLoading(false);
    }

    if (isLoading) {
        return <Loader/>
    }
    
    if (error) {
        if(['500'].includes(error)!==-1) return <InternalError/>
        else return <h1>{error}</h1>
    }

    return (
        <Box>
            <Title>Gönderi Ekle</Title>
            <FormContainer onSubmit={handleSubmit}>
                {postError && <ErrorMessage>{postError}</ErrorMessage>}
                <SubTitle>Başlık</SubTitle>
                <Input
                style={{
                    height:"30px",
                    minWidth:"100%",
                    border:'2px solid #861657',
                    borderRadius:'10px'
                }}
                type="text"
                name="title"
                placeholder="Başlığı Giriniz..."
                autoComplete="off"
                value={post?.title}
                onChange={(event) => {
                    setPost({
                        ...post,
                        title:event.target.value
                    });
                }}
                />
                <SubTitle align={'flex-end'}>Etiket</SubTitle>
                <FilterBar
                    optionList={tagsList}
                    onChange={(event) => setPost({
                        ...post,
                        tag:event.target.value
                    })}
                    selectedValue={post?.tag}
                    background={'#B33771'}
                    color={'white'}
                />
                <SubTitle>İçerik</SubTitle>
                <StyledTextArea
                    name='content'
                    placeholder='İçeriği Giriniz...'
                    value={post.content}
                    onChange={(event) => {
                        setPost({
                            ...post,
                            content:event.target.value
                        })
                    }}
                />
                <Button type="submit" text="Oluştur" />
            </FormContainer>
        </Box>
    )
}

export default AddPostScreen
