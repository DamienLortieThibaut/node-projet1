import { jwtDecode } from "jwt-decode";
import React from "react";
import {Navigate, Outlet} from 'react-router-dom'
import { hasRequiredRole, isAuthenticated } from "./helper";
import { useAuth } from "./provider";

const ProtectedRouteWithLogin = ( { redirectPath, children } ) => {
    const { accessToken } = useAuth();
    if(!isAuthenticated(accessToken)) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
}

export default ProtectedRouteWithLogin;