import React, { useEffect, useState } from 'react';
import { useGetUserProfileMutation,useUpdateProfileMutation } from '../../slices/usersApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ImageUploadModal from './ImageUploadModal';
import EditProfileModal from './EditProfileModal';
import avatar from '../../assets/no-avatar.webp'
const UserProfile = () => {

  const [userData,setUserData]=useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileEditModal,setProfileEditModal]=useState(false)
  const [refresher,setRefresher]=useState(false)
  const [getUser]=useGetUserProfileMutation();
  const [updateUser]=useUpdateProfileMutation();
  const {userInfo}=useSelector((state)=>state.auth);

  useEffect(()=>{
    fetchData(userInfo._id);
  },[userInfo._id,refresher,userInfo.name, userInfo.email])

  const fetchData = async(userId)=>{
    try {
      const response=await getUser(userId);
      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching trainer data', error);
      toast.error('Error fetching trainer data');
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };
  const openProfileModal=()=>{
    setProfileEditModal(true)
  }

  const closeProfilemodal=()=>{
    setProfileEditModal(false)
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='bg-black container mx-auto h-screen items-center justify-center '>
         <h2 className='text-white text-center mt-24 text-2xl'>USER PROFILE</h2>
      <div className='bg-black mx-auto mt-20  flex justify-center border'>
           <div >
            {userData?.user?.imageUrl ? (<img className='h-80 ounded-full rounded-full mt-4 ' src={userData?.user?.imageUrl} alt='' />):(      
                   <img className='h-80 ounded-full rounded-full mt-4 ' src={avatar} alt='' />
)}
            <button onClick={openModal} className='bg-green-600 rounded-2xl text-white ml- mt-5 mb-16 w-full'>Change Image</button>
            <ImageUploadModal isOpen={isModalOpen} onClose={closeModal} setRefresher={setRefresher} userId={userInfo._id}/>
           </div>
          
          <div className=' p-4'>
            <form className='ml-10 mt-16 '>
              <div className='mb-4 flex mt-5'>
                <label className='text-white block mb-2 '>Name:</label>
                <span className='text-gray-300 ml-3'>{userData?.user?.name}</span>
              </div>
              <div className='mb-4 flex'>
                <label className='text-white block mb-2'>Email:</label>
                <span className='text-gray-300 ml-3'>{userData?.user?.email}</span>
              </div>
              <div className='mb-4 flex'>
                <label className='text-white block mb-2'>Subscription Status:</label>
                <span className='text-green-500 ml-3'>{userData?.user?.subscription_status}</span>
              </div>
              <div className='mb-4 flex'>
                <label className='text-white block mb-2'>Subscribed Plan:</label>
                <span className='text-blue-500 ml-3'>{userData?.user?.subscribed_plan}</span>
              </div>

              <button type="button" onClick={openProfileModal} className='bg-red-600 w-full text-white rounded-2xl '>Edit Profile</button>

            <EditProfileModal isOpen={profileEditModal} onClose={closeProfilemodal} setRefresher={setRefresher} userId={userInfo._id} currentName={userData?.user?.name} currentEmail={userData?.user?.email}/>
            </form>
          </div>
        
      </div>
    </div>
  );
};

export default UserProfile;
