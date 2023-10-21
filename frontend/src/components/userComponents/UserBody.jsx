import React from 'react';
import image from '../../assets/banners.jpeg';
import WorkoutCard from './WorkoutCard';

const UserBody = () => {
  const quoteStyle = {
    position: 'absolute',
    left: '5%', // adjust the left position as needed
    top: '70%', // adjust the top position as needed
    color: 'white',
    fontSize: '15px', // adjust the font size as needed
    textAlign: 'left',
  };
  return (
    <div className="object-cover h-fit w-fit max-w-full flex flex-col items-center bg-black">
          <img
        src={image}
        alt="Description of the image"
        className="object-cover h-fit w-full"
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
      <div className="flex flex-wrap justify-center p-20 w-full">
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
