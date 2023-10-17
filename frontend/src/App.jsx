import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from "./components/userComponents/UserNavbar";


import Footer from "./components/Footer";
import Sidebar from "./components/adminComponents/SideBar";
import PrivateRoute from "./components/adminComponents/PrivateRoutes";
import TrainerNavbar from "./components/trainerComponent/TrainerNavbar";
const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isTrainerRoute = location.pathname.startsWith("/trainer");
  const isAdminLogin = location.pathname.includes("/admin/login");

  let navBar = null;

  if (isAdminRoute) {
    // If the route is for admin, don't render any navigation bar
    navBar = null;
  } else if (isTrainerRoute) {
    // If the route is for trainer, render TrainerNavbar
    navBar = <TrainerNavbar />;
  } else if (!isAdminLogin) {
    // If it's not an admin route or admin login, render UserNavbar
    navBar = <UserNavbar />;
  }

  return (
    <div className="app bg-black flex flex-col h-screen  ">
      {navBar} {/* Render the determined navigation bar */}
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
