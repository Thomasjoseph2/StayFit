import React, { useState, useEffect } from "react";
import { useGetAdminConferencesMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";

const AdminLiveList = () => {
  const [lives, setLives] = useState([]);
  const [refresher, setRefresher] = useState("");

  const [getLives] = useGetAdminConferencesMutation();

  useEffect(() => {
    fetchLiveData();
    setRefresher(false);
  }, [refresher]);

  const fetchLiveData = async () => {
    try {
      const response = await getLives().unwrap();
      setLives(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Conference List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Trainer Name</th>
            </tr>
          </thead>
          <tbody>
            {lives.map((trainer) =>
              trainer.lives.map((live,index) => {
                return live.expired !== "true" ? (
                  <tr
                    key={live._id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="py-2 px-4 text-center">
                      {live?.title}{" "}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {live?.time}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {live?.date}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {trainer?.trainerName}
                    </td>
                  </tr>
                ) : null;
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLiveList;
