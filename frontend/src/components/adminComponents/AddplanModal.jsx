import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAddPlansMutation } from "../../slices/adminApiSlice";

const AddPlanModal = ({ isOpen, onRequestClose ,setRefresher}) => {
  const [plan, setPlan] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const [planError, setPlanError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [AddPlans] = useAddPlansMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    // Validation logic
    let isValid = true;
    if (!plan) {
      setPlanError("Plan is required.");
      isValid = false;
    }

    if (!price) {
      setPriceError("Price is required.");
      isValid = false;
    }

    if (!duration) {
      setDurationError("Duration is required.");
      isValid = false;
    }

    if (!description) {
      setDescriptionError("Description is required.");
      isValid = false;
    }

    if (parseFloat(price) < 0) {
      setPriceError("Price cannot be negative.");
      isValid = false;
    }
    if (isValid) {
      try {
        const formData = {
          plan,
          price,
          duration,
          description,
        };

        // Make API call to add plan

       const response= await AddPlans(formData).unwrap();
       
   
        setPlan("");
        setPrice("");
        setDuration("");
        setDescription("");

        onRequestClose();

        if (response.success === true) {
          toast.success("Plan added successfully!");
          setRefresher(true); 
        } else {
          toast.error("Plan adding failed!");
        }
       
        
      } catch (err) {
        // Handle API errors
        const apiError = err?.data?.message || err?.error;
        toast.error(apiError);
      }
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-gray-800 text-white mx-auto p-8 rounded-lg z-50">
            <h2 className="text-2xl mb-4">Add Plan</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4 flex">
                <div className="w-1/2 mr-4">
                  <label className="block text-sm font-bold mb-1">Plan</label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 ${
                      planError ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Plan"
                    value={plan}
                    onChange={(e) => {
                      setPlan(e.target.value);
                      setPlanError("");
                    }}
                  />
                  {planError && (
                    <p className="text-red-500 text-xs italic">{planError}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-bold mb-1">Price</label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 ${
                      priceError ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setPriceError("");
                    }}
                  />
                  {priceError && (
                    <p className="text-red-500 text-xs italic">{priceError}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">
                  Duration
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 ${
                    durationError ? "border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                {durationError && (
                  <p className="text-red-500 text-xs italic">{durationError}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">
                  Description
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-black bg-gray-700 ${
                    descriptionError ? "border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {descriptionError && (
                  <p className="text-red-500 text-xs italic">
                    {descriptionError}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-4"
                  type="button"
                  onClick={onRequestClose}
                >
                  Close
                </button>
                <button
                  className="text-white bg-blue-500 active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                  type="submit"
                >
                  Add Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddPlanModal;
