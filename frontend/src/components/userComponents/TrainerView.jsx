import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import img from '../../assets/after.jpeg';
import { useParams } from "react-router-dom";
import { useGetTrainerMutation } from "../../slices/usersApiSlice";


const Trainer = () => {

  const [getTrainer]=useGetTrainerMutation();
  const [trainer,setTrainer]=useState({})
  const { trainerId } = useParams();

     useEffect(() => {
        fetchData(trainerId );
    }, [trainerId]);

    const fetchData = async (trainerId ) => {
        try {
            const response = await getTrainer(trainerId);
            setTrainer(response.data);
        } catch (error) {
            console.error('Error fetching trainer data', error);
            toast.error('Error fetching trainer data');
        }
    };

  const transformations = [
    {
      imageUrl: img,
      description: "Description for Transformation 1",
    },
    {
      imageUrl: img,
      description: "Description for Transformation 2",
    },
    // Add more transformations as needed
  ];

  return (
    <div className="trainer bg-black p-4 rounded-lg shadow-md md:w-96 lg:w-full mx-auto container">
      <img
        src={trainer?.plainTrainer?.imageUrl}
        alt="{trainer.name}"
        className="rounded-full mx-auto mb-4 w-60 h-50 mt-20"
      />
      <h3 className="text-center font-bold mb-2 text-white">{trainer?.plainTrainer?.name}</h3>
      <p className="text-center mb-4 text-white">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
      <div className="flex items-center justify-center mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Message
        </button>
      </div>
      <div className="transformation-photos grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 mt-10">
        {transformations.map((transformation, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={transformation.imageUrl}
              alt={`Before and After Photo ${index + 1}`}
              className="rounded mb-2"
            />
            <p className="text-white">{transformation.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainer;
