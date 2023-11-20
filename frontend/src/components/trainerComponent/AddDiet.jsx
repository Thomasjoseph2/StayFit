import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useAddDietMutation } from "../../slices/trainerApiSlice";
import { toast } from "react-toastify";

const AddDiet = ({ refreshPosts }) => {
  const { trainerInfo } = useSelector((state) => state.trainerAuth);
  const [addDiet] = useAddDietMutation();

  const [showModal, setShowModal] = useState(false);
  const [dietImage, setDietImage] = useState(null);
  const [dietType, setDietType] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
      if (file) {
      if (file.type.startsWith("image/")) {
        setDietImage(file);
      } else {
        toast.error("Please select a valid image file.");
        e.target.value = null;
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

   
      try {
        const formData = new FormData();
        formData.append("dietImage", dietImage);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("dietType", dietType);
        formData.append("trainerId", trainerInfo._id);
        formData.append('trainerName',trainerInfo.name);

        // Call the addPost mutation with the FormData object
        await addDiet(formData)
          .unwrap()
          .then(() => {
            toast.success("diet added successfully");
            refreshPosts();
          });

        // Reset form and close modal
        setDietImage(null);
        setDescription("");
        setCategory("");
        setDietType("");
        setShowModal(false);
      } catch (error) {
        // Handle error, show a toast message or other error handling logic
        console.error("Error adding diet:", error);
        toast.error("Error adding diet");
      }

  };

  return (
    <div className="mt-24 p-4">
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-900 text-white hover:bg-gray-700 w-full py-2 rounded"
      >
        Add diet
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container bg-white w-96 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Diet</h2>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data bg-black "
            >
              <input
                type="file"
                onChange={handleImageChange}
                name="dietImage"
                className="mb-4 p-2 w-full border rounded border-black"
                required
              />

              <input
                type="text"
                className="border p-2 w-full text-black border-black mt-2"
                placeholder='category of the diet...'
                onChange={(e) => setCategory(e.target.value)}
              />

              <input
                type="text"
                className="border p-2 w-full text-black border-black mt-2"
                placeholder="enter the diet type..."
                onChange={(e) => setDietType(e.target.value)}
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
                className="mb-4 p-2 w-full border rounded border-black mt-2"
                rows="4"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-900 text-white hover:bg-red-500 px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="ml-2 text-gray-800 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDiet;
