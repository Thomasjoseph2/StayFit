import React, { useEffect, useState } from "react";
import { useGetDietsMutation } from "../../slices/trainerApiSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { ImCross } from "react-icons/im";
import { BiEdit } from "react-icons/bi";
import ConfirmationDialog from "../Confirmation";
import Shimmer from "../Shimmers/Shrimmer";
import EditDietModal from "./EditDietModal";
import { useDeleteDietMutation } from "../../slices/trainerApiSlice";
import { toast } from "react-toastify";

const ShowDiets = ({ refreshTrigger }) => {
  const { trainerInfo } = useSelector((state) => state.trainerAuth);

  const [diets, setDiets] = useState([]);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [selectedDietId, setSelectedDietId] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [refresher, setRefresher] = useState(false);
  const [isEditDietModalOpen, setEditDietModalOpen] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [trainer, setTrainer] = useState(trainerInfo._id);
  const [getDiets, { isLoading }] = useGetDietsMutation();
  const [deleteDiet] = useDeleteDietMutation();

  useEffect(() => {
    fetchData(trainerInfo._id);
  }, [refreshTrigger, trainerInfo._id, refresher]);

  const fetchData = async (trainerId) => {
    try {
      const response = await getDiets(trainerId);
      setDiets(response.data);
    } catch (error) {
      console.error("Error fetching diet data", error);
      toast.error("Error fetching diet data");
    }
  };
  const handleDeleteClick = (postId, imageName) => {
    setIsConfirmationVisible(true);
    setSelectedDietId(postId);
    setImageName(imageName);
  };

  const handleConfirmDelete = async () => {
    const trainer = trainerInfo._id;

    await deleteDiet({ selectedDietId, trainer, imageName })
      .then((response) => {
        setIsConfirmationVisible(false);
        setRefresher(true);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error deleting post", error);
        toast.error("Error deleting post");
      });
  };
  const handleCancelDelete = () => {
    setIsConfirmationVisible(false);
  };

  const handleEditDiet = (diet) => {
    setSelectedDiet(diet);
    setEditDietModalOpen(true);
  };
  return (
    <div className="container mx-auto mt-8 mb-20">
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {diets.map((diet) => (
            <div
              key={diet.dietId}
              className="bg-gray-900 p-4 rounded shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div >
                  <button
                    onClick={() =>
                      handleDeleteClick(diet.dietId, diet.imageName)
                    }
                    className="align-top text-red-900"
                  >
                    <ImCross />
                  </button>
                  <button
                    onClick={() => handleEditDiet(diet)}
                    className="align-top text-green-900 ml-2  text-xl"
                  >
                    <BiEdit />
                  </button>
                </div>
                <div>
                <button className={`rounded-full  text-white px-[2px] text-xs mb-2  ${diet.status === 'approved' ? 'bg-green-500' : 'bg-red-900'}`}>{diet.status}</button>
                </div>
              </div>
              <img
                src={diet.imageUrl}
                alt="Diet"
                className="w-full h-56 object-cover mb-4"
              />
              <p className="text-gray-300 text-xl">
                Type:
                <span className="text-xl text-green-600 ml-1">
                  {diet.dietType}
                </span>
              </p>
              <p className="text-gray-300 text-lg mt-3">
                Category:
                <span className="text-xl text-yellow-600 ml-1">
                  {diet.category}
                </span>
              </p>
              <p className="text-gray-300 text-sm mt-3"> {diet.description}</p>
            </div>
          ))}
        </div>
      )}
      {isEditDietModalOpen && (
        <EditDietModal
          isOpen={isEditDietModalOpen}
          onClose={() => setEditDietModalOpen(false)}
          setRefresher={setRefresher}
          trainer={trainer}
          dietDetails={selectedDiet}
        />
      )}

      {isConfirmationVisible && (
        <ConfirmationDialog
          message="Are you sure you want to delete this post?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ShowDiets;
