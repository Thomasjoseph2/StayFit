import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetAdminDietsMutation } from "../../slices/adminApiSlice";
import "../../css/table.css";

import { useApproveDietMutation } from "../../slices/adminApiSlice";
import { useRejectDietMutation } from "../../slices/adminApiSlice";




const AdminDietView = () => {
    const [diets, setDiets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [dietsPerPage] = useState(3); // Number of Diets to display per page
    const [refresher,setRefresher]=useState('');
  
    const [approveDiet] = useApproveDietMutation();
    const [rejectDiet] = useRejectDietMutation();
  
    const [getAdminDiets] = useGetAdminDietsMutation();
    useEffect(() => {
      fetchDietData();
    }, [refresher]);
  
    const fetchDietData = async () => {
      try {
        const response = await getAdminDiets();
        setDiets(response.data.diets);
      } catch (error) {
        console.error("Error fetching diet data", error);
        toast.error("Error fetching diet data");
      }
    };
  
    const handleApprove = async (trainerId, dietId) => {
      try {
        // Call the approvediet mutation
          await approveDiet({ trainerId, dietId }).then(()=>{
          toast.success('diet approved')
          setRefresher('approved')
        })
      
      } catch (error) {
        console.error("Error approving Diet:", error);
      }
    };
  
    const handleReject = async (trainerId, dietId) => {
      try {
        // Call the rejectDiet mutation
         await rejectDiet({ trainerId, dietId }).then(()=>{
          toast.error('diet rejected')
          setRefresher('rejected')
        })
       
      } catch (error) {
        console.error("Error rejecting diet:", error);
      }
    };
  
    // Get current diets based on current page
    const indexOfLastDiet = currentPage * dietsPerPage;
    const indexOfFirstDiet = indexOfLastDiet - dietsPerPage;
    const currentDiets = diets.slice(indexOfFirstDiet, indexOfLastDiet);
  
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg overflow-x-auto mb-20">
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
          {currentDiets.map((trainer) =>
            trainer.diets.map((diet) => (
              <tr key={diet._id} className="bg-white">
                <td className="py-2 px-4 text-center">
                <img className="h-fit w-56" src={diet.signedUrl} alt="" />
                </td>
                <td className="py-2 px-4 text-center">{diet.description}</td>
                <td className="py-2 px-4 text-center">{trainer.trainerName}</td>

                <td className="py-2 px-4 text-center flex ml-3 justify-center mt-5 ">
                  {diet.status === "pending" && (
                    <>
                      <button
                        className="bg-green-800 text-white rounded px-3 py-1 "
                        onClick={() =>
                          handleApprove(trainer.trainer, diet._id)
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-900 text-white rounded px-3 py-1 ml-2"
                        onClick={() => handleReject(trainer.trainer, diet._id)}
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
            ))
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        {Array.from(
          { length: Math.ceil(diets.length / dietsPerPage) },
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
    </div>
  )
}

export default AdminDietView
