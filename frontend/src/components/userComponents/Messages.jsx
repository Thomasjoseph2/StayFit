import React, { useEffect, useState } from "react";
import noimg from "../../assets/no-avatar.webp";
import { FaVideo, FaPaperPlane } from "react-icons/fa";
import "../../css/overflow.css";
import {
  useGetRoomsMutation,
  useGetIndividualRoomMutation,
  useGetMessagesMutation,
  useSendMessageMutation,
} from "../../slices/usersApiSlice";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../slices/authSlice";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const Messages = () => {

  const {chatId}=useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const [rooms, setRooms] = useState([]);
  const [individual, setIndividual] = useState({});
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
 
  const dispatch=useDispatch()
  const navigate=useNavigate

  const [getRooms] = useGetRoomsMutation();
  const [getIndividualRoom] = useGetIndividualRoomMutation();
  const [GetMessages] = useGetMessagesMutation();
  const [SendMessage] = useSendMessageMutation();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    console.log(chatId,'chatid');
    fetchRooms(userInfo._id);
  
    // Check if there is a specific chatId and fetch individual room
    if (chatId && chatId !== 'allchats') {
      getRoom(chatId, userInfo._id);
    }
  }, [userInfo._id, chatId]);

  useEffect(() => {
    if (individual._id) {
      fetchMessages();
    }
  }, [individual._id]);


  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        individual._id !== newMessageReceived.room._id
      ) {
      } else {
        setMessages([...messages, newMessageReceived]);
        console.log(messages,'messages');
      }
    });
  });


  
  const fetchRooms = async (userId) => {
    try {
      const res = await getRooms(userId).unwrap();
      setRooms(res);
    } catch (err) {
      if (err.status === 401) {
        toast.error("you are not authorized to access the page");
        dispatch(logout());
        navigate("/login");
      }else{
        console.error(err);
        toast.error("Something went wrong");
      }
    }
  };

  const sendMessage = async () => {
    if (content.trim() !== "") {
      try {
        const res = await SendMessage({
          chatid: individual._id,
          sender: userInfo._id,
          type: "User",
          content,
        }).unwrap();
       setMessages([...messages, res]);
        setContent("");
        socket.emit("new message", res);
      } catch (err) {
        toast.error("error sending message");
        console.log("Error sending message:", err);
      }
    } else {
      toast.error("no empty message allowed");
    }
  };

  const getRoom = async (trainerId, userId) => {
    try {
      const res = await getIndividualRoom({ trainerId, userId }).unwrap();
      setIndividual(res);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await GetMessages(individual._id).unwrap();
      setMessages(fetchedMessages);
      socket.emit("join chat", individual._id);
      selectedChatCompare = messages;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex ">
      <div className="lg:w-1/4 md:w-1/2 bg-gray-900 h-screen overflow-y-auto scroll">
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
                className="rounded-full w-16 h-16"
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

      <div className=" md:w-3/4 bg-gray-900  h-screen flex flex-col items-center lg:w-1/2 ">
        {individual._id ? (
          <>
            <div className="w-3/4 bg-gray-800 mt-24 rounded-full flex items-center ">
              <img
                src={individual?.trainer?.signedUrl}
                className="rounded-full m-1 w-14 h-14"
                alt="User Avatar"
              />
              <div className="m-1 mr-auto">
                <h3 className="text-lg">{individual?.trainer?.name}</h3>
                <p className="text-sm font-light text-green-500">online</p>
              </div>
              <FaVideo className="text-2xl m-5 cursor-pointer" />
            </div>
            <div className="h-3/4 w-full  overflow-x-auto scroll ">
              <div className="h-[100px] px-10 py-14">
                {messages?.map((message, index) => (
                  <div
                    key={index}
                    className={`max-w-[45%] p-3 mb-6 rounded-b-xl rounded-tr-lg ${
                      message.senderType === "User"
                        ? "ml-auto bg-blue-900"
                        : "bg-blue-gray-500"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-14 w-full flex items-center ">
              <input
                className="w-full h-10 rounded-full p-4 shadow-md bg-gray-800"
                type="text"
                placeholder="type a message....."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <FaPaperPlane
                className="text-2xl text-blue-900 m-3 cursor-pointer"
                onClick={sendMessage}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-white">Select a chat to send messages.</p>
          </div>
        )}
      </div>

      <div className="w-1/4 md:w-0 bg-gray-900  h-screen lg:w-1/4"></div>
    </div>
  );
};

export default Messages;
