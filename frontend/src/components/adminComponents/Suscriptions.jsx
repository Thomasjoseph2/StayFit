import React, { useState, useEffect } from "react";
import { useGetSubscriptionsMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresher, setRefresher] = useState("");

  const [getSubscriptions]=useGetSubscriptionsMutation();

  useEffect(()=>{
    fetchSubscriptionData();
    setRefresher(false)
  },[refresher])

  const fetchSubscriptionData=async ()=>{
    try {
        const response=await getSubscriptions().unwrap()

        setSubscriptions(response)
       
    } catch (error) {
        console.log(error);
        toast.error('something went wrong')

    }
  }


  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Subscriptions</h2>
        <button
         
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
              <th className="py-2 px-4">UserId</th>
              <th className="py-2 px-4">User Name</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions?.map((subscription, index) => (
              <tr key={subscription._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="py-2 px-4 text-center">{subscription?.subscribed_plan} </td>
                <td className="py-2 px-4 text-center">₹{subscription?.amount}</td>
                <td className="py-2 px-4 text-center">{subscription?.user_id}</td>
                <td className="py-2 px-4 text-center">{subscription?.user_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscriptions;
