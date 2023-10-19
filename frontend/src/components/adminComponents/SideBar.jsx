import React, { useState } from "react";
import { FaDumbbell } from 'react-icons/fa';
import {
  FaUsers,
  FaRunning,
  FaVideo,
  FaUtensils,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminHomePage from "./AdminHomePage";
import { useDispatch, useSelector } from "react-redux";
import { useAdminLogoutMutation } from "../../slices/adminApiSlice";
import { logout } from "../../slices/adminAuthSlice";
import TutorsList from "./TrainersList";
import UsersList from "./UsersList";

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
      <div className="h-8 bg-blue-500"></div>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/5 bg-gray-800 h-screen">
          <div className="p-4 text-white">
            <div className="flex items-center mb-4">
              < FaDumbbell className="text-white text-2xl" />
              <h1 className=" ml-1 text-2xl font-bold">Stayfit</h1>
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
                  activeMenuItem === "logout" ? "bg-gray-700" : ""
                }`}
                onClick={logoutHandler}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-4/5 bg-gray-200 h-screen">
          <div className="p-4">
            {content === "Dashboard" && <AdminHomePage />}
            {content === "trainer" && <TutorsList />}
            {content === "users" && <UsersList />}
            {content === "videos" && "Videos Content"}
            {content === "diet" && "Diet Content"}
            {content === "logout" && "Logout Content"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
