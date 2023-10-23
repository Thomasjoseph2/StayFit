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
import UserTrainerView from './screens/UserTrainerView';
import TrainerView from './components/userComponents/TrainerView';
import BmiCalculator from './components/userComponents/BmiCalculator.jsx';

import AdminLogin from "./components/adminComponents/AdminLogin";
import PrivateRoute from './components/adminComponents/PrivateRoutes';
import Sidebar from './components/adminComponents/SideBar';

import TrainerPrivateRoute from './components/trainerComponent/TrainerPrivateRoute';
import TrainerLogin from './components/trainerComponent/TrainerLogin';
import TrainerHome from './components/trainerComponent/trainerHome';
import TrainerProfile from './components/trainerComponent/TrainerProfile';
import AddPostScreen from './screens/AddPostScreen';
import VideoScreen from './screens/VideoScreen';
const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/************User side routes ***************/}

    <Route index={true} element={<UserBody />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path='/user-trainers' element={<UserTrainerView />}/>
    <Route path='/user-trainer-view/:trainerId' element={<TrainerView/>}/>
    <Route path='/bmi' element={<BmiCalculator/>}/>

    {/************Admin side routes ***************/}
    <Route path='/admin/login' element={<AdminLogin/>}/>
    <Route path='' element={<PrivateRoute/>}>
    <Route path='/admin' element={<Sidebar/>}/>
    </Route>

    
    {/************Trainer side routes ***************/}
    <Route path='/trainer/login' element={<TrainerLogin/>}/>
   
    <Route path='' element={<TrainerPrivateRoute/>}>
    <Route path='/trainer/profile' element={<TrainerProfile/>}/>
    <Route path='/trainer' element={<TrainerHome/>}/>
    <Route path='/trainer/add-results' element={<AddPostScreen/>}/>
    <Route path='/trainer/videos' element={<VideoScreen/>}/>
    
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
