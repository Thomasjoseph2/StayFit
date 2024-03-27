import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useTrainerLoginMutation } from "../../slices/trainerApiSlice";
import { setCredentials } from "../../slices/trainerAuthSlice";
import  {toast} from 'react-toastify'
import trainerAuthSlice from "../../slices/trainerAuthSlice";
const TrainerLogin= () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [login,{isLoading}]=useTrainerLoginMutation();
    const {trainerInfo} =useSelector((state)=>state.trainerAuth);
   
    useEffect(() => {
        if (trainerInfo) {
          navigate("/trainer");
        }
      }, [navigate, trainerInfo]);
    const submitHandler = async (e) => {
        e.preventDefault(); // Corrected typo here
        try {
            const res=await login({email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/trainer');
        } catch (err) {
            toast.error(err?.data?.message || err?.error);
        }
        
      }
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
                onChange={(e)=>{setEmail(e.target.value)}}
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
                onChange={(e)=>{setPassword(e.target.value)}}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-10"
              />
            </div>
          </div>

          <div className="flex items-center mt-4">
            <button type="submit"  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-green-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </form>
 
      </div>
    </div>
  );
};

export default TrainerLogin;
