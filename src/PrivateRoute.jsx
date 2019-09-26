import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from './Auth'

export const PrivateRoute = withAuth(({ component: RouteComponent, isAuthorized, ...rest}) => 
(
    <Route {...rest} render={routerProps => (
        isAuthorized 
        ? <RouteComponent {...routerProps} /> 
        : <Redirect to={"/login"}/>
    )} />
))