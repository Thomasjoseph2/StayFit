import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react';

const SubscriptionPrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth) || {}; 
    return userInfo.subscription==="active"  ? <Outlet /> : <Navigate to='/subscription-plans' replace />;
}

export default SubscriptionPrivateRoute;
