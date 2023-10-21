import React from "react";

const ImageDescriptionComponent = ({ imageUrl, description }) => {
  return (
    <div className="w-80 h-auto mb-4 flex flex-col items-center">
      <img src={imageUrl} alt="Transformation" className="w-full object-cover mb-2 rounded-lg" />
      <p className="text-gray-700 text-sm text-center">{description}</p>
    </div>
  );
};

export default ImageDescriptionComponent;
