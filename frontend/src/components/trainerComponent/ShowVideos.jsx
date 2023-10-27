import React, { useEffect, useState } from 'react';
import { useGetVideosMutation } from '../../slices/trainerApiSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { toast } from "react-toastify";
const ShowVideos = ({ refreshTrigger }) => {
  const { trainerInfo } = useSelector((state) => state.trainerAuth);
  const [posts, setPosts] = useState([]);

  const [getVideos] = useGetVideosMutation();

  useEffect(() => {
    fetchData(trainerInfo._id);
  }, [refreshTrigger, trainerInfo._id]);

  const fetchData = async (trainerId) => {
    try {
      const response = await getVideos(trainerId);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching video data', error);
      toast.error('Error fetching video data');
    }
  };

  return (
    <div className="container mx-auto mt-8 mb-20">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {posts.map((post) => (
          <div key={post.postId} className="bg-gray-900 p-4 rounded shadow-lg">
            <video controls className="w-full h-56 object-cover mb-4">
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-gray-300 text-sm">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowVideos;
