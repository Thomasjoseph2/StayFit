import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react';

const TrainerPrivateRoute = () => {
    const { trainerInfo } = useSelector((state) => state.trainerAuth) || {}; // Set trainerInfo to an empty object if it's undefined or null

    
    // If trainerInfo is not defined or null, redirect to login, else render the nested routes
    return trainerInfo ? <Outlet /> : <Navigate to='trainer/login' replace />;
}

export default TrainerPrivateRoute;
