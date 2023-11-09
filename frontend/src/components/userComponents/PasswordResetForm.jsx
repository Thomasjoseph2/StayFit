import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChangePasswordMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const PasswordResetForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();
  const { email } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("passwords dosent match");
      return;
    }
    try {
      const res = await changePassword({ email: email, password: password }).unwrap()
      if (res.status === "success") {
        navigate("/login");
        toast.success("password updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className=" p-8 rounded shadow-lg bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-white">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-100">
              Change password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 p-2 border rounded w-full"
              placeholder="Enter your password..."
              required
            />
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-3 p-2 border rounded w-full"
              placeholder="Enter your password again to confirm"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 "
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetForm;
