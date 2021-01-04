import React from 'react';
import Button from '../Button/Button';

import { Wrapper, Value } from './Counter.styles';

const Counter = ({ value, onIncrement, onDecrement }) => {
    return (
        <Wrapper>
            <Button role='counterDecrement' text="-" onClick={onDecrement} />
            <Value data-testid='counterValue'>{value}</Value>
            <Button role='counterIncrement' text="+" onClick={onIncrement} />
        </Wrapper>
    );
};

export default Counter;
