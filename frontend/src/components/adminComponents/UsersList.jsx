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

  const [blockUser]=useBlockUserMutation();
  const [unblockUser]=useUnblockUserMutation();
  const [refresher,setRefresher]=useState('')

  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get("/api/admin/users")
      .then((response) => {
        setActualData(response.data); // Set user data in state
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);

        toast.error("Error fetching user data");
      });
  }, [refresher]);


 const handleBlockUser=async(userId)=>{
    const confirmBlock=window.confirm(
      "are you sure you want to delete this user?"
    );
    if(confirmBlock){
      try {
        await blockUser({userId});

        toast.success("user blocked")

        setRefresher("blocked")
      } catch (err) {
        console.error("Error blocking user:", err);
        // Show an error toast
        toast.error("An error occurred while blocking the user.");
      }
    }

 }

 const handleUnBlockUser = async (userId) => {
  const confirmUnblock = window.confirm("Are you sure you want to unblock this user?");
  if (confirmUnblock) {
    try {
      await unblockUser({ userId });
      toast.success("User unblocked successfully");
      // Refetch user data and update state after unblocking
      setRefresher("unblocked")
    } catch (err) {
      console.error("Error unblocking user:", err);
      // Show an error toast
      toast.error("An error occurred while unblocking the user.");
    }
  }
}

  return (
    <div className="table-auto ">
      <div className="bg-black text-white">
        {" "}
        <h2 className="text-2xl font-bold mb-4">Users List</h2>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Subject</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {actualData.map((user, index) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {user._id}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {user.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {user.email}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {user.blocked === true ? (
                  <button
                    onClick={() => handleUnBlockUser(user._id)}
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlockUser(user._id)}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
  );
};

export default UsersList;
