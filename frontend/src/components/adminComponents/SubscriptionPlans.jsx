import React, { useState, useEffect } from "react";
import AddPlanModal from "./AddplanModal";
import {
  useGetAdminPlansMutation,
  useUnlistPlanMutation,
  useActivatePlansMutation
} from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import ConfirmationDialog from "../Confirmation";
const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresher, setRefresher] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [confirmedAction, setConfirmedAction] = useState(null);
  const [planId, setPlanId] = useState("");
  const [getPlans] = useGetAdminPlansMutation();
  const [unlistPlan] = useUnlistPlanMutation();
  const [activatePlan]=useActivatePlansMutation();

  useEffect(() => {
    fetchPlanData();
  }, [refresher]);

  const fetchPlanData = async () => {
    try {
      const response = await getPlans().unwrap();
      setPlans(response);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRefresher((prev) => !prev);
  };

  const handleDeactivate = (planId) => {
    setPlanId(planId);
    setConfirmedAction("inactive");
    setIsConfirmationVisible(true);
  };

  const handleActivate = (planId) => {
    setPlanId(planId);
    setConfirmedAction("active");
    setIsConfirmationVisible(true);
  };

  const handleConfirmation = async () => {
    try {
      if (confirmedAction === "active") {
        await activatePlan({ planId });
        console.log('here');
        toast.success("plan activated");
      } else if (confirmedAction === "inactive") {
        await unlistPlan({ planId });
        console.log('here');
        toast.success("plan deactivated successfully");
      }
      setRefresher((prev) => !prev);
    } catch (err) {
      console.error(
        `Error ${
          confirmedAction === "activate" ? "activating" : "deactivating"
        } plan:`,
        err
      );
      // Show an error toast
      toast.error(
        `An error occurred while ${
          confirmedAction === "activate" ? "activating" : "deactivating"
        } the trainer.`
      );
    }
    setPlanId(null);
    setConfirmedAction(null);
    setIsConfirmationVisible(false);
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
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans?.map((plan, index) => (
              <tr
                key={plan._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="py-2 px-4 text-center">
                  {plan?.plan} {plan?.lastName}
                </td>
                <td className="py-2 px-4 text-center">₹{plan?.price}</td>
                <td className="py-2 px-4 text-center">
                  {plan?.duration}months
                </td>
                <td className="py-2 px-4 text-center">{plan?.description}</td>
                <td className="py-2 px-4 text-center">
                  {plan.status === "active" ? (
                    <button
                      onClick={() => {
                        handleDeactivate(plan._id);
                      }}
                      className="bg-red-700 rounded p-2 text-white text-sm"
                    >
                      Unlist
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleActivate(plan._id);
                      }}
                      className="bg-green-700 rounded p-2 text-white text-sm"
                    >
                      activate
                      <button />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddPlanModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        setRefresher={setRefresher}
      />
      {isConfirmationVisible && (
        <ConfirmationDialog
          message={`Are you sure you want to ${
            confirmedAction === "active" ? "activate" : "deactivate"
          } this plan?`}
          onConfirm={handleConfirmation}
          onCancel={() => setIsConfirmationVisible(false)}
        />
      )}
    </div>
  );
};

export default SubscriptionPlans;
