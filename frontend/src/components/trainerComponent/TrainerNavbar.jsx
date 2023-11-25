import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoMdMedal } from 'react-icons/io';
import { useSelector, useDispatch } from "react-redux";
import { useTrainerLogoutMutation } from "../../slices/trainerApiSlice";
import { logout } from "../../slices/trainerAuthSlice";
import { toast } from "react-toastify";
import {
  FaHome,
  FaComment,
  FaUtensils,
  FaPlayCircle,
  FaDumbbell,
  FaVideo
} from "react-icons/fa"; // Import appropriate icons

const TrainerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { trainerInfo } = useSelector((state) => state.trainerAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useTrainerLogoutMutation();

  const logoutHandler = async () => {
    try {

      await logoutApiCall().unwrap();

      dispatch(logout());

      navigate("/trainer");
    
    } catch (error) {
    
        toast.error(error.message);
    }

  };


  const toggleMenu = () => {

    setIsOpen(!isOpen);

  };
/*`/trainer-video-conference/${trainerInfo.liveId}`*/
  return (
    <nav className="bg-red-700 bg-opacity-75 p-4 flex justify-between items-center z-10 fixed w-full ">
      <div className="text-white font-bold text-xl">
      <FaDumbbell className="text-white text-2xl ml-5" />
        <Link to="/trainer">Stayfit</Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="md:hidden flex-grow"></div>
        <div className="hidden md:flex flex-grow justify-center space-x-4">
          <Link to="/trainer" className="text-white hover:text-gray-300 text-xl">
            <FaHome size={24} />
          </Link>{" "}
          <Link to={`trainer/list-lives`} className="text-white hover:text-gray-300 text-xl">
            <FaVideo size={24} />
          </Link>
          <Link to="/trainer/messages" className="text-white hover:text-gray-300 text-xl">
            <FaComment size={24} />
          </Link>{" "}
          {/* Messages Icon */}
          <Link to="/trainer/videos" className="text-white hover:text-gray-300 text-xl">
            <FaPlayCircle size={24} />
          </Link>{" "}
          {/* Videos Icon */}
          <Link to="/trainer/diet" className="text-white hover:text-gray-300 text-xl">
            <FaUtensils size={24} />
          </Link>
          <Link to="/trainer/add-results" className="text-white hover:text-gray-300 text-xl">
            <IoMdMedal size={24} />
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {trainerInfo ? (
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/">
              <button
                onClick={logoutHandler}
                className="text-white hidden md:block"
              >
                Logout
              </button>
            </Link>
            <Link
              to="trainer/profile"
              className="text-white hover:text-gray-300 w-full block text-xl"
            >
              <CgProfile />
            </Link>
          </div>
        ) : (
          ""
        )}
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
              <Link
                href="#"
                className="text-white hover:text-gray-300 w-full block"
              >
               Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/trainer-video-conference"
                className="text-white hover:text-gray-300 w-full block"
              >
                Live
              </Link>
            </li>
            <li>
            <li>
              <Link
                href="#"
                className="text-white hover:text-gray-300 w-full block"
              >
                Messages
              </Link>
            </li>
              <Link
                href="#"
                className="text-white hover:text-gray-300 w-full block"
              >
                Diet
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-white hover:text-gray-300 w-full block"
              >
                Videos
              </Link>
            </li>

            {trainerInfo ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="text-white hover:text-gray-300 w-full block"
                  >
                    Profile
                  </Link>
                </li>
                <li onClick={logoutHandler}>
                  <Link
                    to="/logout"
                    className="text-white hover:text-gray-300 w-full block"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/trainer/login"
                    className="text-white hover:text-gray-300 w-full block"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default TrainerNavbar;
