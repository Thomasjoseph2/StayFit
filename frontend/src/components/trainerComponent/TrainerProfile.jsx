import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetProfileMutation } from '../../slices/trainerApiSlice';
import { useSelector } from 'react-redux';

const TrainerProfile = () => {
    const [trainerData, setTrainerData] = useState({});
    const [getUser] = useGetProfileMutation();
    const { trainerInfo } = useSelector((state) => state.trainerAuth);

    useEffect(() => {
        fetchData(trainerInfo._id);
    }, [trainerInfo._id]);

    const fetchData = async (trainerId) => {
        try {
            const response = await getUser(trainerId);
            setTrainerData(response.data);
        } catch (error) {
            console.error('Error fetching trainer data', error);
            toast.error('Error fetching trainer data');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white ">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full mt-24">
                <img
                    src={trainerData?.plainTrainer?.imageUrl}
                    alt="Profile"
                    className="w-50 h-60 mx-auto rounded-full mb-6"
                />

                <h2 className="text-2xl font-semibold text-center mb-2">
                    {trainerData?.plainTrainer?.firstName} {trainerData?.plainTrainer?.lastName}
                </h2>
                <p className="text-sm text-center mb-4">{trainerData?.plainTrainer?.email}</p>

                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div className='text-center'>
                        <p className="font-semibold">Phone Number:</p>
                        <p>{trainerData?.plainTrainer?.phone}</p>
                    </div>
                    <div className='text-center'>
                        <p className="font-semibold">Qualification:</p>
                        <p>{trainerData?.plainTrainer?.qualifications}</p>
                    </div>
                    <div className='text-center'>
                        <p className="font-semibold">Experience:</p>
                        <p>{trainerData?.plainTrainer?.experience}</p>
                    </div>
                    <div className='text-center'>
                        <p className="font-semibold">Specialties:</p>
                        <p>{trainerData?.plainTrainer?.specialties}</p>
                    </div>
                </div>

                <div className="flex justify-center space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                        Edit Profile
                    </button>
                
                </div>
            </div>
        </div>
    );
};

export default TrainerProfile;
