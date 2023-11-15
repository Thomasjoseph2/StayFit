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
      select: "_id name specialties imageName",
    });

    const signedUrl = await generateUrl(roomDetails.trainer.imageName);

   const roomDetail = roomDetails.toObject();

    roomDetail.trainer.signedUrl = signedUrl;


    res.status(200).json(roomDetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating or getting chat room" });
  }
});
const createTrainerRoom = asyncHandler(async (req, res) => {
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
      path: "user",
      select: "_id name email imagePath",
    });


    let signedUrl;

    if (roomDetails.user && roomDetails.user.imagePath) {
      signedUrl = await generateUrl(roomDetails.user.imagePath);
    }

    // Assign the result of toObject() back to roomDetails
    const roomDetail = roomDetails.toObject();

    // Attach the signedUrl to roomDetails.trainer if available
    if (signedUrl) {
      roomDetail.user.signedUrl = signedUrl;
    }

    res.status(200).json(roomDetail);
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

  const { content,chatid, sender, type  } = req.body;
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

  res.json(newMessage);
});

const getMessages= asyncHandler(async (req, res) => {
  const { roomid } = req.params;

  try {
    const messages = await ChatMessage.find({ room: roomid }).sort({ createdAt: 1 });

    if (messages) {
      res.status(200).json(messages);
    } else {
      res.status(404).json({ message: 'No messages found for the given room.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

const getTrainerRooms = asyncHandler(async(req,res)=>{
    const { trainer } = req.params
   
    const rooms = await ChatRoom.find({trainer:trainer}).populate({path:'user',select:'_id name email imagePath'})
   
    if (rooms) {
      const roomsWithUrls = await Promise.all(
        rooms.map(async (room) => {
          if (room.user && room.user.imagePath) {
  
              const url = await generateUrl(room.user.imagePath);
            return {
              ...room.toObject(),
              user: {
                ...room.user.toObject(),
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
})
export { createRoom, getRooms, chatSend,getMessages ,getTrainerRooms,createTrainerRoom};
