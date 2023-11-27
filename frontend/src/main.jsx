import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

import "./index.css";
import store from "./store";

import Roompage from "./components/roompage.jsx";

import UserBody from "./components/userComponents/UserBody";
import Registration from "./components/userComponents/Registration";
import LoginPage from "./components/userComponents/LoginPage";
import UserTrainerView from "./screens/UserTrainerView";
import TrainerView from "./components/userComponents/TrainerView";
import BmiCalculator from "./components/userComponents/BmiCalculator.jsx";
import UserPrivateRoute from "./components/userComponents/UserPrivateRoute";
import UserProfile from "./components/userComponents/UserProfile";
import OtpVerification from "./components/userComponents/OtpVerification.jsx";
import SubscriptionPlans from "./components/userComponents/SubscriptionPlans.jsx";
import ForgotOtpVerify from "./components/userComponents/ForgotOtpVerify.jsx";
import PasswordResetForm from "./components/userComponents/PasswordResetForm.jsx";
import Messages from "./components/userComponents/Messages.jsx";
import AdminLogin from "./components/adminComponents/AdminLogin";
import PrivateRoute from "./components/adminComponents/PrivateRoutes";
import Sidebar from "./components/adminComponents/SideBar";
import SeeVideosHOC from "./components/userComponents/SeeVideosHOC.jsx";
import SeeDietsHOC from "./components/userComponents/SeeDietsHOC.jsx";
import LiveList from "./components/userComponents/LiveList.jsx";
import UserVideoStream from "./components/userComponents/UserVideoStream.jsx";
import SubscriptionPrivateRoute from "./components/userComponents/SubscriptionPrivateRoute.jsx";

import TrainerPrivateRoute from "./components/trainerComponent/TrainerPrivateRoute";
import TrainerLogin from "./components/trainerComponent/TrainerLogin";
import TrainerHome from "./components/trainerComponent/TrainerHome.jsx";
import TrainerProfile from "./components/trainerComponent/TrainerProfile";
import AddPostScreen from "./screens/AddPostScreen";
import VideoScreen from "./screens/VideoScreen";
import DietScreen from "./screens/DietScreen";
import TrainerMessages from "./components/trainerComponent/TrainerMessage.jsx";
import VideoStream from "./components/VideoStream.jsx";
import ListLives from "./components/trainerComponent/ListLives.jsx";

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/************User side routes ***************/}

    <Route index={true} element={<UserBody />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/user-trainers" element={<UserTrainerView />} />
    <Route path="/bmi" element={<BmiCalculator />} />
    <Route path="/videos" element={<SeeVideosHOC />} />
    <Route path="/diets" element={<SeeDietsHOC/>}/>
    <Route path='/otp-verification/:email' element={<OtpVerification />} />
    <Route path='/forgot-password-otp-verification/:email' element={<ForgotOtpVerify />} />
    <Route path="/password-reset-form/:email" element={<PasswordResetForm/>}/>
    

    <Route path="" element={<UserPrivateRoute />}>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/user-trainer-view/:trainerId" element={<TrainerView />} />
      <Route path="/subscription-plans" element={<SubscriptionPlans/>} />
      <Route path="" element={<SubscriptionPrivateRoute />}>
      <Route path="/user-messages/:chatId" element={<Messages/>}/>
      <Route path="/user-roompage/:roomId" element={<Roompage/>}/>
      <Route path='/user-conferences' element={<LiveList/>}/>
      <Route path='/user/video-conference/:liveId' element={<UserVideoStream/>}/>
      </Route>
    </Route>

    {/************Admin side routes ***************/}
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="" element={<PrivateRoute />}>
      <Route path="/admin" element={<Sidebar />} />
    </Route>

    {/************Trainer side routes ***************/}
    <Route path="/trainer/login" element={<TrainerLogin />} />

    <Route path="" element={<TrainerPrivateRoute />}>
      <Route path="/trainer/profile" element={<TrainerProfile />} />
      <Route path="/trainer" element={<TrainerHome />} />
      <Route path="/trainer/add-results" element={<AddPostScreen />} />
      <Route path="/trainer/videos" element={<VideoScreen />} />
      <Route path="/trainer/diet" element={<DietScreen />} />
      <Route path="/trainer/messages" element={<TrainerMessages />} />
     {/* <Route path="/trainer-roompage/:id" element={<Roompage/>}/> */}
     <Route path='/trainer/video-conference/:liveId' element={<VideoStream/>}/>
     <Route path='/trainer/list-lives' element={<ListLives />}/>
     
    </Route>
  </Route>
);

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId="714641682565-959gsh23k6n5qflfoeb419s7g3pntjrk.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>
);
