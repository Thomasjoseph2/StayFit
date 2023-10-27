import React, { useEffect, useState } from "react";
import { useGetUserVideosMutation } from "../../slices/usersApiSlice";

import { toast } from "react-toastify";
import "../../css/headding.css";
const SeeVideos = () => {
  const [posts, setPosts] = useState([]);

  const [getUserVideos, { isLoading }] = useGetUserVideosMutation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getUserVideos();
      setPosts(response.data.postVideos);

      console.log(posts, "posts");
    } catch (error) {
      console.error("Error fetching video data", error);
      toast.error("Error fetching video data");
    }
  };

  return (
    <div className="container mx-auto mt-20 mb-20">
      <h2 className="heading text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-white mb-8 w-full mt-8 text-center">
        Videos
      </h2>
      <div className=" mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {posts.map((trainer) =>
          trainer.videos.map(
            (video) =>
              video.status === "approved" && (
                <div
                  key={video._id}
                  className="bg-gray-900 p-4 rounded shadow-lg"
                >
                  <video controls className="w-full h-56 object-cover mb-4">
                    <source src={video.signedUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p className="text-gray-300 text-sm">{video.description}</p>
                </div>
              )
          )
        )}
      </div>
    </div>
  );
};

export default SeeVideos;
