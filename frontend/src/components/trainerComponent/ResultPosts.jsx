import React, { useEffect, useState } from "react";
import { useGetPostsMutation } from "../../slices/trainerApiSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { ImCross } from "react-icons/im";
import ConfirmationDialog from "../Confirmation";

import { useDeletePostMutation } from "../../slices/trainerApiSlice";
import { toast } from "react-toastify";

const ResultPosts = ({ refreshTrigger }) => {
  // Ensure posts is an array, default to an empty array if not
  // const validPosts = Array.isArray(posts) ? posts : [];
  const { trainerInfo } = useSelector((state) => state.trainerAuth);

  const [posts, setPosts] = useState([]);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [refresher, setRefresher] = useState(false);
  const [getPosts] = useGetPostsMutation();

  const [deletePost] = useDeletePostMutation();

  useEffect(() => {
    fetchData(trainerInfo._id);
  }, [refreshTrigger, trainerInfo._id, refresher]);
  const fetchData = async (trainerId) => {
    try {
      const response = await getPosts(trainerId);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching post data", error);
      toast.error("Error fetching post data");
    }
  };

  const handleDeleteClick = (postId, imageName) => {
    setIsConfirmationVisible(true);
    setSelectedPostId(postId);
    setImageName(imageName);
  };

  const handleConfirmDelete = async () => {
    const trainer = trainerInfo._id;

    await deletePost({ selectedPostId, trainer, imageName })
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
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {posts.map((post) => (
          <div key={post.postId} className="bg-gray-900 p-4 rounded shadow-lg">
            <button
              onClick={() => handleDeleteClick(post.postId, post.imageName)}
              className="align-top text-red-900"
            >
              <ImCross />
            </button>
            <img
              src={post.imageUrl}
              alt="Post"
              className="w-full h-56 object-cover mb-4"
            />
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

export default ResultPosts;
