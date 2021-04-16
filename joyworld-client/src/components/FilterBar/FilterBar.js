import React from 'react'
import { Wrapper,StyledFaFilter, StyledSelect } from './FilterBar.styles';


const FilterBar = ({iconColor,optionList,onChange,selectedValue,...restProps}) => {
    return (
        <Wrapper>
            <StyledFaFilter color={iconColor}/>
            <StyledSelect 
            onChange={onChange} 
            value={selectedValue}
            {...restProps}
            >
                {optionList?.map((option) => (
                    <option value={option}>{option}</option>
                ))}
            </StyledSelect>
        </Wrapper>
    )
}

export default FilterBar
