import React, { useState } from "react";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-red-700 bg-opacity-75 p-4 flex justify-between items-center z-10 fixed w-full ">
      <div className="text-white font-bold text-xl">Stayfit</div>
      <div className="flex items-center space-x-4">
        <div className="md:hidden flex-grow"></div>
        <div className="hidden md:flex flex-grow justify-center space-x-4">
          <a href="#" className="text-white hover:text-gray-300">
            Trainers
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Diet
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Videos
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            BMI Calculator
          </a>
        </div>
      </div>
      <div className="md:hidden flex-grow"></div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-white">SignUp</span>
        </div>
        <button className="text-white hidden md:block">Login</button>
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-16 right-4 left-4 bg-gray-800 p-2">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-white hover:text-gray-300 w-full block"
              >
                Diet
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-gray-300 w-full block"
              >
                Videos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-gray-300 w-full block"
              >
                BMI Calculator
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-gray-300 w-full block"
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white hover:text-gray-300 w-full block"
              >
                Profile
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
