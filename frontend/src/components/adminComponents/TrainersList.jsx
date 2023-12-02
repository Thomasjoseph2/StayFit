import React, { useState, useEffect } from "react";
import AddTrainerModal from "./AddTrainerModal";
import axios from "axios";
import { toast } from "react-toastify";
import {
  useBlockTrainerMutation,
  useUnblockTrainerMutation,
  useTrainersMutation
} from "../../slices/adminApiSlice";
import ConfirmationDialog from "../Confirmation";

const TrainersList = () => {
  const [actualData, setActualData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresher, setRefresher] = useState(false);
  const [length, setLength] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [confirmedAction, setConfirmedAction] = useState(null);
  const [trainerIdToConfirm, setTrainerIdToConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);

  const [blockTrainer] = useBlockTrainerMutation();
  const [unblockTrainer] = useUnblockTrainerMutation();
  const [getTrainers]=useTrainersMutation();

  const filteredTrainers = actualData.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchTrainerData()
  }, [refresher]);

  const fetchTrainerData = async () => {
    try {
      const response = await getTrainers();
      setActualData(response.data);
      setLength(response.data.length)
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRefresher((prev) => !prev);
  };

  const handleBlockTrainer = (trainerId) => {
    setTrainerIdToConfirm(trainerId);
    setConfirmedAction("block");
    setIsConfirmationVisible(true);
  };

  const handleUnBlockTrainer = (trainerId) => {
    setTrainerIdToConfirm(trainerId);
    setConfirmedAction("unblock");
    setIsConfirmationVisible(true);
  };

  const handleConfirmation = async () => {
    try {
      if (confirmedAction === "block") {
        await blockTrainer({ trainerIdToConfirm });
        toast.success("trainer blocked");
      } else if (confirmedAction === "unblock") {
        await unblockTrainer({ trainerIdToConfirm });
        toast.success("trainer unblocked successfully");
      }
      setRefresher((prev) => !prev);
    } catch (err) {
      console.error(
        `Error ${
          confirmedAction === "block" ? "blocking" : "unblocking"
        } trainer:`,
        err
      );
      // Show an error toast
      toast.error(
        `An error occurred while ${
          confirmedAction === "block" ? "blocking" : "unblocking"
        } the trainer.`
      );
    }
    setTrainerIdToConfirm(null);
    setConfirmedAction(null);
    setIsConfirmationVisible(false);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredTrainers.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Trainer List</h2>

        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Add Trainer
        </button>
      </div>
      <div className=" mb-5 w-full md:text-center text-centet lg:text-left ">
        <input
          type="text"
          className="h-7  rounded-lg p-2 bg-gray-400 w-80 text-gray-600 placeholder:text-white"
          placeholder="enter trainer name or email to search...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <button className="bg-red-700 text-sm h-7  rounded-lg ml-1 p-1 text-white">search</button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Experience</th>
              <th className="py-2 px-4">Specialization</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((trainer, index) => (
              <tr
                key={trainer._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-4 text-center">{trainer.name}</td>
                <td className="py-2 px-4 text-center">{trainer.email}</td>
                <td className="py-2 px-4 text-center">{trainer.experience}</td>
                <td className="py-2 px-4 text-center">{trainer.specialties}</td>
                <td className="py-2 px-4 text-center">
                  {" "}
                  {trainer.blocked ? (
                    <button
                      onClick={() => handleUnBlockTrainer(trainer._id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlockTrainer(trainer._id)}
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
        {length > postsPerPage ? (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastPost >= actualData.length}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
      <AddTrainerModal isOpen={isModalOpen} onRequestClose={closeModal} />
      {isConfirmationVisible && (
        <ConfirmationDialog
          message={`Are you sure you want to ${
            confirmedAction === "block" ? "block" : "unblock"
          } this user?`}
          onConfirm={handleConfirmation}
          onCancel={() => setIsConfirmationVisible(false)}
        />
      )}
    </div>
  );
};

export default TrainersList;
