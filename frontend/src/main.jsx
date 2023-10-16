import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import App from './App';


import UserBody from "./components/userComponents/UserBody";
import ErrorPage from "./components/ErrorPage";
import Registration from "./components/userComponents/Registration";
import LoginPage from "./components/userComponents/LoginPage";

import AdminLogin from "./components/adminComponents/AdminLogin";
import './index.css'
import store from "./store";

import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from 'react-router-dom'
import PrivateRoute from './components/adminComponents/PrivateRoutes';
import Sidebar from './components/adminComponents/SideBar';

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/************User side routes ***************/}

    <Route index={true} element={<UserBody />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/login" element={<LoginPage />} />

    {/************Admin side routes ***************/}
    <Route path='/admin/login' element={<AdminLogin/>}/>
    <Route path='' element={<PrivateRoute/>}>
    <Route path='/admin' element={<Sidebar/>}/>
    </Route>

    {/* Catch-all route for unmatched paths */}
    

  </Route>
);

const router = createBrowserRouter(routes);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>
  </Provider>
)
