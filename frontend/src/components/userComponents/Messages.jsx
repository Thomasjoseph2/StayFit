import React, { useEffect, useState } from "react";
import noimg from "../../assets/no-avatar.webp";
import { FaVideo, FaPaperPlane } from "react-icons/fa";
import "../../css/overflow.css";
import { useGetRoomsMutation,useGetIndividualRoomMutation } from "../../slices/usersApiSlice";
import { useSelector } from "react-redux";
const Messages = () => {
  const [rooms, setRooms] = useState([]);
  const [individual,setIndividual]=useState({})

  const { userInfo } = useSelector((state) => state.auth);

  const [getRooms] = useGetRoomsMutation();
  const [getIndividualRoom]=useGetIndividualRoomMutation();

  useEffect(() => {
    fetchRooms(userInfo._id);
  }, [userInfo._id]);

  const fetchRooms = async (userId) => {
    try {
      const res = await getRooms(userId).unwrap();
      console.log(res);
      setRooms(res);
    } catch (err) {
      console.log(err);
    }
  };
  const getRoom = async (trainerId, userId) => {
    try {
      const res = await getIndividualRoom({ trainerId, userId }).unwrap();
      setIndividual(res);
      console.log(res); 
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="flex ">
      <div className="w-1/4 bg-gray-900 h-screen overflow-y-auto scroll">
        <div className="flex items-center mt-24 mx-9  ">
          <img
            src={noimg}
            className="rounded-full"
            width={60}
            height={60}
            alt="User Avatar"
          />
          <div className="ml-4 text-white">
            <h3 className="text-2xl">{userInfo.name}</h3>
            <p className="text-lg font-light">{userInfo.email}</p>
          </div>
        </div>
        <hr className="mt-4" />

        <div className="text-blue-900 text-xl m-3">Messages</div>
        <div className="mx-8 h-full">
          {rooms.map((room, index) => (
            <div
            onClick={() => getRoom(room.trainer._id, userInfo._id)}
              key={index}
              className="flex items-center py-2 border-b-[1px] border-gray-700 cursor-pointer "
            >
              <img
                src={room.trainer.imageUrl}
                className="rounded-full"
                width={60}
                height={60}
                alt="User Avatar"
              />
              <div className="ml-4 text-white">
                <h3 className="text-xl">{room.trainer.name}</h3>
                <p className="text-sm font-light text-gray-500">
                  {room.trainer.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-1/2 bg-gray-900  h-screen flex flex-col items-center ">
        <div className="w-3/4 bg-gray-800 mt-24 rounded-full flex items-center ">
          <img
            src={noimg}
            className="rounded-full m-1"
            width={60}
            height={60}
            alt="User Avatar"
          />
          <div className="m-1 mr-auto">
            <h3 className="text-lg">Rasha Eshaal</h3>
            <p className="text-sm font-light text-green-500">online</p>
          </div>
          <FaVideo className="text-2xl m-5 cursor-pointer" />
        </div>
        <div className="h-3/4 w-full  overflow-x-auto scroll ">
          <div className="h-[100px] px-10 py-14">
            <div className="max-w-[45%] bg-blue-gray-500 rounded-b-xl rounded-tr-lg p-3 mb-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </div>
            <div className=" max-w-[45%] bg-blue-900 rounded-b-xl rounded-tl-lg ml-auto p-3 ">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </div>
            <div className="max-w-[45%] bg-blue-gray-500 rounded-b-xl rounded-tr-lg p-3 mb-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </div>
            <div className=" max-w-[45%] bg-blue-900 rounded-b-xl rounded-tl-lg ml-auto p-3 ">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </div>{" "}
            <div className="max-w-[45%] bg-blue-gray-500 rounded-b-xl rounded-tr-lg p-3 mb-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </div>
            <div className=" max-w-[45%] bg-blue-900 rounded-b-xl rounded-tl-lg ml-auto p-3 ">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </div>{" "}
            <div className="max-w-[45%] bg-blue-gray-500 rounded-b-xl rounded-tr-lg p-3 mb-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </div>
            <div className=" max-w-[45%] bg-blue-900 rounded-b-xl rounded-tl-lg ml-auto p-3 ">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </div>
          </div>
        </div>
        <div className="p-14 w-full flex items-center ">
          <input
            className="w-full h-10 rounded-full p-4 shadow-md bg-gray-800"
            type="text"
            placeholder="type a message....."
          />
          <FaPaperPlane className="text-2xl text-blue-900 m-3 cursor-pointer" />
        </div>
      </div>
      <div className="w-1/4 bg-gray-900  h-screen"></div>
    </div>
  );
};

export default Messages;
