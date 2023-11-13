import asyncHandler from "express-async-handler";
import ChatMessage from "../models/chatMessage.js";
import ChatRoom from "../models/chatRoom.js";
import generateUrl from "../utils/generateUrl.js";
const createRoom = asyncHandler(async (req, res) => {
  try {
    const { userId, trainerId } = req.body;

    let chatRoom = await ChatRoom.findOne({
      user: userId,
      trainer: trainerId,
    });

    if (!chatRoom) {
      chatRoom = new ChatRoom({
        user: userId,
        trainer: trainerId,
        messages: [],
      });
      await chatRoom.save();
    }

    const roomDetails = await ChatRoom.findOne({ _id: chatRoom._id }).populate({
      path: "trainer",
      select: "_id name specialties",
    });

    res.status(200).json(roomDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating or getting chat room" });
  }
});

//User side
const getRooms = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const rooms = await ChatRoom.find({ user: userId }).populate({
    path: "trainer",
    select: "_id name email  imageName",
  });

  if (rooms) {
    const roomsWithUrls = await Promise.all(
      rooms.map(async (room) => {
        if (room.trainer && room.trainer.imageName) {

            const url = await generateUrl(room.trainer.imageName);
            console.log(url);
          return {
            ...room.toObject(),
            trainer: {
              ...room.trainer.toObject(),
              imageUrl: url,
            },
          };
        } else {
          return room.toObject();
        }
      })
    );

    res.status(200).json(roomsWithUrls);
  } else {
    res.status(400).json({ message: "Failed to fetch rooms" });
  }
});

const chatSend = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { chatid, sender, type } = req.params;

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

  // Return the chat message with all populated fields
  res.json(newMessage);
});

export { createRoom, getRooms, chatSend };
