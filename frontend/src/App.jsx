import React from "react";

import UserNavbar from "./components/UserNavbar";
import UserBody from "./components/UserBody";
import WorkoutCard from "./components/WorkoutCard";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
import Registration from "./components/Registration";
import LoginPage from "./components/LoginPage";
import { createBrowserRouter ,Outlet} from 'react-router-dom'

const App = () => {
  return (
    <div className="app bg-black flex flex-col h-screen  ">
      <UserNavbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[
       {
        path:"/",
        element:<UserBody/>

       },
      {
        path:"/registration",
        element:<Registration/>
      },
      {
        path:"/login",
        element:<LoginPage/>
      }
    ]


  },

 
  
])

export default App;
