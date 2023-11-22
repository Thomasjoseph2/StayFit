import React, { useState } from "react";
import { useGetUserDietsMutation } from "../../slices/usersApiSlice";
import withUserPosts from "./WithUserPosts";
import Shimmer from "../Shimmers/Shrimmer";
import DietModal from "./DietModal";
import "../../css/headding.css";

const SeeDietsHOC = ({ posts, isLoading, fetchData }) => {
  const [selectedDiet, setSelectedDiet] = useState(null);

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
        <div className=" mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {posts.map((trainer) =>
            trainer.diets.map(
              (diet) =>
                diet.status === "approved" && (
                  <div
                    key={diet._id}
                    className="bg-gray-900 p-4 rounded shadow-lg"
                    onClick={() => openModal(diet)}
                  >
                    <img
                      src={diet.signedUrl}
                      alt="Post"
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
                    <p className="text-white mt-2 text-sm">
                      Trainer:{trainer.trainerName}
                    </p>
                  </div>
                )
            )
          )}
        </div>
      )}
      {selectedDiet && <DietModal diet={selectedDiet} onClose={closeModal} />}
    </div>
  );
};

export default withUserPosts(SeeDietsHOC, useGetUserDietsMutation, "Diets");
