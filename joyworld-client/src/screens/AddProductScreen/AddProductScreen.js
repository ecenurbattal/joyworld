import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../components/Button/Button';
import InternalError from '../../components/Error/InternalError';
import FilterBar from '../../components/FilterBar/FilterBar';
import { Box, FormContainer, Message, RowWrapper, StyledTextArea, SubTitle } from '../../components/FormElements/WrappedFormElements';
import ImageBox from '../../components/ImageBox/ImageBox';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';
import { createProduct } from '../../services/api';
import { getCurrentUser } from '../../services/Auth/authService';


const AddProductScreen = () => {
    const history = useHistory();
    const [selectedImagesLinks,setSelectedImagesLinks] = useState([]);
    const [dragId, setDragId] = useState();

    const tagsList = ['Genel','Çizgi Roman','Kitap']

    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
    };



    const handleDrop = (ev) => {
        const dragBox = selectedImagesLinks.find((box) => box.id === dragId);
        const dropBox = selectedImagesLinks.find((box) => box.id === ev.currentTarget.id);

        const dragBoxOrder = dragBox.order;
        const dropBoxOrder = dropBox.order;

        const newBoxState = selectedImagesLinks.map((box) => {
        if (box.id === dragId) {
            box.order = dropBoxOrder;
        }
        if (box.id === ev.currentTarget.id) {
            box.order = dragBoxOrder;
        }
        return box;
        });
        setSelectedImagesLinks(newBoxState);
    }
    

    const [product, setProduct] = useState({
        createdBy:getCurrentUser().user._id,
        images:[],
        category:'Genel'
    });


    const [isLoading,setLoading] = useState(false);
    const [error,setError] = useState('');

    useEffect(() => {
        setProduct((prevProduct) => {
            return {...prevProduct,
                images:selectedImagesLinks.sort((a,b) => a.order-b.order).map((image) => image.link)
            }
        })
    },[selectedImagesLinks])
    
    const handleImageChange = async (event) => {
        event.preventDefault();
        const files = event.target.files
        const fileArray = [];
        if(files&&files[0]){
            for(let i=0;i<files.length;i++) {
                if(i===files.length-1) {
                    fileToBase64(files[i],(base64String) => {
                        fileArray.push({id:`Box-${i}`,link:base64String,order:i})
                    },() => setSelectedImagesLinks(fileArray))
                } 
                else {
                    fileToBase64(files[i],(base64String) => {
                        fileArray.push({id:`Box-${i}`,link:base64String,order:i})
                    })
                }
            };
        }
    }

    const fileToBase64 = (file,...callbacks) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file)
        reader.onloadend = (readerEvt) => {
            var binaryString = readerEvt.target.result;
            callbacks&&callbacks[0]&&callbacks[0](btoa(binaryString))
            callbacks&&callbacks[1]&&callbacks[1]()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try{
            const {data:{data}} = await createProduct(product);
            history.push(`/products/${data._id}`)
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
                <RowWrapper>
                     {selectedImagesLinks&& (
                    selectedImagesLinks.sort((a,b) => a.order-b.order).map((image,index) => (
                        <ImageBox
                        key={index}
                        image={"data:image/png;base64," + image.link}
                        boxNumber={image.id}
                        handleDrag={handleDrag}
                        handleDrop={handleDrop}
                        />
                    ))
                    )}
                    {selectedImagesLinks.length > 1 && 
                    <Message>Ürünler sayfasında ilk sıradaki resim gözükecektir. Sürükleyip bırakarak resimlerin sırasını düzenleyebilirsiniz.</Message>}
                </RowWrapper>
               
                <Input
                    type="file"
                    name="post[image]"
                    accept="image/*"
                    multiple={true}
                    style={{marginTop:'30px',marginBottom:'30px'}}
                    onChange = {(event) => {
                        handleImageChange(event)
                    }}
                />
                <SubTitle
                    style={{alignSelf:'center'}}
                >Ürün Başlığı</SubTitle>
                <Input
                    type="text"
                    name="post[title]"
                    placeholder="Ürün Başlığı"
                    value={product.name}
                    required={true}
                    style={{height:'40px',width:'50%'}}
                    onChange={(event) => {
                        setProduct({
                            ...product,
                            title:event.target.value
                        })
                    }}
                />
                 <SubTitle
                    style={{alignSelf:'center'}}
                >Ürün Açıklaması</SubTitle>
                <StyledTextArea
                    name='description'
                    placeholder='Açıklama giriniz...'
                    value={product.description}
                    onChange={(event) => {
                        setProduct({
                            ...product,
                            description:event.target.value
                        })
                    }}
                />
                <SubTitle
                    style={{alignSelf:'flex-end'}}
                >Kategori</SubTitle>
                <FilterBar
                    optionList={tagsList}
                    onChange={(event) => setProduct({
                        ...product,
                        category:event.target.value
                    })}
                    selectedValue={product?.tag}
                    background={'#B33771'}
                    color={'white'}
                />
                 <SubTitle
                    style={{alignSelf:'center'}}
                >Ürün Adeti</SubTitle>
                 <Input
                    type="number"
                    name="post[count]"
                    placeholder="Adet"
                    value={product.count}
                    required={true}
                    min={1}
                    style={{height:'40px'}}
                    onChange={(event) => {
                        setProduct({
                            ...product,
                            count:event.target.value
                        })
                    }}
                />
                 <SubTitle
                    style={{alignSelf:'center'}}
                >Ürün Fiyatı</SubTitle>
                <Input
                    type="number"
                    name="post[price]"
                    placeholder="Fiyat"
                    value={product.price}
                    required={true}
                    min={5}
                    style={{height:'40px'}}
                    onChange={(event) => {
                        setProduct({
                            ...product,
                            price:event.target.value
                        })
                    }}
                />
                <Button text="Oluştur" type="submit" marginTop='20px'/>
            </FormContainer>
        </Box>
    )
}

export default AddProductScreen
