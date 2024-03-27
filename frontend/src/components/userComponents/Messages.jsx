import React, { useEffect, useState, useRef } from "react";
import noimg from "../../assets/no-avatar.webp";
import { FaPaperPlane } from "react-icons/fa";
import "../../css/overflow.css";
import {
  useGetRoomsMutation,
  useGetIndividualRoomMutation,
  useGetMessagesMutation,
  useSendMessageMutation,
} from "../../slices/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import "../../css/typing.css";
// const ENDPOINT = "https://stayfit-backend.thomasjoseph.online/";
// const ENDPOINT = "http://localhost:5000";
const ENDPOINT = "https://stayfit.thomasjoseph.online/";


var socket, selectedChatCompare;

const Messages = () => {
  const { chatId } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const [rooms, setRooms] = useState([]);
  const [individual, setIndividual] = useState({});
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const messagesContainerRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getRooms] = useGetRoomsMutation();
  const [getIndividualRoom] = useGetIndividualRoomMutation();
  const [GetMessages] = useGetMessagesMutation();
  const [SendMessage] = useSendMessageMutation();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    return () => {
      socket.off("connected");
      socket.off("typing");
      socket.off("stop typing");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchRooms(userInfo._id);

    if (chatId && chatId !== "allchats") {
      getRoom(chatId, userInfo._id);
    }
  }, [userInfo._id, chatId]);

  useEffect(() => {
    if (individual._id) {
      fetchMessages();
    }
  }, [individual._id]);

  useEffect(() => {
    messagesContainerRef.current?.scrollTo(
      0,
      messagesContainerRef.current?.scrollHeight
    );
  }, [messages, isTyping]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        individual._id !== newMessageReceived.room._id
      ) {
      } else {
        setMessages([...messages, newMessageReceived]);
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
      } else {
        console.error(err);
        toast.error("Something went wrong");
      }
    }
  };

  const typingHandler = (e) => {
    setContent(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", individual._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", individual._id);
        setTyping(false);
      }
    }, timerLength);
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
        socket.emit("stop typing", individual._id);
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

  // const VideoCallHandler=()=>{
  //   navigate(`/user-roompage/${individual._id+'videocall'}`)

  // }

  return (
    <div className="flex ">
      <div className="lg:w-1/4 md:w-1/2 bg-gray-900 h-screen overflow-y-auto scroll">
        <div className="flex items-center mt-24 mx-9  ">
          <img
            src={userInfo?.imagePath ? userInfo.imagePath : noimg}
            className="rounded-full"
            width={60}
            height={60}
            alt="noimg"
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
                {/* <p className="text-sm font-light text-green-500">online</p> */}
              </div>
            </div>
            <div
              className="h-3/4 w-full  overflow-x-auto scroll "
              ref={messagesContainerRef}
            >
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
                {isTyping && (
                  <button className="text-white bg-gray-700 rounded-full w-20 mr-auto p-1">
                    typing...
                  </button>
                )}
              </div>
            </div>

            <div className="p-14 w-full flex items-center ">
              <input
                className="w-full h-10 rounded-full p-4 shadow-md bg-gray-800"
                type="text"
                placeholder="type a message....."
                value={content}
                onChange={typingHandler}
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
