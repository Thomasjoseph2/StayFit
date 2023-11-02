import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetUserDietsMutation } from "../../slices/usersApiSlice";
import Shimmer from "../Shimmers/Shrimmer";
import DietModal from "./DietModal";
import "../../css/headding.css";

const DietView = () => {
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null); 

  const [getDiet, { isLoading }] = useGetUserDietsMutation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getDiet();
      setDiets(response.data.postDiets);
      
    } catch (error) {
      console.error("Error fetching diet data", error);
      toast.error("Error fetching diet data");
    }
  };
  const openModal = (diet) => {
    setSelectedDiet(diet);
  };

  const closeModal = () => {
    setSelectedDiet(null);
  };

  return (
    <div className="container mx-auto mt-20 mb-20">
      <h2 className="heading text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-white mb-8 w-full mt-8 text-center">
       Diets
      </h2>
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className=" mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 cursor-pointer ">
          {diets.map((trainer) =>
            trainer.diets.map(
              (diet) =>
                diet.status === "approved" && (
                  <div
                    key={diet._id}
                    className="bg-gray-900 p-4 rounded shadow-lg"
                    onClick={() => openModal(diet)} 
                  >
                     <img src={diet.signedUrl} alt="Post" className="w-full h-56 object-cover mb-4" />
                     <p className="text-gray-300 text-xl">Type:<span className="text-xl text-green-600 ml-1">{diet.dietType}</span></p>
                     <p className="text-gray-300 text-lg mt-3">Category:<span className="text-xl text-yellow-600 ml-1">{diet.category}</span></p>
                     <p className="text-white mt-2 text-sm">Trainer:{trainer.trainerName}</p>
                  </div>
                )
            )
          )}
        </div>
      )}
    {selectedDiet && (
        <DietModal diet={selectedDiet} onClose={closeModal} /> // Render the modal when a diet is selected
      )}
    </div>
  );
};

export default DietView;
