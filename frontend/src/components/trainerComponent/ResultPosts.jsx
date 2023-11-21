import React, { useEffect, useState } from "react";
import { useGetPostsMutation } from "../../slices/trainerApiSlice";
import { useSelector,useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/trainerAuthSlice";
import ConfirmationDialog from "../Confirmation";
import ShimmerTrainerCard from "../Shimmers/ShimmerTrainerCard";

import { useDeletePostMutation } from "../../slices/trainerApiSlice";
import { toast } from "react-toastify";

const ResultPosts = ({ refreshTrigger }) => {
  const { trainerInfo } = useSelector((state) => state.trainerAuth);

  const [posts, setPosts] = useState([]);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [refresher, setRefresher] = useState(Date.now());
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [getPosts, { isLoading }] = useGetPostsMutation();

  const [deletePost] = useDeletePostMutation();

  useEffect(() => {
    fetchData(trainerInfo._id);
  }, [refreshTrigger, trainerInfo._id, refresher]);
  const fetchData = async (trainerId) => {
    try {
      const response = await getPosts(trainerId);
      setPosts(response.data);
      console.log(response,'response');
      console.log(response?.error?.status);
      if (response?.error?.status === 401) {
        toast.error("you are not authorized to access the page");
        dispatch(logout());
        navigate("/trainer/login");
      }
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
        setRefresher(Date.now());
        toast.success("post deleted successfully");
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
      {isLoading ? (
        <ShimmerTrainerCard />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {posts.map((post) => (
            <div
              key={post.postId}
              className="bg-gray-900 p-4 rounded shadow-lg"
            >
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
      )}

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
