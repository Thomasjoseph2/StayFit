import React, { useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useAdminLogoutMutation } from "../../slices/adminApiSlice";
import { logout } from "../../slices/adminAuthSlice";
import AdminHomePage from "./AdminHomePage";
import TutorsList from "./TrainersList";
import UsersList from "./UsersList";
import AdminVideoScreen from "../../screens/AdminVideoScreen";
import AdminDietScreen from "../../screens/AdminDietScreen";
import SubscriptionPlans from "./SubscriptionPlans";
import Subscriptions from "./Suscriptions";
import { FaRunning, FaUsers, FaVideo, FaUtensils, FaCrown, FaSignOutAlt } from "react-icons/fa";
import AdminNavBar from "./AdminNavbar";
import AdminLiveList from "./AdminLiveList";

const Sidebar = () => {
  const [content, setContent] = useState("Dashboard");
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useAdminLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeContent = (newContent) => {
    setActiveMenuItem(newContent);
    setContent(newContent);
  };

  return (
    <>
      {/* Sidebar for large screens and above */}
      <div className=" lg:flex">
        <div className="w-1/5 bg-gray-800 h-screen hidden lg:flex">
          <div className="p-4 text-white">
            <div className="flex items-center mb-4">
              <FaDumbbell className="text-white text-2xl" />
              <h1 className="ml-1 text-2xl font-bold">Stayfit</h1>
              <span className="text-sm text-white p-3 ml-2">Admin</span>
            </div>

            <ul className="mt-4">
              <li
                className={`py-2 hover:bg-gray-700 flex items-center pl-4  ${
                  activeMenuItem === "Dashboard" ? "bg-gray-700" : ""
                }`}
                onClick={() => changeContent("Dashboard")}
              >
                <FaRunning className="mr-2" /> Dashboard
              </li>
              <li
                className={`py-2 hover:bg-gray-700 flex items-center pl-4  ${
                  activeMenuItem === "users" ? "bg-gray-700" : ""
                }`}
                onClick={() => changeContent("users")}
              >
                <FaUsers className="mr-2" /> Users
              </li>
              <li
                className={`py-2 hover:bg-gray-700 flex items-center pl-4  ${
                  activeMenuItem === "trainer" ? "bg-gray-700" : ""
                }`}
                onClick={() => changeContent("trainer")}
              >
                <FaRunning className="mr-2" /> Trainer
              </li>
              <li
                className={`py-2 hover-bg-gray-700 flex items-center pl-4  ${
                  activeMenuItem === "videos" ? "bg-gray-700" : ""
                }`}
                onClick={() => changeContent("videos")}
              >
                <FaVideo className="mr-2" /> Videos
              </li>
              <li
                className={`py-2 hover:bg-gray-700 flex items-center pl-4  ${
                  activeMenuItem === "diet" ? "bg-gray-700" : ""
                }`}
                onClick={() => changeContent("diet")}
              >
                <FaUtensils className="mr-2" /> Diet
              </li>
              <li
                className={`py-2 hover:bg-gray-700 flex items-center pl-4  ${
                  activeMenuItem === "subscription plans" ? "bg-gray-700" : ""
                }`}
                onClick={() => changeContent("subscriptionPlans")}
              >
                <FaCrown className="mr-2" /> Subscription Plans
              </li>
              <li
                className={`py-2 hover:bg-gray-700 flex items-center pl-4  ${
                  activeMenuItem === "subscriptions" ? "bg-gray-700" : ""
                }`}
                onClick={() => changeContent("subscriptions")}
              >
                <FaCrown className="mr-2" /> Subscriptions
              </li>
              <li
                className={`py-2 hover:bg-gray-700 flex items-center pl-4  ${
                  activeMenuItem === "lives" ? "bg-gray-700" : ""
                }`}
                onClick={() => changeContent("lives")}
              >
                <FaCrown className="mr-2" /> Live List
              </li>
              <li
                className={`py-2 hover:bg-gray-700 flex items-center pl-4  ${
                  activeMenuItem === "logout" ? "bg-gray-700" : ""
                }`}
                onClick={logoutHandler}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </li>
              </ul>
          </div>
        </div>
        <div className="lg:hidden ">
        <AdminNavBar changeContent={changeContent} logoutHandler={logoutHandler} />
      </div>
        <div className="lg:w-4/5 bg-gray-200 h-screen w-full">
          <div className="p-4">
            {/* Render content based on the selected menu item */}
            {content === "Dashboard" && <AdminHomePage />}
            {content === "trainer" && <TutorsList />}
            {content === "users" && <UsersList />}
            {content === "videos" && <AdminVideoScreen />}
            {content === "diet" && <AdminDietScreen />}
            {content === "subscriptionPlans" && <SubscriptionPlans />}
            {content === "subscriptions" && <Subscriptions />}
            {content === "lives" && <AdminLiveList />}
            {content === "logout" && "Logout Content"}
          </div>
        </div>
      </div>

      {/* AdminNavBar for medium and smaller screens */}

    </>
  );
};

export default Sidebar;