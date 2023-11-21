import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useAddPostMutation } from "../../slices/trainerApiSlice";
import { toast } from "react-toastify";

const AddResults = ({refreshPosts}) => {
  const { trainerInfo } = useSelector((state) => state.trainerAuth);
  const [addPost] = useAddPostMutation();

  const [showModal, setShowModal] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [description, setDescription] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (postImage && description) {
    try {
      // Create a FormData object and append the file and description
      const formData = new FormData();
      formData.append("postImage", postImage);
      formData.append("description", description);
      formData.append("trainerId", trainerInfo._id);

      // Call the addPost mutation with the FormData object
      await addPost(formData).unwrap().then(()=>{
        toast.success("post added successfully")
        refreshPosts();
      }).catch((err)=>{
        toast.error(err.data.message)
      })

      // Reset form and close modal
      setPostImage(null);
      setDescription("");
      setShowModal(false);
    } catch (error) {
      // Handle error, show a toast message or other error handling logic
      console.error("Error adding post:", error);
    }
  } else {
    // Handle validation errors if needed
  }
};

  
  return (
    <div className="mt-24 p-4">
      <button
        onClick={() => setShowModal(true)}
        className="bg-gray-900 text-white hover:bg-gray-700 w-full py-2 rounded"
      >
        Add Post
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container bg-white w-96 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data bg-black ">
              <input
                type="file"
                onChange={handleImageChange}
                name='postImage'
                className="mb-4 p-2 w-full border rounded border-black"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
                className="mb-4 p-2 w-full border rounded border-black "
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

export default AddResults;
