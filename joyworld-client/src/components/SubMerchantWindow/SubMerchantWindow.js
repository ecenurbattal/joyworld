import React, { useRef, useState } from 'react'
import { Wrapper, SubMerchantContent } from './SubMerchantWindow.styles'
import Button from '../Button/Button';
import { Message, StyledTextArea } from '../FormElements/WrappedFormElements';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import { getCurrentUser } from '../../services/Auth/authService';
import Input from '../Input/Input';

const SubMerchantWindow = ({onSubMerchantSubmit}) => {

    const [isContentOpen,setContentOpen] = useState(false);
    const subMerchantContentRef = useRef(null);
    const [request,setRequest] = useState({
        _id:getCurrentUser().user._id
    });


    useOutsideAlerter(subMerchantContentRef, () => {
        if (isContentOpen){
            setContentOpen(false)
        }
    });

    return (
        <Wrapper>
            <Button
                text='Iyzico Hesabı oluştur'
                alignSelf='center'
                onClick={() => setContentOpen((prevState) => !prevState)}
            />
            <SubMerchantContent isOpen={isContentOpen} ref={subMerchantContentRef}>
            <Input
                    style={{height:"30px",width:"65%"}}
                    type="text"
                    name="identity"
                    placeholder="Tc Kimlik No.."
                    required={true}
                    onChange={(event) => {
                        setRequest({
                            ...request,
                            identityNumber:event.target.value
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
                       setRequest({
                           ...request,
                           name:event.target.value
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
                        setRequest({
                            ...request,
                            surname:event.target.value
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
                        setRequest({
                            ...request,
                            gsmNumber:event.target.value
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
                        setRequest({
                            ...request,
                            email:event.target.value
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
                        setRequest({
                            ...request,
                            address:event.target.value
                        })
                     }}
                />
                 <Input
                    style={{height:"30px",width:"65%"}}
                    type="text"
                    name="companyName"
                    placeholder="Şirket Adı.. (Zorunlu Değil)"
                    onChange={(event) => {
                        setRequest({
                            ...request,
                            companyName:event.target.value
                        })
                     }}
                />
                 <Input
                    style={{height:"30px",width:"65%"}}
                    type="text"
                    name="iban"
                    placeholder="Iban No"
                    required={true}
                    onChange={(event) => {
                        setRequest({
                            ...request,
                            iban:event.target.value
                        })
                     }}
                />
                <Button
                    type='button'
                    text='Onayla'
                    onClick={() => onSubMerchantSubmit(request)}
                />
            </SubMerchantContent>
            <Message>Adınıza bir Iyzico hesabı oluşturabilir ve ödemelerinizi güvenli olarak alabilirsiniz.</Message>
        </Wrapper>
    )
}

export default SubMerchantWindow
