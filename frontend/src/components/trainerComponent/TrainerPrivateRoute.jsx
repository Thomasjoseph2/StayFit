import { Navigate,Outlet } from "react-router-dom";
import { useSelector} from "react-redux";

import React from 'react'

const TrainerPrivateRoute = () => {

    const {trainerInfo}=useSelector((state)=>state.adminAuth);
    
    return trainerInfo ? <Outlet/>: <Navigate to='trainer/login' replace/> 
}

export default TrainerPrivateRoute