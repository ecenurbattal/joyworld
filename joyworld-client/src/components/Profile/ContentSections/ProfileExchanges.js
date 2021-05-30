import React, { useState } from 'react'
import { getCurrentItems } from '../../../utils/paginationUtils';
import { RowWrapper } from '../../FormElements/WrappedFormElements';
import Pagination from '../../Pagination/Pagination';
import { OutsideWrapper } from '../../Pagination/Pagination.styles';
import { ContentsWrapper, ListItem, ListItemNote, ListItemText, ListItemTitle, Section, SectionWrapper, StyledCross, StyledTick, StyledTrash, VerticalLine } from '../Profile.styles'

const ProfileExchanges = ({exchanges,onChangeStatusOP,onDeleteBP}) => {

    const [offeredProductsPerPage] = useState(5);
    const [bidProductsPerPage] = useState(5);

    const [currentOPPage,setCurrentOPPage] = useState(1);
    const [currentBPPage,setCurrentBPPage] = useState(1);

    const currentOPs = getCurrentItems(exchanges?.offeredExchanges,currentOPPage,offeredProductsPerPage);
    const currentBPs = getCurrentItems(exchanges?.bidExchanges,currentBPPage,bidProductsPerPage);

    const statusColor = (status) => {
        switch(status) {
            case 'Bekliyor':
                return "yellow"
            case 'Kabul Edildi':
                return "#55efc4"
            case 'Reddedildi':
                return '#e55039'
            default:
                return "white"
        }
    }
    
    return (
        <ContentsWrapper>
            <SectionWrapper>
                <Section>
                    <ListItemTitle>Size Teklif Edilen Takaslar</ListItemTitle>
                    {currentOPs.map((op) => (
                        <ListItem key={op._id}>
                            <ListItemText href={`/products/${op.offeredProduct._id}`}>
                                <strong>Teklif Edilen Ürün: </strong>{op.offeredProduct.title}
                            </ListItemText>
                            <ListItemText href={`/products/${op.targetProduct._id}`}>
                                <strong>İstenilen Ürün: </strong>{op.targetProduct.title}
                            </ListItemText>
                            <ListItemNote>
                                <strong>Not: </strong>{op.note}
                            </ListItemNote>
                            <ListItemText color={statusColor(op.status)}>
                                <strong>Durum: </strong>{op.status}
                            </ListItemText>
                            <RowWrapper>
                                <StyledTick
                                    onClick={() => {if (window.confirm('Bu isteği onaylamak istediğinize emin misiniz?')) onChangeStatusOP(op._id,true)}}
                                />
                                <StyledCross
                                    onClick={() => {if (window.confirm('Bu isteği reddetmek istediğinize emin misiniz?')) onChangeStatusOP(op._id,false)}}
                                />
                            </RowWrapper>
                        </ListItem>
                    ))}
                    <OutsideWrapper>
                        <Pagination
                            itemsPerPage={offeredProductsPerPage}
                            totalItems={exchanges.offeredExchanges.length}
                            paginate={(number) => setCurrentOPPage(number)}
                        />
                    </OutsideWrapper>
                </Section>
                <VerticalLine/>
                <Section>
                <ListItemTitle>Sizin Teklif Ettiğiniz Takaslar</ListItemTitle>
                    {currentBPs.map((bp) => (
                        <ListItem key={bp._id}>
                            <ListItemText href={`/products/${bp.offeredProduct._id}`}>
                                <strong>Teklif Edilen Ürün: </strong>{bp.offeredProduct.title}
                            </ListItemText>
                            <ListItemText href={`/products/${bp.targetProduct._id}`}>
                                <strong>İstenilen Ürün: </strong>{bp.targetProduct.title}
                            </ListItemText>
                            <ListItemNote>
                                <strong>Not: </strong>{bp.note}
                            </ListItemNote>
                            <ListItemText color={statusColor(bp.status)}>
                                <strong>Durum: </strong>{bp.status}
                            </ListItemText>
                            <StyledTrash
                                onClick={() => {if (window.confirm('Bu isteği silmek istediğinize emin misiniz?')) onDeleteBP(bp._id)}}
                            />
                        </ListItem>
                    ))}
                    <OutsideWrapper>
                        <Pagination
                            itemsPerPage={bidProductsPerPage}
                            totalItems={exchanges.bidExchanges.length}
                            paginate={(number) => setCurrentBPPage(number)}
                        />
                    </OutsideWrapper>
                </Section>
            </SectionWrapper>
        </ContentsWrapper>
    )
}

export default ProfileExchanges
