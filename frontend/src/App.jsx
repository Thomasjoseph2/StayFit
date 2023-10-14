import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import UserNavbar from "./components/userComponents/UserNavbar";
import UserBody from "./components/userComponents/UserBody";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
import Registration from "./components/userComponents/Registration";
import LoginPage from "./components/userComponents/LoginPage";


const App = () => {
  return (
    <div className="app bg-black flex flex-col h-screen  ">
      <UserNavbar />
      <Outlet />
      <Footer />
      <ToastContainer/>
    </div>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <UserBody />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default App;
