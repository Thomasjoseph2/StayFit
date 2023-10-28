import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react';

const UserPrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth) || {}; // Set trainerInfo to an empty object if it's undefined or null

    
    // If trainerInfo is not defined or null, redirect to login, else render the nested routes
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
}

export default UserPrivateRoute;
