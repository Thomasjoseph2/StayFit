import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from 'react-router-dom'
import App from './App';

import './index.css'
import store from "./store";

import ErrorPage from "./components/ErrorPage";

import UserBody from "./components/userComponents/UserBody";
import Registration from "./components/userComponents/Registration";
import LoginPage from "./components/userComponents/LoginPage";

import AdminLogin from "./components/adminComponents/AdminLogin";
import PrivateRoute from './components/adminComponents/PrivateRoutes';
import Sidebar from './components/adminComponents/SideBar';

import TrainerPrivateRoute from './components/trainerComponent/TrainerPrivateRoute';
import TrainerSideBar from './components/trainerComponent/TrainerSideBar';
import TrainerLogin from './components/trainerComponent/TrainerLogin';
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

    
    {/************Trainer side routes ***************/}
    <Route path='/trainer/login' element={<TrainerLogin/>}/>
    <Route path='' element={<TrainerPrivateRoute />}>
    <Route path='/trainer' element={<TrainerSideBar/>}/>
    </Route>

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
