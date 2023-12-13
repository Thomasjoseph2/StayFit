import React, { useState,useEffect } from "react";
import { useGetDietsMutation } from "../../slices/trainerApiSlice";
import { ImCross } from "react-icons/im";
import PostDietHOC from "./PostDietHOC";
import { useDeleteDietMutation } from "../../slices/trainerApiSlice";
import EditDietModal from "./EditDietModal";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux/es/hooks/useSelector";

const ViewTrainerDiets = ({ posts, handleDeleteClick,setRefresher }) => {
  const { trainerInfo } = useSelector((state) => state.trainerAuth);
  const [trainer, setTrainer] = useState(trainerInfo._id);
  const [isEditDietModalOpen, setEditDietModalOpen] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState(null);

  const handleEditDiet = (diet) => {
    setSelectedDiet(diet);
    setEditDietModalOpen(true);
  };


  return (
    <div className="container mx-auto mt-8 mb-20">
            {posts.length === 0 ? (
        <div className="text-white text-center text-2xl h-screen ">You haven't uploaded any Diets...</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {posts.map((diet) => (
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
          trainer={trainer}
          setRefresher={setRefresher}
          dietDetails={selectedDiet}
        />
      )}
    </div>
  );
};

export default PostDietHOC(
    ViewTrainerDiets,
    useGetDietsMutation,
    useDeleteDietMutation,
  "Diets"
);
