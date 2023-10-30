import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation,useGoogleLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    e.preventDefault(); // Corrected typo here
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
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

  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-black mt-12">
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
                }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
              />
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
                }}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
              />
            </div>
          </div>

          <a href="#" className="text-xs text-white hover:underline">
            Forget Password?
          </a>
          <div className="flex items-center mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-green-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
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
          {/* <button
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current text-green-900 "
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p className="text-light-blue-800">Login with Google</p>
          </button> */}
          <GoogleLogin 
            onSuccess={(response) => {
              googleSubmitHandler(response.credential);
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          ;
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
