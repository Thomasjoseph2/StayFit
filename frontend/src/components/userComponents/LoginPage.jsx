import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useGoogleLoginMutation,
} from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import PasswordResetModal from "./PasswordResetModal";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }
    if (isValid) {
      try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  const googleSubmitHandler = async (value) => {
    try {
      const res = await googleLogin({ token: value }).unwrap();
      dispatch(
        setCredentials({
          ...res,
        })
      );
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-black mt-16 m-5">
      <div>
        <a href="/">
          <h3 className="text-4xl font-bold">
            <span className="text-red-800">Stay</span>
            <span className="text-white">fit</span>
          </h3>
        </a>
      </div>
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-gray-900 shadow-md sm:max-w-lg sm:rounded-lg">
        <form onSubmit={submitHandler}>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white undefined"
            >
              Email
            </label>
            <div className="flex flex-col items-start">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
              />
              {emailError && (
                <p className="text-red-500 text-xs italic">{emailError}</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white undefined"
            >
              Password
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
              />
              {passwordError && (
                <p className="text-red-500 text-xs italic">{passwordError}</p>
              )}
            </div>
          </div>

          <Link
            onClick={openModal}
            className="text-xs text-white hover:underline"
          >
            Forget Password?
          </Link>

          <div className="flex items-center mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-green-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
          <PasswordResetModal isOpen={isModalOpen} onClose={closeModal}/>
        </form>
        <div className="mt-4 text-white ">
          Dont have an account?{" "}
          <span>
            <Link
              className="text-light-blue-800 hover:underline"
              to="/registration"
            >
              Sign Up
            </Link>
          </span>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full" />
          <p className="px-3 text-white ">OR</p>
          <hr className="w-full" />
        </div>
        <div className="my-6 space-y-2 mt-10 ">
          <GoogleLogin
            onSuccess={(response) => {
              googleSubmitHandler(response.credential);
            }}
            onError={() => {
              toast.error("login failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
