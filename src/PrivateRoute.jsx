import React from 'react';
import { Router, Redirect } from "react-router-dom";
import { withAuth } from './Auth';


export const PrivateRoute = withAuth(
    ({ component: RouteComponent, isAuthorized, ...rest }) => (
        <Router
            {...rest}
            render={routerProps => (
                isAuthorized ? (
                    <RouteComponent {...routerProps} />
                ) : (
                        <Router to={"/login"} />
                    )
            )} />
    )
);
