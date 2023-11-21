import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetProfileMutation } from "../../slices/trainerApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/trainerAuthSlice";
import ChangeImageModal from "./ChangeImageModal";
import EditTrainerModal from "./EditTrainer";

const TrainerProfile = () => {
  const [trainerData, setTrainerData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileEditModal, setProfileEditModal] = useState(false);
  const [refresher, setRefresher] = useState(Date.now());

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [getUser] = useGetProfileMutation();
  const { trainerInfo } = useSelector((state) => state.trainerAuth);

  useEffect(() => {
    fetchData(trainerInfo._id);
  }, [trainerInfo._id, refresher]);

  const fetchData = async (trainerId) => {
    try {
      const response = await getUser(trainerId);
      setTrainerData(response.data);
      if (response?.error?.status === 401) {
        toast.error("you are not authorized to access the page");
        dispatch(logout());
        navigate("/trainer/login");
      }
    } catch (error) {
      console.error("Error fetching trainer data", error);
      toast.error("Error fetching trainer data");
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openProfileModal = () => {
    setProfileEditModal(true);
  };

  const closeProfilemodal = () => {
    setProfileEditModal(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white  ">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full mt-24 mb-7">
        <img
          onClick={openModal}
          src={trainerData?.plainTrainer?.imageUrl}
          alt="Profile"
          className="w-50 h-60 mx-auto rounded-full mb-6 cursor-pointer"
        />
        <ChangeImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          setRefresher={setRefresher}
          trainerId={trainerInfo._id}
        />
        <h2 className="text-2xl font-semibold text-center mb-2">
          {trainerData?.plainTrainer?.name}
        </h2>
        <p className="text-sm text-center mb-4">
          {trainerData?.plainTrainer?.email}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div className="text-center">
            <p className="font-semibold">Phone Number:</p>
            <p>{trainerData?.plainTrainer?.phone}</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Qualification:</p>
            <p>{trainerData?.plainTrainer?.qualifications}</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Experience:</p>
            <p>{trainerData?.plainTrainer?.experience}</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">Specialties:</p>
            <p>{trainerData?.plainTrainer?.specialties}</p>
          </div>
        </div>

        <div className="text-center ">
          <p className="font-semibold">Description:</p>
          <p>{trainerData?.plainTrainer?.description}</p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={openProfileModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Edit Profile
          </button>
          <EditTrainerModal
            isOpen={profileEditModal}
            onClose={closeProfilemodal}
            setRefresher={setRefresher}
            trainerDetails={trainerData.plainTrainer}
          />
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
