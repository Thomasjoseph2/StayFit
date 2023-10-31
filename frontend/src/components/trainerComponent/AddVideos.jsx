import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useAddVideoMutation } from "../../slices/trainerApiSlice";
import { toast } from "react-toastify";
import LoadingModal from "./LoadingModal";

const AddVideos = ({ refreshPosts }) => {
  const { trainerInfo } = useSelector((state) => state.trainerAuth);
  const [addVideo, { isLoading }] = useAddVideoMutation();

  const [showModal, setShowModal] = useState(false);
  const [postFile, setPostFile] = useState(null);
  const [description, setDescription] = useState("");
  const [specification,setSpecification]=useState("")
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPostFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (postFile && description) {
      try {
        // Create a FormData object and append the file and description
        const formData = new FormData();
        formData.append("postFile", postFile);
        formData.append("description", description);
        formData.append("specification",specification);
        formData.append("trainerId", trainerInfo._id);

        // Call the addPost mutation with the FormData object
        await addVideo(formData)
          .unwrap()
          .then(() => {
            toast.success("post added successfully");
            refreshPosts();
          });

        // Reset form and close modal
        setPostFile(null);
        setDescription("");
        setSpecification("")
        setShowModal(false);
        
      } catch (error) {
        // Handle error, show a toast message or other error handling logic
        console.error("Error adding video:", error);
        toast.error('error adding video')
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
          {/* Show LoadingModal component while isLoading is true */}
          {isLoading && <LoadingModal />}
          <div className="modal-container bg-white w-96 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                name="postFile"
                className="mb-4 p-2 w-full border rounded"
              />

              <input
                type="text"
                className="border p-2 w-full"
                value={specification}
                placeholder="enter specification..."
                onChange={(e) => setSpecification(e.target.value)}
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
                className="mb-4 p-2 w-full border rounded border-black"
                rows="4"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-900 text-white hover:bg-red-500 px-4 py-2 rounded border-black"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
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

export default AddVideos;
