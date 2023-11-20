import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetAdminDietsMutation } from "../../slices/adminApiSlice";
import "../../css/table.css";

import { useApproveDietMutation } from "../../slices/adminApiSlice";
import { useRejectDietMutation } from "../../slices/adminApiSlice";

const AdminDietView = () => {
  const [getAdminDiets] = useGetAdminDietsMutation();
  const [diets, setDiets] = useState([]);
  const [refresher, setRefresher] = useState(Date.now());
  const [searchTerm, setSearchTerm] = useState("");
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(3);
  const [approveDiet] = useApproveDietMutation();
  const [rejectDiet] = useRejectDietMutation();


  const filteredDiets = diets
    .filter((trainer) =>
      trainer.trainerName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .flatMap((trainer) =>
      trainer.diets.map((diet) => ({ ...diet, trainerId: trainer.trainer }))
    );

  useEffect(() => {
    setLength(filteredDiets.length);
  }, [filteredDiets]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchDietData();
  }, [refresher]);

  const fetchDietData = async () => {
    try {
      const response = await getAdminDiets();
      setDiets(response.data.diets);
      setLength(response.data.diets.length);
    } catch (error) {
      console.error("Error fetching diet data", error);
      toast.error("Error fetching diet data");
    }
  };

  const handleApprove = async (trainerId, dietId) => {
    try {
      // Call the approvediet mutation
      await approveDiet({ trainerId, dietId }).then(() => {
        toast.success("diet approved");
        setRefresher(Date.now());
      });
    } catch (error) {
      console.error("Error approving Diet:", error);
    }
  };

  const handleReject = async (trainerId, dietId) => {
    try {
      // Call the rejectDiet mutation
      await rejectDiet({ trainerId, dietId }).then(() => {
        toast.error("diet rejected");
        setRefresher(Date.now());
      });
    } catch (error) {
      console.error("Error rejecting diet:", error);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentDiets = filteredDiets.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg overflow-x-auto mb-20">
      <div className=" mb-5 w-full md:text-center text-centet lg:text-left ">
        <input
          type="text"
          className="h-7  rounded-lg p-2 bg-gray-400 w-80 text-gray-600 placeholder:text-white"
          placeholder="enter user name or email to search...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded shadow-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-2 px-4">Image</th>
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
          {currentDiets.map((diet) => (
            <tr key={diet._id} className="bg-white">
              <td className="py-2 px-4 text-center">
                <img className="h-fit w-56" src={diet.signedUrl} alt="" />
              </td>
              <td className="py-2 px-4 text-center">{diet.description}</td>
              <td className="py-2 px-4 text-center">{diet.trainer}</td>
              <td className="py-2 px-4 text-center flex ml-3 justify-center mt-5 ">
                {diet.status === "pending" && (
                  <>
                    <button
                      className="bg-green-800 text-white rounded px-3 py-1 "
                      onClick={() => handleApprove(diet.trainerId, diet._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-900 text-white rounded px-3 py-1 ml-2"
                      onClick={() => handleReject(diet.trainerId, diet._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {diet.status === "approved" && (
                  <>
                    <button
                      className="bg-green-800 text-white rounded px-3 py-1"
                      disabled
                    >
                      Approved
                    </button>
                  </>
                )}
                {diet.status === "rejected" && (
                  <>
                    {" "}
                    <button
                      className="bg-red-900 text-white rounded px-3 py-1"
                      disabled
                    >
                      Rejected
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {length > postsPerPage ? (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastPost >= filteredDiets.length}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default AdminDietView;
