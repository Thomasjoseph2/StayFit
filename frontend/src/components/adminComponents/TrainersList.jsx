import React, { useState,useEffect } from "react";
import AddTrainerModal from "./AddTrainerModal";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";

const TrainersList = () => {
  const [actualData, setActualData] = useState([]);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresher, setRefresher] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get("/api/admin/trainers")
      .then((response) => {
        setActualData(response.data); // Set user data in state
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);

        toast.error("Error fetching user data");
      });
  }, [refresher]);

  const closeModal = () => {
    setIsModalOpen(false);
    setRefresher("changed")
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tutors List</h2>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Trainer
        </button>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">Experience</th>
            <th className="border border-gray-300 px-4 py-2">Specialization</th>
          </tr>
        </thead>
        <tbody>
          {actualData.map((trainer, index) => (
            <tr key={trainer._id}>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.firstName + trainer.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.phone}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.experience}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {trainer.specialties}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddTrainerModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default TrainersList;
