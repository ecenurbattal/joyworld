import React, { useState } from 'react'
import { getTotalPrice } from '../../../utils/cartUtils';
import { getCurrentItems } from '../../../utils/paginationUtils';
import { RowWrapper } from '../../FormElements/WrappedFormElements';
import Pagination from '../../Pagination/Pagination';
import { OutsideWrapper } from '../../Pagination/Pagination.styles';
import RatingWindow from '../../RatingWindow/RatingWindow';
import { ContentsWrapper, ListItem, ListItemNote, ListItemText, ListItemTitle, Section, SectionWrapper, StyledCross, StyledTick, VerticalLine } from '../Profile.styles';
import {orderEnum} from '../../../config/Constants';

const ProfileOrders = ({orders,onChangeStatusRP,onAcceptRating}) => {

    const [receivedProductsPerPage] = useState(5);
    const [soldProductsPerPage] = useState(5);

    const [currentRPPage,setCurrentRPPage] = useState(1);
    const [currentSPPage,setCurrentSPPage] = useState(1);

    const currentRPs = getCurrentItems(orders?.received,currentRPPage,receivedProductsPerPage);
    const currentSPs = getCurrentItems(orders?.sold,currentSPPage,soldProductsPerPage);


    const statusColor = (status) => {
        switch (status) {
            case orderEnum.STILL_PROGRESS:
                return "yellow"
            case orderEnum.COMPLETED:
                return "#55efc4"
            case orderEnum.FAILED:
                return "#e55039"
            default:
                return "white"
        }
    }

  
    return (
        <ContentsWrapper>
            <SectionWrapper>
                <Section>
                    <ListItemTitle>Satılan Ürünler</ListItemTitle>
                    {currentSPs.map((sp) => (
                        <ListItem key={sp._id}>
                            <strong>Sepet</strong>
                            {sp.cart.map((item) => (
                                <div>
                                    <ListItemText href={`/products/${item.product._id}`}>
                                        {item.product.title}
                                    </ListItemText>
                                    <ListItemNote>
                                        <strong>Adet: </strong>{item.qty}
                                    </ListItemNote>
                                    <ListItemNote>
                                    <strong>Fiyat: </strong>{`${item.product.price}TL`}
                                    </ListItemNote>
                                    <hr color='white'/>
                                </div>
                            ))}
                            <ListItemText><strong>Alıcı: </strong>{sp.buyer.username}</ListItemText>
                            <ListItemText><strong>Toplam Fiyat: </strong>{`${getTotalPrice(sp.cart)}TL`}</ListItemText>
                            <ListItemText color={statusColor(sp.status)}><strong>Durum: </strong>{sp.status}</ListItemText>
                        </ListItem>
                    ))}
                    <OutsideWrapper>
                        <Pagination
                            itemsPerPage={soldProductsPerPage}
                            totalItems={orders.sold.length}
                            paginate={(number) => setCurrentSPPage(number)}
                        />
                    </OutsideWrapper>
                </Section>
                <VerticalLine/>
                <Section>
                <ListItemTitle>Satın Aldığınız Ürünler</ListItemTitle>
                    {currentRPs.map((rp) => (
                        <ListItem key={rp._id}>
                            <strong>Sepet</strong>
                            {rp.cart.map((item) => (
                                <div>
                                    <ListItemText href={`/products/${item.product._id}`}>
                                        {item.product.title}
                                    </ListItemText>
                                    <ListItemNote>
                                        <strong>Adet: </strong>{item.qty}
                                    </ListItemNote>
                                    <ListItemNote>
                                        <strong>Fiyat: </strong>{`${item.product.price}TL`}
                                    </ListItemNote>
                                    <hr color='white'/>
                                </div>
                            ))}
                            <ListItemText href={`/profile/${rp.owner.username}`}><strong>Satıcı: </strong>{rp.owner.username}</ListItemText>
                            <ListItemNote><strong>Toplam Fiyat: </strong>{`${getTotalPrice(rp.cart)}TL`}</ListItemNote>
                            <ListItemText color={statusColor(rp.status)}><strong>Durum: </strong>{rp.status}</ListItemText>
                            {rp.status === orderEnum.STILL_PROGRESS ?
                                <RowWrapper>
                                    <StyledTick
                                        onClick={() => {if (window.confirm('Bu siparişi tamamlandığını onaylamak istediğinize emin misiniz?')) onChangeStatusRP(rp._id,true)}}
                                    />
                                    <StyledCross
                                        onClick={() => {if (window.confirm('Bu siparişin tamamlanmadığını onaylamak istediğinize emin misiniz?')) onChangeStatusRP(rp._id,false)}}
                                    />
                                </RowWrapper> :
                                <RowWrapper>
                                    {!(rp.isRated) &&
                                        <RatingWindow
                                        onAcceptRating={onAcceptRating}
                                        ownerUsername={rp.owner.username}
                                        orderId={rp._id}
                                        />
                                    }
                                </RowWrapper>
                            }
                        </ListItem>
                    ))}
                    <OutsideWrapper>
                        <Pagination
                            itemsPerPage={receivedProductsPerPage}
                            totalItems={orders.received.length}
                            paginate={(number) => setCurrentRPPage(number)}
                        />
                    </OutsideWrapper>
                </Section>
            </SectionWrapper>
        </ContentsWrapper>
    )
}

export default ProfileOrders
