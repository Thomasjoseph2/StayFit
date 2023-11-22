import React, { useEffect, useState } from 'react';
import image from '../../assets/banners.jpeg';
import WorkoutCard from './WorkoutCard';
import { useGetUserDietsMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserBody = () => {
  const [diets, setDiets] = useState([]);
  const [getDiets] = useGetUserDietsMutation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getDiets().unwrap();
      setDiets(response.postDiets.slice(0, 4));
      console.log(response);
    } catch (error) {
      console.error(`Error fetching diet data`, error);
      toast.error(`Error fetching dietdata`);
    }
  };

  const quoteStyle = {
    position: 'absolute',
    left: '5%',
    top: '70%',
    color: 'white',
    fontSize: '15px',
    textAlign: 'left',
  };

  return (
    <div className="object-cover h-fit w-fit max-w-full flex flex-col items-center bg-black ">
      <img
        src={image}
        alt="Description of the image"
        className="object-cover  w-full h-[100vh]"
      />
      <div style={quoteStyle}>
        <h3 className='text-red-700 text-4xl'>It's <span className='text-white'>All About</span> Staying Fit</h3>
        <p>
          If <span className='text-red-700'>you want something</span>  you've <span className='text-red-700'>never had</span>, <br /> you must be <span className='text-red-700'>willing to do something </span> you've never done.
        </p>
        <p>
          “The body <span className='text-red-700'>achieves</span> what the <span className='text-red-700'>mind believes</span>”.
        </p>
      </div>
      <div className="flex flex-wrap p-4 w-full container">
        {diets.map((trainer) =>
          trainer.diets.map(
            (diet, index) =>
              diet.status === 'approved' && (
                <div
                  key={diet._id}
                  className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 p-2 "
                >
                  <WorkoutCard
                    key={index}
                    image={diet.signedUrl}
                    dietType={diet.dietType}
                    category={diet.category}
                    trainer={trainer.trainerName}
                    description={diet.description}
                  />
                </div>
              )
          )
        )}
      </div>
    </div>
  );
};

export default UserBody;
