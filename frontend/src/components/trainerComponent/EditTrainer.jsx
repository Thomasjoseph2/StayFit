import React, { useState, useEffect } from "react";
import { useUpdateTrainerProfileMutation } from "../../slices/trainerApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/trainerAuthSlice";
const EditTrainerModal = ({
  isOpen,
  onClose,
  setRefresher,
  trainerDetails,
}) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateTrainerProfileMutation();

  useEffect(() => {
    if (trainerDetails) {
      setFirstName(trainerDetails.firstName);
      setLastName(trainerDetails.lastName);
      setPhone(trainerDetails.phone);
      setQualification(trainerDetails.qualifications);
      setExperience(trainerDetails.experience );
      setSpecialties(trainerDetails.specialties);
      setDescription(trainerDetails.description || "");
    }
  }, [trainerDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        trainerId: trainerDetails._id,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        qualifications: qualification,
        experience: experience,
        specialties: specialties,
        description: description,
      });

      dispatch(setCredentials({ ...res.data.trainer }));
      onClose();
      setRefresher((prev) => !prev); // Trigger re-render
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile");
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
            value={firstName}
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full text-black"
            value={lastName}
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full text-black"
            value={phone}
            placeholder="Enter Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full text-black"
            value={qualification}
            placeholder="Enter Qualification"
            onChange={(e) => setQualification(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full text-black"
            value={experience}
            placeholder="Enter Experience"
            onChange={(e) => setExperience(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full text-black"
            value={specialties}
            placeholder="Enter Specialties"
            onChange={(e) => setSpecialties(e.target.value)}
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

export default EditTrainerModal;
