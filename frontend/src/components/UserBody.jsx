import React from 'react';
import image from '../assets/5614625.jpg';
import WorkoutCard from './WorkoutCard';

const UserBody = () => {
  return (
    <div className="object-cover h-fit w-full max-w-full flex flex-col items-center">
      <img
        src={image}
        alt="Description of the image"
        className="object-cover h-fit w-full"
      />
      <div className="flex flex-wrap justify-center p-4 bg-black w-full">
        <div className="w-1/4 p-2">
          <WorkoutCard />
        </div>
        <div className="w-1/4 p-2">
          <WorkoutCard />
        </div>
        <div className="w-1/4 p-2">
          <WorkoutCard />
        </div>
        <div className="w-1/4 p-2">
          <WorkoutCard />
        </div>
      </div>
    </div>
  );
};

export default UserBody;
