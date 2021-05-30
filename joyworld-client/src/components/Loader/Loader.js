import React from 'react';
import { Letter, Wrapper } from './Loader.styles';

const Loader = () => {
    var str = 'yükleniyor';
    const letters = str.split('');
    return (
        <Wrapper>
            {letters.map((item,index) => (
                <Letter
                key={`loaderLetter${index}`}
                index={index}
                >
                    {item}
                </Letter>
            ))}
        </Wrapper>
    )
}
export default Loader;
