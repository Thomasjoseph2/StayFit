import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin"; // Import the AdminLogin component
import TutorsList from "./components/adminComponents/TutorsList";
// ... import other admin components

const AdminRoutes = () => {
  return (
    <Routes>
      
      <Route path="/login" element={<AdminLogin />} /> 
      <Route path='/trainer' element={<TutorsList/>}/>
    </Routes>
  );
};

export default AdminRoutes;
A