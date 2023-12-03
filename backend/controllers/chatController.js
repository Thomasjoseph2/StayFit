import asyncHandler from "express-async-handler";
import ChatMessage from "../models/chatMessage.js";
import ChatRoom from "../models/chatRoom.js";
import ChatServices from "../services/ChatServices.js";

const createRoom = asyncHandler(async (req, res) => {
  const { userId, trainerId } = req.body;

  const roomDetail = await ChatServices.getRoomDetails(userId, trainerId);

  if (roomDetail) {
    res.status(roomDetail.statusCode).json(roomDetail.roomDetail);
  } else {
    res.status(404);
    throw new Error("unable to find chat rooms");
  }
});

const createTrainerRoom = asyncHandler(async (req, res) => {
  const { userId, trainerId } = req.body;

  const roomDetail = await ChatServices.getTrainerRoomDetails(
    userId,
    trainerId
  );

  if (roomDetail) {
    res.status(roomDetail.statusCode).json(roomDetail.roomDetail);
  } else {
    res.status(404);
    throw new Error("unable to find chat rooms");
  }
});

const getRooms = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const rooms = await ChatServices.findRooms(userId);

  if (rooms) {
    res.status(rooms.statusCode).json(rooms.roomsWithUrls);
  } else {
    res.status(404);
    throw new Error("unable to find rooms");
  }
});
const getTrainerRooms = asyncHandler(async (req, res) => {
  const { trainer } = req.params;

  const rooms = await ChatServices.findTrainerRooms(trainer);

  if (rooms) {
    res.status(rooms.statusCode).json(rooms.roomsWithUrls);
  } else {
    res.status(404);
    throw new Error("unable to find rooms");
  }
});

const chatSend = asyncHandler(async (req, res) => {
  const { content, chatid, sender, type } = req.body;

  // Create a new chat message
  const newMessage = new ChatMessage({
    room: chatid,
    sender: sender,
    senderType: type,
    content: content,
  });

  // Save the chat message
  await newMessage.save();

  let chatRoom = await ChatRoom.findOne({ _id: chatid });
  if (chatRoom) {
    chatRoom.messages.push(newMessage._id);
    chatRoom.latestMessage = content;
  }
  await chatRoom.save();

  // Populate the sender field with specific fields (_id, name, email)
  // and also populate the nested fields room.user and room.doctor
  await newMessage.populate([
    { path: "sender", select: "_id name email" },
    {
      path: "room",
      populate: [
        { path: "user", select: "_id name email" },
        { path: "trainer", select: "_id name email" },
      ],
    },
  ]);

  res.json(newMessage);
});

const getMessages = asyncHandler(async (req, res) => {
  const { roomid } = req.params;
  const messages = await ChatServices.findMessages(roomid);
  if (messages) {
    res.status(messages.statusCode).json(messages.messages);
  } else {
    res.status(404).json({ message: "No messages found for the given room." });
  }
});

export {
  createRoom,
  getRooms,
  chatSend,
  getMessages,
  getTrainerRooms,
  createTrainerRoom,
};
