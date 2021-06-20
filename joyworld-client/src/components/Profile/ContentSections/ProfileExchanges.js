import React, { useState } from 'react'
import { getCurrentItems } from '../../../utils/paginationUtils';
import { RowWrapper } from '../../FormElements/WrappedFormElements';
import Pagination from '../../Pagination/Pagination';
import { OutsideWrapper } from '../../Pagination/Pagination.styles';
import { ContentsWrapper, ListItem, ListItemNote, ListItemText, ListItemTitle, Section, SectionWrapper, StyledCross, StyledTick, StyledTrash, VerticalLine } from '../Profile.styles';
import { exchangeEnum } from '../../../config/Constants';
import RatingWindow from '../../RatingWindow/RatingWindow';

const ProfileExchanges = ({exchanges,onChangeStatusOP,onDeleteBP,onAcceptRating}) => {

    const [offeredProductsPerPage] = useState(5);
    const [bidProductsPerPage] = useState(5);

    const [currentOPPage,setCurrentOPPage] = useState(1);
    const [currentBPPage,setCurrentBPPage] = useState(1);

    const currentOPs = getCurrentItems(exchanges?.offeredExchanges,currentOPPage,offeredProductsPerPage);
    const currentBPs = getCurrentItems(exchanges?.bidExchanges,currentBPPage,bidProductsPerPage);

    const statusColor = (status) => {
        switch(status) {
            case exchangeEnum.WAITING:
                return "yellow"
            case exchangeEnum.ACCEPTED:
                return "#55efc4"
            case exchangeEnum.DENIED:
                return '#e55039'
            case exchangeEnum.COMPLETED:
                return "#55efc4"
            case exchangeEnum.FAILED:
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
                            {(op.status===exchangeEnum.WAITING || op.status===exchangeEnum.ACCEPTED) &&
                                <RowWrapper>
                                <StyledTick
                                    onClick={() => {
                                        if(op.status===exchangeEnum.WAITING){
                                            if (window.confirm('Bu isteği onaylamak istediğinize emin misiniz?')) onChangeStatusOP(op._id,true,exchangeEnum.WAITING)
                                        } else if(op.status===exchangeEnum.ACCEPTED){
                                            if (window.confirm('Bu işlemin tamamlandığını onaylamak istediğinize emin misiniz?')) onChangeStatusOP(op._id,true,exchangeEnum.ACCEPTED)
                                        }
                                    }}
                                />
                                <StyledCross
                                    onClick={() => {
                                        if(op.status===exchangeEnum.WAITING){
                                            if (window.confirm('Bu reddetmek istediğinize emin misiniz?')) onChangeStatusOP(op._id,false,exchangeEnum.WAITING)
                                        } else if(op.status===exchangeEnum.ACCEPTED){
                                            if (window.confirm('Bu işlemin başarısız olduğunu onaylamak istediğinize emin misiniz?')) onChangeStatusOP(op._id,false,exchangeEnum.ACCEPTED)
                                        }
                                    }}
                                />
                            </RowWrapper>
                            }
                            {((op.status===exchangeEnum.COMPLETED || op.status===exchangeEnum.FAILED) && !(op.isRated?.owner)) && 
                                <RatingWindow
                                    onAcceptRating={onAcceptRating}
                                    ratedUsername={op.bidder.username}
                                    exchangeId={op._id}
                                    isBidder={false}
                                />
                            }
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
                           {bp.status===exchangeEnum.WAITING && 
                             <StyledTrash
                                onClick={() => {if (window.confirm('Bu isteği silmek istediğinize emin misiniz?')) onDeleteBP(bp._id)}}
                            />
                           }
                           {((bp.status===exchangeEnum.COMPLETED || bp.status===exchangeEnum.FAILED) && !(bp.isRated?.bidder)) && 
                                <RatingWindow
                                    onAcceptRating={onAcceptRating}
                                    ratedUsername={bp.owner.username}
                                    exchangeId={bp._id}
                                    isBidder={true}
                                />
                            }
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
