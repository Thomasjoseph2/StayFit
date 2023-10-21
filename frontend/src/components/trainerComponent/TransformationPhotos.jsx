import React, { useState } from 'react';

const TransformationPhotos = () => {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);

  const handleBeforeImageChange = (e) => {
    // Handle before image upload logic here
    // Update state with the selected before image
  };

  const handleAfterImageChange = (e) => {
    // Handle after image upload logic here
    // Update state with the selected after image
  };

  const handleSubmit = () => {
    // Handle image upload to the server and any additional logic
  };

  return (
    <div className="mt-6">
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Before Transformation</label>
        <input type="file" onChange={handleBeforeImageChange} />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">After Transformation</label>
        <input type="file" onChange={handleAfterImageChange} />
      </div>
      <button onClick={handleSubmit} className="px-4 py-2 bg-white text-black rounded-lg">
        Upload Photos
      </button>
    </div>
  );
};

export default TransformationPhotos;
