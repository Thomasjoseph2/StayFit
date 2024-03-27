import React from "react";
import { useGetVideosMutation } from "../../slices/trainerApiSlice";
import { ImCross } from "react-icons/im";
import PostDietHOC from "./PostDietHOC";
import { useDeleteVideoMutation } from "../../slices/trainerApiSlice";

const ShowVideos = ({ posts, handleDeleteClick }) => {
  return (
    <div className="container mx-auto mt-8 mb-20">
      {posts.length === 0 ? (
        <div className="text-white text-center text-2xl h-96">You haven't uploaded any videos.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {posts.map((post) => (
            <div key={post.postId} className="bg-gray-900 p-4 rounded shadow-lg">
              <div className="flex items-center justify-between mb-2">
                {post.status !== "approved" && (
                  <button
                    onClick={() => handleDeleteClick(post.postId, post.videoName)}
                    className="align-top text-red-900"
                  >
                    <ImCross />
                  </button>
                )}
                <button
                  className={`rounded-full  text-white px-[2px] text-xs ${
                    post.status === "approved" ? "bg-green-500" : "bg-red-900 "
                  }`}
                >
                  {post.status}
                </button>
              </div>

              <video controls className="w-full h-56 object-cover mb-4">
                <source src={post.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-white text-lg">{post.specification}</p>
              <p className="text-gray-300 text-sm mt-3">{post.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostDietHOC(
  ShowVideos,
  useGetVideosMutation,
  useDeleteVideoMutation,
  "Videos"
);
