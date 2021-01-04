import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Wrapper } from './Container.styles';

const Container = ({ children }) => {
    return (
        <Wrapper>
        <Router>{children}</Router>
        </Wrapper>
    );
};

export default Container;
