import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../components/Button/Button';
import InternalError from '../../components/Error/InternalError';
import { Box, FormContainer } from '../../components/FormElements/WrappedFormElements';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';
import { createNewProduct, getCurrentUser } from '../../services/api';
import uploadImage from '../../services/uploadImageApi';

const AddProductScreen = () => {
    const history = useHistory();
    const user = {username:'ecenb'}
    const [selectedImage, setSelectedImage] = useState();
    const [selectedImageLink, setSelectedImageLink] = useState("http://placehold.it/200");
    

    const [product, setProduct] = useState({
        createdBy:user.username
    });

    const [currentUserProducts,setCurrentUserProducts] = useState([]);
    const [isLoading,setLoading] = useState(false);
    const [error,setError] = useState('');

    useEffect(() => {
        const init = async () => {
            try{
                const {data} = await getCurrentUser(user.username)
                setCurrentUserProducts(data[0].products)
            } catch(err){
                setError(err)
            }
        }
        init();
    },[user.username,setCurrentUserProducts])
    
    const handleImageChange = async (event) => {
        setSelectedImage(event.target.files[0])
        setSelectedImageLink(URL.createObjectURL(event.target.files[0]))
    }
    
    const submitAllData = async (currentProduct,currentUserProducts,user) => {
        try{
            // eslint-disable-next-line no-unused-vars
            const {postData} = await createNewProduct(currentProduct,currentUserProducts,user.id);
            history.push('/products')
            
        } catch (err) {
            setError(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try{
            const fd = new FormData();
            fd.append('image',selectedImage,selectedImage.name)
            await uploadImage.post('/upload',fd)
            .then (res => {
                if(res.data.success){
                    submitAllData({
                        ...product,
                        image:res.data.data.image.url
                    },currentUserProducts,user)
                }
            })
        } catch(err){
            setError(500)
        }
        setLoading(false);
    }

    if (isLoading) {
        return <Loader />;
    }
    
    if (error) {
        if(error===500) return <InternalError/>
        else return <h1>{error}</h1>
    }
    

    return (
        <Box>
            <FormContainer onSubmit={handleSubmit}>
                <img style={{width:"200px",height:"200px"}} id="uploadedImage" src={selectedImageLink} alt="yüklenen resim"/>
                Resim Ekle <Input
                    type="file"
                    name="post[image]"
                    accept="image/*"
                    onChange = {(event) => {
                        handleImageChange(event)
                    }}
                />
                <Input
                    type="text"
                    name="post[name]"
                    placeholder="Ürün Adı"
                    value={product.name}
                    onChange={(event) => {
                        setProduct({
                            ...product,
                            name:event.target.value
                        })
                    }}
                />
                <Input
                    type="number"
                    name="post[price]"
                    placeholder="Fiyat"
                    value={product.price}
                    onChange={(event) => {
                        setProduct({
                            ...product,
                            price:event.target.value
                        })
                    }}
                />
                <Button text="Oluştur" type="submit"/>
            </FormContainer>
        </Box>
    )
}

export default AddProductScreen
