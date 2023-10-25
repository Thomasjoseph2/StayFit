import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetAdminVideosMutation } from "../../slices/adminApiSlice";
import '../../css/table.css'

import { useApproveVideoMutation } from "../../slices/adminApiSlice";
import { useRejectVideoMutation } from "../../slices/adminApiSlice";

const AdminVideos = () => {
  const [postVideos, setPostVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(3); // Number of videos to display per page

  const [approveVideo]=useApproveVideoMutation();
  const [rejectVideo]=useRejectVideoMutation();

  const [getAdminVideos] = useGetAdminVideosMutation();
  useEffect(() => {
    fetchVideoData();
  }, []);

  const fetchVideoData = async () => {
    try {
      const response = await getAdminVideos();
      setPostVideos(response.data.postVideos);
      console.log(response.data.postVideos,'logged');
    } catch (error) {
      console.error("Error fetching video data", error);
      toast.error("Error fetching video data");
    }
  };

  const handleApprove = async (trainerId, videoId) => {
    try {
      // Call the approveVideo mutation
      const response = await approveVideo({ trainerId, videoId });
      console.log("Video approved:", response);
    } catch (error) {
      console.error("Error approving video:", error);
    }
  };
  
  const handleReject = async (trainerId, videoId) => {
    try {
      // Call the rejectVideo mutation
      const response = await rejectVideo({ trainerId, videoId });
      console.log("Video rejected:", response);
    } catch (error) {
      console.error("Error rejecting video:", error);
    }
  };
  
  // Get current videos based on current page
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = postVideos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg overflow-x-auto mb-20">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4">VIDEO</th>
            <th className="py-2 px-4" style={{ maxWidth: "130px", overflow: "hidden", textOverflow: "ellipsis" }}>
              DESCRIPTION
            </th>
            <th className="py-2 px-4">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentVideos.map((trainer) => (
            trainer.videos.map((video) => (
              <tr key={video._id} className="bg-white">
                <td className="py-2 px-4 text-center">
                  <video width="350" height="200" controls>
                    <source
                      src={video.signedUrl}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </td>
                <td className="py-2 px-4 text-center">{video.description}</td>
                <td className="py-2 px-4 text-center flex ml-3">
                  <button className="bg-green-800 text-white rounded px-3 py-1" onClick={() => handleApprove(trainer._id, video._id)}>
                    Approve
                  </button>
                  <button className="bg-red-900 text-white rounded px-3 py-1 ml-2" onClick={() => handleReject(trainer._id, video._id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(postVideos.length / videosPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminVideos;
