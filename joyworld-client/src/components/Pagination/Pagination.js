import React from 'react'
import { PageNumberWrapper, Wrapper } from './Pagination.styles';

const Pagination = ({itemsPerPage, totalItems,paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i<= Math.ceil(totalItems / itemsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <Wrapper>
            {pageNumbers.map(number => (
                <PageNumberWrapper
                onClick={() => paginate(number)}>
                    {number}
                </PageNumberWrapper>
            ))}
        </Wrapper>
    )
}

export default Pagination
