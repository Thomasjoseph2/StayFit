import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../slices/adminApiSlice";
import ConfirmationModal from "../ConfirmationModal";

const UsersList = () => {
  const [actualData, setActualData] = useState([]);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [refresher, setRefresher] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      setActualData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    // Fetch user data from the backend
    fetchUserData();
  }, [refresher]);

  const handleBlockUser = async (userId) => {
    const confirmBlock = window.confirm(
      "are you sure you want to block this user?"
    );
    if (confirmBlock) {
      try {
        await blockUser({ userId });

        toast.success("user blocked");

        setRefresher("blocked");
      } catch (err) {
        console.error("Error blocking user:", err);
        // Show an error toast
        toast.error("An error occurred while blocking the user.");
      }
    }
  };

  const handleUnBlockUser = async (userId) => {
    const confirmUnblock = window.confirm(
      "Are you sure you want to unblock this user?"
    );
    if (confirmUnblock) {
      try {
        await unblockUser({ userId });
        toast.success("User unblocked successfully");
        // Refetch user data and update state after unblocking
        setRefresher("unblocked");
      } catch (err) {
        console.error("Error unblocking user:", err);
        // Show an error toast
        toast.error("An error occurred while unblocking the user.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800">Users List</h2>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {actualData.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-4 text-center">{user._id}</td>
                <td className="py-2 px-4 text-center">{user.name}</td>
                <td className="py-2 px-4 text-center">{user.email}</td>
                <td className="py-2 px-4 text-center">
                  {user.blocked ? (
                    <button
                      onClick={() => handleUnBlockUser(user._id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockUser(user._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
