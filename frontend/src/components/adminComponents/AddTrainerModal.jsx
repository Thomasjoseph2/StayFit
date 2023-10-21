import React, { useState } from "react";
import { toast } from "react-toastify";

import { useAddTrainerMutation } from "../../slices/adminApiSlice";

const AddTrainerModal = ({ isOpen, onRequestClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [qualificationsError, setQualificationsError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [specialtiesError, setSpecialtiesError] = useState("");
  const [dobError, setDobError] = useState("");
  const [GenderError, setGenderError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [imageError, setImageError] = useState("");

  const [addTrainer] = useAddTrainerMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    // Validation logic
    let isValid = true;

    if (!firstName) {
      setFirstNameError("First Name is required.");
      isValid = false;
    }

    if (!lastName) {
      setLastNameError("Last Name is required.");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    }

    if (!phone) {
      setPhoneError("phone number required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (!qualifications) {
      setQualificationsError("qualifications required");
      isValid = false;
    }

    if (!experience) {
      setExperienceError("Experience is required.");
      isValid = false;
    }

    if (!specialties) {
      setSpecialtiesError("specialities required");
      isValid = false;
    }

    if (!dob) {
      setDobError("dob required");
      isValid = false;
    }

    if (!gender) {
      setGenderError("gender required");
      isValid = false;
    }

    if (!profileImage) {
      setGenderError("image required");
      isValid = false;
    }
    if (isValid) {
      try {
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        formData.append("qualifications", qualifications);
        formData.append("experience", experience);
        formData.append("specialties", specialties);
        formData.append("dob", dob);
        formData.append("gender", gender);
        formData.append("profileImage", profileImage);

        // Make API call to add trainer
        await addTrainer(formData).unwrap();

        // Clear form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setQualifications("");
        setExperience("");
        setSpecialties("");
        setDob("");
        setGender("");
        setProfileImage(null);
        
        setIsLoading(false);
        // Close the modal
        onRequestClose();

        toast.success("Trainer added successfully!");
      } catch (err) {
        // Handle API errors

        const apiError = err?.data?.message || err?.error;
        toast.error(err.data);
      }
    }
  };

  return (
    <>
      {isOpen ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Trainer</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={onRequestClose}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form
                    onSubmit={submitHandler}
                    className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                    encType="multipart/form-data"
                  >
                    {/* First Row */}
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-4">
                        <label className="block text-black text-sm font-bold mb-1">
                          First Name
                        </label>
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-black ${
                            firstNameError ? "border-red-500" : ""
                          }`}
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            setFirstNameError("");
                          }}
                        />
                        {firstNameError && (
                          <p className="text-red-500 text-xs italic">
                            {firstNameError}
                          </p>
                        )}
                      </div>
                      <div className="w-1/2">
                        <label className="block text-black text-sm font-bold mb-1">
                          Last Name
                        </label>
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-black ${
                            lastNameError ? "border-red-500" : ""
                          }`}
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            setLastNameError("");
                          }}
                        />
                        {lastNameError && (
                          <p className="text-red-500 text-xs italic">
                            {lastNameError}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-4">
                        <label className="block text-black text-sm font-bold mb-1">
                          Email Address
                        </label>
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-black ${
                            emailError ? "border-red-500" : ""
                          }`}
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                          }}
                        />
                        {emailError && (
                          <p className="text-red-500 text-xs italic">
                            {emailError}
                          </p>
                        )}
                      </div>
                      <div className="w-1/2">
                        <label className="block text-black text-sm font-bold mb-1">
                          Phone Number
                        </label>
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-black ${
                            phoneError ? "border-red-500" : ""
                          }`}
                          type="tel"
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            setPhoneError("");
                          }}
                        />
                        {phoneError && (
                          <p className="text-red-500 text-xs italic">
                            {phoneError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex mb-4">
                      <div className="w-1/2 mr-4">
                        <label className="block text-black text-sm font-bold mb-1">
                          Password
                        </label>
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-black ${
                            passwordError ? "border-red-500" : ""
                          }`}
                          type="password"
                          placeholder="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                          }}
                        />
                        {passwordError && (
                          <p className="text-red-500 text-xs italic">
                            {passwordError}
                          </p>
                        )}
                      </div>
                      <div className="w-1/2">
                        <label className="block text-black text-sm font-bold mb-1">
                          Confirm password
                        </label>
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-black ${
                            confirmPasswordError ? "border-red-500" : ""
                          }`}
                          type="password"
                          placeholder="confirm password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setConfirmPasswordError("");
                          }}
                        />
                        {confirmPasswordError && (
                          <p className="text-red-500 text-xs italic">
                            {confirmPasswordError}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Third Row */}
                    <div className="mb-4">
                      <label className="block text-black text-sm font-bold mb-1">
                        Qualifications
                      </label>
                      <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-black ${
                          qualificationsError ? "border-red-500" : ""
                        }`}
                        type="text"
                        placeholder="Qualifications"
                        value={qualifications}
                        onChange={(e) => {
                          setQualifications(e.target.value);
                          setQualificationsError("");
                        }}
                      />
                      {qualificationsError && (
                        <p className="text-red-500 text-xs italic">
                          {qualificationsError}
                        </p>
                      )}
                    </div>

                    {/* Fourth Row */}
                    <div className="mb-4">
                      <label className="block text-black text-sm font-bold mb-1">
                        Experience
                      </label>
                      <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-black ${
                          experienceError ? "border-red-500" : ""
                        }`}
                        type="text"
                        placeholder="Experience"
                        value={experience}
                        onChange={(e) => {
                          setExperience(e.target.value);
                          setExperienceError("");
                        }}
                      />
                      {experienceError && (
                        <p className="text-red-500 text-xs italic">
                          {experienceError}
                        </p>
                      )}
                    </div>

                    {/* Fifth Row */}
                    <div className="mb-4">
                      <label className="block text-black text-sm font-bold mb-1">
                        Specialties
                      </label>
                      <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-black ${
                          specialtiesError ? "border-red-500" : ""
                        }`}
                        type="text"
                        placeholder="Specialties"
                        value={specialties}
                        onChange={(e) => {
                          setSpecialties(e.target.value);
                          setSpecialtiesError("");
                        }}
                      />
                      {specialtiesError && (
                        <p className="text-red-500 text-xs italic">
                          {specialtiesError}
                        </p>
                      )}
                    </div>

                    <div className="flex mb-4">
                      <div className="w-1/2 mr-4">
                        <label className="block text-black text-sm font-bold mb-1">
                          Date of Birth
                        </label>
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-black ${
                            dobError ? "border-red-500" : ""
                          }`}
                          type="date"
                          placeholder="Date of Birth"
                          value={dob}
                          onChange={(e) => {
                            setDob(e.target.value);
                            setDobError("");
                          }}
                        />
                        {dobError && (
                          <p className="text-red-500 text-xs italic">
                            {dobError}
                          </p>
                        )}
                      </div>
                      <div className="w-1/2">
                        <label className="block text-black text-sm font-bold mb-1">
                          Gender
                        </label>
                        <select
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-black ${
                            GenderError ? "border-red-500" : ""
                          }`}
                          value={gender}
                          onChange={(e) => {
                            setGender(e.target.value);
                            setGenderError("");
                          }}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {GenderError && (
                          <p className="text-red-500 text-xs italic">
                            {GenderError}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-1">
                          Profile Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="mb-2"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={onRequestClose}
                      >
                        Close
                      </button>
                      <button
                        className="text-white bg-blue-500 active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                      >
                        Add Trainer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddTrainerModal;
