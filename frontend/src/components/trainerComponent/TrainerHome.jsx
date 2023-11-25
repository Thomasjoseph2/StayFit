import React from 'react';
import image from '../../assets/banners.jpeg';

const TrainerHome = () => {


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
    </div>
  );
};

export default TrainerHome;
