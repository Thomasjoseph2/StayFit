import React, { useEffect, useState } from 'react';
import { useGetPostsMutation } from '../../slices/trainerApiSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';



const ResultPosts = ({refreshTrigger}) => {
  // Ensure posts is an array, default to an empty array if not
  // const validPosts = Array.isArray(posts) ? posts : [];
  const { trainerInfo } = useSelector((state) => state.trainerAuth);
  

  const [posts,setPosts]=useState([])
  const [refresher,setRefresher]=('')


  const [getPosts]=useGetPostsMutation();


  useEffect(()=>{
     fetchData(trainerInfo._id)
  },[refreshTrigger,trainerInfo._id])
  const fetchData =async(trainerId)=>{

    try {

      const response=await getPosts(trainerId);
      setPosts(response.data)
      
    } catch (error) {
      console.error('Error fetching post data', error);
      toast.error('Error fetching post data');
    }
  }
    // Function to trigger data fetching when needed
    const handleRefresher = () => {
      setRefresher(Date.now()); // Update refresher state with a new value to trigger useEffect
    };

  return (
    <div className="container mx-auto mt-8 mb-20">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-900 p-4 rounded shadow-lg">
            <img src={post.imageUrl} alt="Post" className="w-full h-56 object-cover mb-4" />
            <p className="text-gray-300 text-sm">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPosts;
