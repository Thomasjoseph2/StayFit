import React from "react";


const DietModal = ({ diet, onClose }) => {

  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-20	  bg-gray-900  mb-10 mt-24">
      <div className="modal-content modal-container bg-gray-900 w-full md:w-fit p-4 rounded-lg shadow-lg max-h-[500px] overflow-y-auto flex flex-col md:flex-row xl:w-fit z-20 mb-10">
        <div className="md:w-1/2 xl:mr-0">
          <img src={diet.signedUrl} alt="Diet" className="h-[25rem] w-[38rem] object-cover mb-4 md:mb-0" />
        </div>
        <div className="md:w-1/2 md:ml-4 xl:ml-0">
          <h2 className="text-xl font-bold mb-2 text-white">Diet</h2>
          <p className="text-green-600 mb-2">Type: {diet.dietType}</p>
          <p className="text-yellow-600 mb-4">Category: {diet.category}</p>
          <p className="text-gray-200 mb-2 ">Description: {diet.description}</p>

          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mb-10 mt-5" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DietModal;
