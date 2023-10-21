import React from 'react';
import TrainerCard from '../components/userComponents/TrainerCard';
import bgimg from '../assets/trainerbg.jpeg';

const UserTrainerView = () => {
  return (
    <div className='relative h-auto mt-14 bg-black'>
        
      <div className="flex flex-wrap justify-center items-center p-20 w-full">
      <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-white mb-8 w-full text-center">Trainers</h2>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <TrainerCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <TrainerCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <TrainerCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <TrainerCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <TrainerCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <TrainerCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <TrainerCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
          <TrainerCard />
        </div>

      </div>
    </div>
  );
};

export default UserTrainerView;
