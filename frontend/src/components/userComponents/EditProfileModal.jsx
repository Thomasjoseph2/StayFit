import React, { useState } from "react";
import { useUpdateProfileMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import {useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
const EditProfileModal = ({ isOpen, onClose, setRefresher, userId }) => {


    const isEmailValid = (email) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic (add your own validation rules)
    if (name.trim() === "" || email.trim() === "") {
      toast.error("Name and email are required fields.");
      return;
    }
    if (!isEmailValid(email)) {
      toast.error("Invalid email address.");
      return;
    }
    try {
      // Call the updateProfile function with the updated data
     const res= await updateProfile({
        userId: userId,
        name: name,
        email: email,
      });

      console.log(res,'response');
      dispatch(setCredentials({  ...res.data.user }));
      // Close the modal and trigger refresher
      onClose();
      setRefresher((prev) => !prev); // Trigger re-render
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-gray-900 w-96 p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-2xl mb-4 text-white">Edit Profile</h2>
        <div className="space-y-4 text-white">
          <input
            type="text"
            className="border p-2 w-full text-black"
            value={name}
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="border p-2 w-full text-black"
            value={email}
            placeholder={email}
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

export default EditProfileModal;
