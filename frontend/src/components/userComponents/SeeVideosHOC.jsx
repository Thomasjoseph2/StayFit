import React from 'react';
import { useGetUserVideosMutation } from "../../slices/usersApiSlice";
import withUserPosts from './WithUserPosts';
import Shimmer from "../Shimmers/Shrimmer";
import "../../css/headding.css";

const SeeVideos = ({ posts, isLoading, fetchData }) => {
  return (
    <div className="container mx-auto mt-20 mb-20">
      <h2 className="heading text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-white mb-8 w-full mt-8 text-center">
        Videos
      </h2>
      {isLoading ? (
        <Shimmer />
      ) : (
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
                    <p className="text-white text-lg ">{video.specification}</p>
                    <p className="text-gray-300 text-sm mt-3">{video.description}</p>
                    <p className="text-white mt-2 text-sm">Trainer:{trainer.trainerName}</p>
                  </div>
                )
            )
          )}
        </div>
      )}
    </div>
  );
};

export default withUserPosts(SeeVideos, useGetUserVideosMutation, "Videos");
