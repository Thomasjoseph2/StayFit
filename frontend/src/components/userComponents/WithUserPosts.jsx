import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../css/headding.css";

const withUserPosts = (Component, useUserPostsMutation, postType) => {
  return function WrappedComponent() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [getUserPosts, { isLoading: mutationLoading }] = useUserPostsMutation();

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await getUserPosts();
        setPosts(response.data[`post${postType}`]);
      } catch (error) {
        console.error(`Error fetching ${postType} data`, error);
        toast.error(`Error fetching ${postType} data`);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Component
        posts={posts}
        isLoading={isLoading || mutationLoading}
        fetchData={fetchData}
      />
    );
  };
};

export default withUserPosts;
