import React from 'react';
import image from '../../assets/5614625.jpg';
import WorkoutCard from './WorkoutCard';

const UserBody = () => {
  return (
    <div className="object-cover h-fit w-full max-w-full flex flex-col items-center bg-black">
      <img
        src={image}
        alt="Description of the image"
        className="object-cover h-fit w-full"
      />
      <div className="flex flex-wrap justify-center p-4 w-full">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <WorkoutCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <WorkoutCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <WorkoutCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <WorkoutCard />
        </div>
      </div>
    </div>
  );
};

export default UserBody;
