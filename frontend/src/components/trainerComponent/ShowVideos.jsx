import React, { useEffect, useState } from "react";
import { useGetVideosMutation } from "../../slices/trainerApiSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import ConfirmationDialog from "../Confirmation";

import { useDeleteVideoMutation } from "../../slices/trainerApiSlice";

const ShowVideos = ({ refreshTrigger }) => {
  const { trainerInfo } = useSelector((state) => state.trainerAuth);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [videoName, setVideoName] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [refresher,setRefresher]=useState(false)

  const [getVideos, { isLoading }] = useGetVideosMutation();
  const [deleteVideos] = useDeleteVideoMutation();

  useEffect(() => {
    fetchData(trainerInfo._id);
  }, [refreshTrigger, trainerInfo._id,refresher]);

  const fetchData = async (trainerId) => {
    try {
      const response = await getVideos(trainerId);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching video data", error);
      toast.error("Error fetching video data");
    }
  };
  const handleDeleteClick = (postId, videoName) => {
    setIsConfirmationVisible(true);
    setVideoName(videoName);
    setPostId(postId);
  };
  const handleConfirmDelete = async () => {
    const trainer = trainerInfo._id;

    await deleteVideos({ postId, trainer, videoName })
      .then((response) => {
        setIsConfirmationVisible(false);
        setRefresher(true);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error deleting post", error);
        toast.error("Error deleting post");
      });
  };
  const handleCancelDelete = () => {
    setIsConfirmationVisible(false);
  };
  return (
    <div className="container mx-auto mt-8 mb-20">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {posts.map((post) => (
          <div key={post.postId} className="bg-gray-900 p-4 rounded shadow-lg">
            <button
              onClick={() => handleDeleteClick(post.postId, post.videoName)}
              className="align-top text-red-900"
            >
              <ImCross />
            </button>
            <video controls className="w-full h-56 object-cover mb-4">
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-gray-300 text-sm">{post.description}</p>
          </div>
        ))}
      </div>
      {isConfirmationVisible && (
        <ConfirmationDialog
          message="Are you sure you want to delete this post?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default ShowVideos;
