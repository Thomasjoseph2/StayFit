import ChatRoom from "../models/chatRoom.js";
import ChatMessage from "../models/chatMessage.js";
class ChatRepository {
  async findChat(userId, trainerId) {
    return await ChatRoom.findOne({
      user: userId,
      trainer: trainerId,
    });
  }

  async createChat(userId, trainerId) {
    const chatRoom = new ChatRoom({
      user: userId,
      trainer: trainerId,
      messages: [],
    });
    await chatRoom.save();
    return chatRoom;
  }

  async findChatWithRoomId(roomId) {
    const roomDetails = await ChatRoom.findOne({ _id: roomId }).populate({
      path: "trainer",
      select: "_id name specialties imageName",
    });
    return roomDetails;
  }
  async findTrainerChatWithRoomId(roomId) {
    const roomDetails = await ChatRoom.findOne({ _id: roomId }).populate({
      path: "user",
      select: "_id name email imagePath",
    });
    return roomDetails;
  }
  async findRooms(user) {
    const rooms = await ChatRoom.find({ user }).populate({
      path: "trainer",
      select: "_id name email imageName",
    });
    return rooms;
  }
  async findTrainerRooms(trainer) {
    const rooms = await ChatRoom.find({ trainer }).populate({
      path: "user",
      select: "_id name email imagePath",
    });
    return rooms;
  }
  async getMessages(roomid){
    const messages = await ChatMessage.find({ room: roomid }).sort({
        createdAt: 1,
      });
      return messages;
  }
}

export default new ChatRepository();
