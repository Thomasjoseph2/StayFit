import React, { useEffect, useState } from "react";
import TrainerCard from "../components/userComponents/TrainerCard";
import { useGetTrainersMutation } from "../slices/usersApiSlice";
import ShimmerTrainerCard from "../components/Shimmers/ShimmerTrainerCard";
import "../css/headding.css";

const UserTrainerView = () => {
  const [getTrainers, { isLoading }] = useGetTrainersMutation();
  const [trainers, setTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getTrainers().then((response) => {
      setTrainers(response.data);
    });
  }, []);

  const filteredTrainers = trainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative h-auto mt-14 bg-black">
      {isLoading ? (
        <ShimmerTrainerCard />
      ) : (
        <div className="flex flex-wrap justify-center items-center p-20 w-full">
          <h2 className="heading text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-white mb-8 w-full text-center">
            Trainers
          </h2>
          <div className="mb-8 w-full md:text-center text-centet lg:text-left ml-7  ">
            <input
              type="text"
              className="h-7  rounded-lg p-2 bg-gray-900 w-80 text-gray-600 placeholder:text-gray-800"
              placeholder="Enter trainer name to search...."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredTrainers.length === 0 ? (
            <div className="text-white text-center text-2xl w-full h-screen">
              OOps!..No trainers found...
            </div>
          ) : (
            filteredTrainers.map((trainer) => (
              <div
                key={trainer._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2"
              >
                <TrainerCard trainer={trainer} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserTrainerView;
