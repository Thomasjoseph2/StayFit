import React, { useState, useEffect } from "react";
import AddTrainerModal from "./AddTrainerModal";
import axios from "axios";
import { toast } from "react-toastify";

const TrainersList = () => {
  const [actualData, setActualData] = useState([]);
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
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
      });
  }, [refresher]);

  const closeModal = () => {
    setIsModalOpen(false);
    setRefresher("changed");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Tutors List</h2>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Add Trainer
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Experience</th>
              <th className="py-2 px-4">Specialization</th>
            </tr>
          </thead>
          <tbody>
            {actualData.map((trainer, index) => (
              <tr key={trainer._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="py-2 px-4 text-center">{trainer.firstName} {trainer.lastName}</td>
                <td className="py-2 px-4 text-center">{trainer.email}</td>
                <td className="py-2 px-4 text-center">{trainer.phone}</td>
                <td className="py-2 px-4 text-center">{trainer.experience}</td>
                <td className="py-2 px-4 text-center">{trainer.specialties}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddTrainerModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default TrainersList;
