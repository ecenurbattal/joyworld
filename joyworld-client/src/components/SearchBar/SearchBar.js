import React from 'react';
import Input from '../Input/Input';
import {Wrapper} from './SearchBar.styles';
import Button from '../Button/Button';

const SearchBar = ({placeHolder,value,onInputChange,onButtonClick,onKeyPress}) => {
    return(
        <Wrapper>
            <Input
                type="text"
                name="search"
                placeholder={placeHolder}
                autoComplete="off"
                required={true}
                style={{height:"3rem",width:"13rem",border:'3px solid rgb(0, 200, 200)'}}
                value={value}
                onChange={onInputChange}
                onKeyPress={onKeyPress}
            />
            <Button
                marginLeft="2%"
                text="Ara"
                onClick={onButtonClick}
                width="4rem"
                height="2.5rem"
                fontSize="17px"
                fontWeight="500"
            />
        </Wrapper>
        
    )
}

export default SearchBar;
