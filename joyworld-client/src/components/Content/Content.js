import React, { useContext } from 'react';
import {Route, Switch} from 'react-router-dom';
import {routes} from '../../config/Router';
import SessionContext from '../../contexts/SessionContext';
import PrivateRoute from '../../utils/PrivateRoute';
import { Wrapper } from './Content.styles';


const Content = () => {
    const {isAuthenticated} = useContext(SessionContext);
    return (
        <Wrapper>
            <Switch>
                {routes.map((route) => 
                    route.isPrivate ? (
                        <PrivateRoute
                            key={`route-${route.title}`}
                            exact={route.exact}
                            path={route.path}
                            isAuthenticated={isAuthenticated}
                        >
                            {route.component()}
                        </PrivateRoute>
                    ) : (
                        <Route key={`route-${route.title}`} exact={route.exact} path={route.path}>
                            {route.component()}
                        </Route>
                    )
                )}
            </Switch>
        </Wrapper>
    )
}

export default Content
