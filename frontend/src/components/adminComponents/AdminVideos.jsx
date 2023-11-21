import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetAdminVideosMutation } from "../../slices/adminApiSlice";
import "../../css/table.css";

import { useApproveVideoMutation } from "../../slices/adminApiSlice";
import { useRejectVideoMutation } from "../../slices/adminApiSlice";

const AdminVideos = () => {
  const [postVideos, setPostVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(3); // Number of videos to display per page
  const [refresher, setRefresher] = useState(Date.now());
  const [searchTerm, setSearchTerm] = useState("");
  const [length, setLength] = useState(0);
  const [approveVideo] = useApproveVideoMutation();
  const [rejectVideo] = useRejectVideoMutation();

  const [getAdminVideos] = useGetAdminVideosMutation();
  useEffect(() => {
    fetchVideoData();
  }, [refresher]);

  const filteredVideos = postVideos
    .filter((trainer) =>
      trainer.trainerName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .flatMap((trainer) =>
      trainer.videos.map((video) => ({
        ...video,
        trainerId: trainer.trainer,
        trainerName: trainer.trainerName,
      }))
    );

  useEffect(() => {
    setLength(filteredVideos.length);
  }, [filteredVideos]);

  const fetchVideoData = async () => {
    try {
      const response = await getAdminVideos();
      setPostVideos(response.data.postVideos);
    } catch (error) {
      console.error("Error fetching video data", error);
      toast.error("Error fetching video data");
    }
  };

  const handleApprove = async (trainerId, videoId) => {
    try {
      // Call the approveVideo mutation
      await approveVideo({ trainerId, videoId }).then(() => {
        toast.success("video approved");
        setRefresher(Date.now());
      });
    } catch (error) {
      console.error("Error approving video:", error);
    }
  };

  const handleReject = async (trainerId, videoId) => {
    try {
      // Call the rejectVideo mutation
      await rejectVideo({ trainerId, videoId }).then(() => {
        toast.error("video rejected");
        setRefresher(Date.now());
      });
    } catch (error) {
      console.error("Error rejecting video:", error);
    }
  };

  // Get current videos based on current page
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg overflow-x-auto mb-20">
      <div className=" mb-5 w-full md:text-center text-centet lg:text-left ">
        <input
          type="text"
          className="h-7  rounded-lg p-2 bg-gray-400 w-80 text-gray-600 placeholder:text-white"
          placeholder="enter trainer name to search...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded shadow-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4">VIDEO</th>
            <th
              className="py-2 px-4"
              style={{
                maxWidth: "130px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              DESCRIPTION
            </th>
            <th className="py-2 px-4">TRAINER</th>
            <th className="py-2 px-4">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentVideos.map((video) => (
            <tr key={video._id} className="bg-white">
              <td className="py-2 px-4 text-center">
                <video width="1100" height="800" controls>
                  <source src={video.signedUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </td>
              <td className="py-2 px-4 text-center">{video.description}</td>
              <td className="py-2 px-4 text-center">{video.trainerName}</td>
              <td className="py-2 px-4 text-center flex flex-col items-center justify-center">
                {video.status === "pending" && (
                  <div className="flex items-center">
                    <button
                      className="bg-green-800 text-white rounded px-3 py-1"
                      onClick={() => handleApprove(video.trainerId, video._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-900 text-white rounded px-3 py-1 ml-2"
                      onClick={() => handleReject(video.trainerId, video._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
                {video.status === "approved" && (
                  <button
                    className="bg-green-800 text-white rounded px-3 py-1 mt-2"
                    disabled
                  >
                    Approved
                  </button>
                )}
                {video.status === "rejected" && (
                  <button
                    className="bg-red-900 text-white rounded px-3 py-1 mt-2"
                    disabled
                  >
                    Rejected
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {length > videosPerPage ? (
        <div className="mt-4 flex justify-center">
          {Array.from(
            { length: Math.ceil(filteredVideos.length / videosPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AdminVideos;
