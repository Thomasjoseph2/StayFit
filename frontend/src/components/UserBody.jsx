import React from 'react';
import image from '../assets/5614625.jpg'

const UserBody = () => {
  return (
    <div className="object-cover  h-fit w-full  max-w-full flex justify-center items-center ">
      <img
        src={image}
        alt="Description of the image"
        className="object-cover h-fit w-full "
      />
    </div>
  );
};

export default UserBody;