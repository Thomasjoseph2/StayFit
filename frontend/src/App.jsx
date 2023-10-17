import React from "react";
import { Outlet,useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from "./components/userComponents/UserNavbar";
import Footer from "./components/Footer";
import Sidebar from "./components/adminComponents/SideBar";
import PrivateRoute from "./components/adminComponents/PrivateRoutes";


const App = () => {
const location=useLocation();

const isAdminRoute=location.pathname.startsWith("/admin")
const isTrainerRoute=location.pathname.startsWith("/trainer")
const isAdminlogin = location.pathname.includes("/admin/login");
const isLoginTrainer=location.pathname.includes("/trainer/login")

  return (
    <div className="app bg-black flex flex-col h-screen  ">
      
      {!isAdminlogin && !isLoginTrainer && ( isAdminRoute|| isTrainerRoute ? "" : <UserNavbar />)}
      <Outlet />
      <Footer />
      <ToastContainer/>
    </div>
  );
};


export default App;
