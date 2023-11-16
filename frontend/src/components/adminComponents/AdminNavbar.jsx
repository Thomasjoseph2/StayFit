import React, { useState } from "react";
import { FaRunning, FaUsers, FaVideo, FaUtensils, FaCrown, FaSignOutAlt } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";

const AdminNavBar = ({ changeContent, logoutHandler }) => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="bg-gray-800 p-4 text-white ">
      <div className="flex items-center justify-between">
      <div className="">
      <FaDumbbell className="mr-auto ml-auto"/>
      <h2>Stayfit</h2>
      </div>
      <button onClick={toggleNavbar} className=" text-white focus:outline-none">
        <FiAlignJustify className="text-3xl" />
      </button>
      </div>

      {isNavbarOpen && (
        <ul className="mt-4" onClick={toggleNavbar}>
          <li className="py-2 hover:bg-gray-700 flex items-center pl-4" onClick={() => changeContent("Dashboard")}>
            <FaRunning className="mr-2" /> Dashboard
          </li>
          <li className="py-2 hover:bg-gray-700 flex items-center pl-4" onClick={() => changeContent("users")}>
            <FaUsers className="mr-2" /> Users
          </li>
          <li className="py-2 hover:bg-gray-700 flex items-center pl-4" onClick={() => changeContent("trainer")}>
            <FaRunning className="mr-2" /> Trainer
          </li>
          <li className="py-2 hover-bg-gray-700 flex items-center pl-4" onClick={() => changeContent("videos")}>
            <FaVideo className="mr-2" /> Videos
          </li>
          <li className="py-2 hover:bg-gray-700 flex items-center pl-4" onClick={() => changeContent("diet")}>
            <FaUtensils className="mr-2" /> Diet
          </li>
          <li className="py-2 hover:bg-gray-700 flex items-center pl-4" onClick={() => changeContent("subscriptionPlans")}>
            <FaCrown className="mr-2" /> Subscription Plans
          </li>
          <li className="py-2 hover:bg-gray-700 flex items-center pl-4" onClick={() => changeContent("subscriptions")}>
            <FaCrown className="mr-2" /> Subscriptions
          </li>
          <li className="py-2 hover:bg-gray-700 flex items-center pl-4" onClick={logoutHandler}>
            <FaSignOutAlt className="mr-2" /> Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default AdminNavBar;
