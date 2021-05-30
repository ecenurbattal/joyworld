import React, { useRef, useState } from 'react';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import Button from '../Button/Button';
import { ExchangeContent, Wrapper } from './ExchangeWindow.styles';
import {getCurrentUser} from '../../services/Auth/authService';
import { StyledTextArea } from '../FormElements/WrappedFormElements';

const ExchangeWindow = ({targetProduct,onExchangeSubmit}) => {

    const [isContentOpen,setContentOpen] = useState(false);
    const exchangeContentRef = useRef(null);

    const [exchangeInfo,setExchangeInfo] = useState({
        owner:targetProduct.createdBy._id,
        targetProduct:targetProduct._id,
        offeredProduct:getCurrentUser().user.products[0]._id,
        bidder:getCurrentUser().user._id,
        status:'Bekliyor',
    });


    useOutsideAlerter(exchangeContentRef, () => {
        if (isContentOpen){
            setContentOpen(false)
        }
    });

    return (
        <Wrapper>
            <Button
                width={'95px'}
                alignSelf='center'
                text='Takas Teklifi'
                onClick={() => setContentOpen((prevState) => !prevState)}
            />
            <ExchangeContent isOpen={isContentOpen} ref={exchangeContentRef}>
                <p>Hangi ürününüz ile takas teklifi yapmak istiyorsunuz? <a href={'/products/new'}>(Yeni ürün ekle)</a></p>
                <select 
                onChange={(event) => 
                    setExchangeInfo({
                        ...exchangeInfo,
                        offeredProduct:event.target.value
                    })
                } 
                value={exchangeInfo.offeredProduct}
                >
                    {getCurrentUser().user.products?.map((option,index) => (
                        <option key={`filterBarOption${index}`} value={option._id}>{option.title}</option>
                    ))}
                </select>
                <StyledTextArea
                    placeholder='Takas notu...'
                    name='note'
                    minHeight='125px'
                    onChange={(event) => {
                        setExchangeInfo({
                            ...exchangeInfo,
                            note:event.target.value
                        })
                    }}
                />
                <Button
                    text='Oluştur'
                    margin='10px'
                    onClick={() => onExchangeSubmit(exchangeInfo)}
                />
            </ExchangeContent>
        </Wrapper>
    )
}

export default ExchangeWindow
