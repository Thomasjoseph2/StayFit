import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotOtpVerificationMutation } from "../../slices/usersApiSlice";
const ForgotOtpVerify = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp,setOtp]=useState('')
  
  const [verifyOtp]=useForgotOtpVerificationMutation()

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      if(res.status==='success'){
        navigate(`/password-reset-form/${email}`)
        toast.success("otp verified successfully");
        
      }
      
    } catch (error) {
      console.log(error);
      toast.error("otp verification failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className=" p-8 rounded shadow-lg bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-white">OTP Verification</h2>
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">
              Enter OTP:
            </label>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your OTP"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotOtpVerify;
