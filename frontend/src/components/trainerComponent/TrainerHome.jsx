import React from 'react';
import image from '../../assets/banners.jpeg';

const TrainerHome= () => {

  return (
    <div className="object-cover h-fit w-fit max-w-full flex flex-col items-center bg-black">
          <img
        src={image}
        alt="Description of the image"
        className="object-cover h-fit w-full"
      />
    
    </div>
  );
};

export default TrainerHome;
