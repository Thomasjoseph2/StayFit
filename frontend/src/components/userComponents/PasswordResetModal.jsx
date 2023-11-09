import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPassworsMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
const PasswordResetModal = ({ isOpen, onClose }) => {
  const emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [email, setEmail] = useState("");
  const [sendEmail] = useForgotPassworsMutation();

  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();

    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      toast.error('Enter valid email')
      return;
    }

    try {
      const status = await  sendEmail({ email: email }).unwrap();

      if (status.status === true) {
        onClose();
        navigate(`/forgot-password-otp-verification/${email}`);
        toast.success("OTP sent successfully... check your email!!!");
      } else {
        toast.error("user dosent exist");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }

  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-gray-900 w-96 p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-2xl mb-4 text-white">Forgot Password</h2>
        <div className="space-y-4 text-white">
          <input
            type="email"
            className="border p-2 w-full text-black"
            value={email}
            placeholder="Enter your email... "
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="button"
            onClick={handleSubmit} // Handle the submit logic here
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetModal;
