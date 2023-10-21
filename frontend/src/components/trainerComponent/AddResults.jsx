import React, { useState } from "react";

const AddResults = ({ onAddResult }) => {
  const [showModal, setShowModal] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs if needed
    if (postImage && description) {
      // Pass data to parent component
      onAddResult({ postImage, description });
      // Reset form and close modal
      setPostImage(null);
      setDescription("");
      setShowModal(false);
    }
  };

  return (
    <div className="mt-24 p-4">
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-900 text-white hover:bg-red-500 w-full py-2 rounded"
      >
        Add Post
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container bg-white w-96 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={handleImageChange}
                className="mb-4 p-2 w-full border rounded"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
                className="mb-4 p-2 w-full border rounded"
                rows="4"
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

export default AddResults;
