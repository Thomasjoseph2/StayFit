import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTrainerMutation } from "../../slices/usersApiSlice";
import ShimmerTrainerCard from "../Shimmers/ShimmerTrainerCard";
import { useGetIndividualRoomMutation } from "../../slices/usersApiSlice";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../slices/authSlice";
const Trainer = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [getTrainer, { isLoading }] = useGetTrainerMutation();
  const [trainer, setTrainer] = useState({});
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const [getIndividualRoom] = useGetIndividualRoomMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(trainerId);
  }, [trainerId]);

  const fetchData = async (trainerId) => {
    try {
      const response = await getTrainer(trainerId);
      setTrainer(response.data);

      if (response?.error?.status === 401) {
        toast.error("you are not authorized to access the page");
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching trainer data", error);
      toast.error("Error fetching trainer data");
    }
  };

  const chatHandler = async (trainerId) => {
    const chatId = trainerId;
    const userId = userInfo._id;
    if (chatId) {
      const room = await getIndividualRoom({ userId, trainerId });
      if (room.data) {
        navigate(`/user-messages/${chatId}`);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <ShimmerTrainerCard />
      ) : (
        <div className="trainer bg-black p-4 rounded-lg shadow-md md:w-96 lg:w-full mx-auto container">
          <img
            src={trainer?.plainTrainer?.imageUrl}
            alt="{trainer.name}"
            className="rounded-full mx-auto mb-4 w-60 h-50 mt-20"
          />
          <h3 className="text-center font-bold mb-2 text-white">
            {trainer?.plainTrainer?.name}
          </h3>
          <p className="text-center mb-4 text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => {
                chatHandler(trainer?.plainTrainer?._id);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Message
            </button>
            {/* <Messages className='hidden' trainerId={trainer?.plainTrainer?._id} /> */}
          </div>
          <div className=" mx-auto mt-8 mb-20">
            <div className="grid gap-6 sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4">
              {trainer?.postsWithUrl?.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-900 p-4 rounded shadow-lg"
                >
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full h-56 object-cover mb-4"
                  />
                  <p className="text-gray-300 text-sm">{post.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Trainer;
