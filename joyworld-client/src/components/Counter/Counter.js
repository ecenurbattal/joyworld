import React from 'react';
import Button from '../Button/Button';

import { Wrapper, Value } from './Counter.styles';

const Counter = ({ value, onIncrement, onDecrement }) => {
    return (
        <Wrapper>
            <Button text="-" onClick={onDecrement} />
            <Value>{value}</Value>
            <Button text="+" onClick={onIncrement} />
        </Wrapper>
    );
};

export default Counter;
