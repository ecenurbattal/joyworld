import React from 'react'
import { getCurrentUser } from '../../services/Auth/authService'
import Button from '../Button/Button'
import ExchangeWindow from '../ExchangeWindow/ExchangeWindow'
import { RowWrapper, ErrorMessage } from '../FormElements/WrappedFormElements'
import ImageSlider from '../ImageSlider/ImageSlider'
import { InformationsWrapper, StyledTime, Wrapper, UserInformationWrapper, StyledCircle, Tag } from './ProductDetail.styles';

const ProductDetail = ({product,currentSlide,onSlideChange,onAddCart,onExchangeSubmit}) => {

    const isCurrentUser = getCurrentUser().user._id === product.createdBy._id

    return (
        <Wrapper>
            <ImageSlider
                slides={product.images}
                onSlideChange={onSlideChange}
                current={currentSlide}
            />
            <InformationsWrapper>
                <h2>{product.title}</h2>
                <RowWrapper>
                    <StyledTime/>
                    <p>{new Date(product.createdAt).toLocaleString('tr')}</p>
                </RowWrapper>
                <h3>{`${product.price} TL`}</h3>
                {product.count>0 ? <h5>{`${product.count} adet mevcut.`}</h5> : <ErrorMessage>Bu ürün tükendi.</ErrorMessage>}
                <h6>{`${product.description}`}</h6>
                {!isCurrentUser && product.count > 0 && 
                    <RowWrapper>
                    <Button
                        text='Sepete Ekle'
                        onClick={() => onAddCart(product)}
                    />
                     <ExchangeWindow
                        targetProduct = {product}
                        onExchangeSubmit={onExchangeSubmit}
                    />
                    </RowWrapper>
                }
                <Tag>{`# ${product.category}`}</Tag>
                <UserInformationWrapper>
                    <StyledCircle/>
                    <a href={`/profile/${product.createdBy.username}`}>{product.createdBy.username}</a>
                </UserInformationWrapper>
            </InformationsWrapper>
        </Wrapper>
    )
}

export default ProductDetail
