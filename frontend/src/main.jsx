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

import ErrorPage from "./components/ErrorPage";

import UserBody from "./components/userComponents/UserBody";
import Registration from "./components/userComponents/Registration";
import LoginPage from "./components/userComponents/LoginPage";
import UserTrainerView from "./screens/UserTrainerView";
import TrainerView from "./components/userComponents/TrainerView";
import BmiCalculator from "./components/userComponents/BmiCalculator.jsx";
import SeeVideos from "./components/userComponents/SeeVideos.jsx";
import UserPrivateRoute from "./components/userComponents/UserPrivateRoute";
import UserProfile from "./components/userComponents/UserProfile";
import DietView from "./components/userComponents/DietView";
import OtpVerification from "./components/userComponents/OtpVerification.jsx";
import SubscriptionPlans from "./components/userComponents/SubscriptionPlans.jsx";
import ForgotOtpVerify from "./components/userComponents/ForgotOtpVerify.jsx";
import PasswordResetForm from "./components/userComponents/PasswordResetForm.jsx";

import AdminLogin from "./components/adminComponents/AdminLogin";
import PrivateRoute from "./components/adminComponents/PrivateRoutes";
import Sidebar from "./components/adminComponents/SideBar";

import TrainerPrivateRoute from "./components/trainerComponent/TrainerPrivateRoute";
import TrainerLogin from "./components/trainerComponent/TrainerLogin";
import TrainerHome from "./components/trainerComponent/trainerHome";
import TrainerProfile from "./components/trainerComponent/TrainerProfile";
import AddPostScreen from "./screens/AddPostScreen";
import VideoScreen from "./screens/VideoScreen";
import DietScreen from "./screens/DietScreen";
const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/************User side routes ***************/}

    <Route index={true} element={<UserBody />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/user-trainers" element={<UserTrainerView />} />
    <Route path="/bmi" element={<BmiCalculator />} />
    <Route path="/videos" element={<SeeVideos />} />
    <Route path="/diets" element={<DietView/>}/>
    <Route path='/otp-verification/:email' element={<OtpVerification />} />
    <Route path='/forgot-password-otp-verification/:email' element={<ForgotOtpVerify />} />
    <Route path="/password-reset-form/:email" element={<PasswordResetForm/>}/>


    <Route path="" element={<UserPrivateRoute />}>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/user-trainer-view/:trainerId" element={<TrainerView />} />
      <Route path="/subscription-plans" element={<SubscriptionPlans/>} />


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
