import React, { useState, useEffect } from "react";
import { useUpdateDietMutation } from "../../slices/trainerApiSlice";
import { toast } from "react-toastify";

const EditDietModal = ({
  isOpen,
  onClose,
  setRefresher,
  trainer,
  dietDetails,
}) => {
  const [category, setCategory] = useState("");
  const [dietType, setDietType] = useState("");
  const [description, setDescription] = useState("");

  const [updateDiet] = useUpdateDietMutation();

  console.log(dietDetails);

  useEffect(() => {
    if (dietDetails) {
      setCategory(dietDetails.category);
      setDietType(dietDetails.dietType);
      setDescription(dietDetails.description);
    }
  }, [dietDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateDiet({
        trainer: trainer,
        dietId: dietDetails.dietId,
        category: category,
        dietType: dietType,
        description: description,
      });

      if (response.data.response.success) {
        onClose();
        setRefresher((prev) => !prev);
        toast.success("diet updated successfully!");
      } else {
        toast.error("Error updating diet");
      }
    } catch (error) {
      console.error("Error updating diet", error);
      toast.error("Error updating diet");
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-gray-900 w-96 p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-2xl mb-4 text-white">Edit Profile</h2>
        <div className="space-y-4 text-white">
          <input
            type="text"
            className="border p-2 w-full text-black"
            value={category}
            placeholder="Enter category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full text-black"
            value={dietType}
            placeholder="Enter Last Name"
            onChange={(e) => setDietType(e.target.value)}
          />
          <textarea
            className="border p-2 w-full text-black"
            value={description}
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover-bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDietModal;
