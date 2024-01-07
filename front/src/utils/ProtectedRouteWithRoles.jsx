import { jwtDecode } from "jwt-decode";
import React from "react";
import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from "./provider";
import { hasRequiredRole } from "./helper";

const ProtectedRouteWithRoles = ( {requiredRoles, redirectPath, children } ) => {
    const { accessToken } = useAuth();
    if(!accessToken || !hasRequiredRole(requiredRoles, accessToken)) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
}

export default ProtectedRouteWithRoles;