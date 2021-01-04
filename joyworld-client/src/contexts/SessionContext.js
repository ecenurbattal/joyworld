import React from 'react';

const SessionContext = React.createContext({
    isAuthenticated: false,
    setAuthenticated: (authenticated) => {},
});

export default SessionContext;
