import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "../Confirmation";
import Shimmer from "../Shimmers/Shrimmer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/trainerAuthSlice";
const PostDietHOC = (
  Component,
  usePostsMutation,
  useDeletePostMutation,
  postType
) => {
  return function WrappedComponent({ refreshTrigger }) {
    const { trainerInfo } = useSelector((state) => state.trainerAuth);
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState(null);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const [refresher, setRefresher] = useState(Date.now());
    const [name, setName] = useState("");
    const [getPosts, { isLoading }] = usePostsMutation();
    const [deletePost] = useDeletePostMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      fetchData(trainerInfo._id);
    }, [refreshTrigger, trainerInfo._id, refresher]);

    const fetchData = async (trainerId) => {
      try {
        const response = await getPosts(trainerId);
        setPosts(response.data);
          if (response?.error?.status === 401) {
            dispatch(logout());
            navigate("/trainer/login");
            toast.error("you are not authorized to access the page");

          }
        
      } catch (error) {
        console.error(`Error fetching ${postType} data`, error);
        toast.error(`Error fetching ${postType} data`);
      }
    };

    const handleDeleteClick = (postId, name) => {
      setIsConfirmationVisible(true);
      setName(name);
      setPostId(postId);
    };

    const handleConfirmDelete = async () => {
      const trainer = trainerInfo._id;

      await deletePost({ postId, trainer, name })
        .then((response) => {
          setIsConfirmationVisible(false);
          setRefresher(Date.now());
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
        {isLoading ? (
          <Shimmer />
        ) : (
          <Component
            posts={posts}
            handleDeleteClick={handleDeleteClick}
            setRefresher={setRefresher}
          />
        )}
        {isConfirmationVisible && (
          <ConfirmationDialog
            message={`Are you sure you want to delete this ${postType}?`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    );
  };
};

export default PostDietHOC;
