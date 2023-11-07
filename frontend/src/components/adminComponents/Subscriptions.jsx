import React, { useState, useEffect } from "react";
import AddPlanModal from "./AddplanModal";
import { useGetAdminPlansMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresher, setRefresher] = useState("");

  const [getPlans]=useGetAdminPlansMutation();

  useEffect(()=>{
    fetchPlanData();
    setRefresher(false)
  },[refresher])

  const fetchPlanData=async ()=>{
    try {
        const response=await getPlans().unwrap()

         setPlans(response)
       
    } catch (error) {
        console.log(error);
        toast.error('something went wrong')

    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setRefresher("changed");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Subscription Plans</h2>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Add new Plan
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4">Plan</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Duration</th>
              <th className="py-2 px-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {plans?.map((plan, index) => (
              <tr key={plan._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="py-2 px-4 text-center">{plan?.plan} {plan?.lastName}</td>
                <td className="py-2 px-4 text-center">₹{plan?.price}</td>
                <td className="py-2 px-4 text-center">{plan?.duration}</td>
                <td className="py-2 px-4 text-center">{plan?.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddPlanModal isOpen={isModalOpen} onRequestClose={closeModal} setRefresher={setRefresher} />
    </div>
  );
};

export default Subscriptions;
