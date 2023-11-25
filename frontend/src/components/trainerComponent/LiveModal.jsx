import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useAddPostMutation } from "../../slices/trainerApiSlice";
import { toast } from "react-toastify";

const LiveModal = ({refreshPosts}) => {
  const { trainerInfo } = useSelector((state) => state.trainerAuth);
  
  return (
    <div className="mt-24 p-4">
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-900 text-white hover:bg-gray-700 w-full py-2 rounded"
      >
        Add Post
      </button>


    </div>
  );
};

export default LiveModal;
