import React, { useState } from 'react';
import { useAddProfileImageMutation } from '../../slices/usersApiSlice';
import { toast } from "react-toastify";



const ImageUploadModal = ({ isOpen, onClose ,setRefresher,userId}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [addProfileImage,{isLoading}]=useAddProfileImageMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };


  const handleSubmit =async (e) => {
    e.preventDefault();
if(selectedImage){
    try {
        const formData=new FormData();
        formData.append("profileImage",selectedImage)
        formData.append("userId",userId);

        await addProfileImage(formData).unwrap().then(()=>{
        toast.success("post added successfully")
        setRefresher(Date.now())
        onClose();
        })
        
        setSelectedImage(null)
    } catch (error) {
        console.error("Error adding post:", error);
        toast.error('profile image adding failed')
    }
}


  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='modal-overlay fixed inset-0 bg-black opacity-50'></div>
      <div className='modal-container bg-gray-900 w-96 p-6 rounded-lg shadow-lg z-50'>
        <h2 className='text-2xl mb-4 text-white'>Upload Profile Image</h2>
        {isLoading ? (
          // Loading indicator
          <div className="flex items-center justify-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className='space-y-4 text-white'>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='border p-2 w-full'
          />
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Upload
          </button>
          <button
            type='button'
            onClick={onClose}
            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-3'
          >
            Cancel
          </button>
        </form>
        )}
      </div>
    </div>
  );
};

export default ImageUploadModal;
