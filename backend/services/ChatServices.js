import asyncHandler from "express-async-handler";
import generateUrl from "../utils/generateUrl.js";
import ChatRepository from "../repositorys/ChatRepository.js";

class ChatServices {
  getRoomDetails = asyncHandler(async (userId, trainerId) => {
    let chatRoom = await ChatRepository.findChat(userId, trainerId);

    if (!chatRoom) {
      chatRoom = await ChatRepository.createChat(userId, trainerId);
    }

    const roomDetails = await ChatRepository.findChatWithRoomId({
      _id: chatRoom._id,
    });

    const signedUrl = await generateUrl(roomDetails.trainer.imageName);

    const roomDetail = roomDetails.toObject();

    roomDetail.trainer.signedUrl = signedUrl;

    return {
      statusCode: 200,

      roomDetail,
    };
  });

  getTrainerRoomDetails = asyncHandler(async (userId, trainerId) => {
    let chatRoom = await ChatRepository.findChat(userId, trainerId);

    if (!chatRoom) {
      chatRoom = await ChatRepository.createChat(userId, trainerId);
    }

    const roomDetails = await ChatRepository.findTrainerChatWithRoomId({
      _id: chatRoom._id,
    });

    let signedUrl;

    if (roomDetails.user && roomDetails.user.imagePath) {
      signedUrl = await generateUrl(roomDetails.user.imagePath);
    }

    const roomDetail = roomDetails.toObject();

    if (signedUrl) {
      roomDetail.user.signedUrl = signedUrl;
    }

    return {
      statusCode: 200,

      roomDetail,
    };
  });

  findRooms = asyncHandler(async (user) => {
    const rooms = await ChatRepository.findRooms(user);

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
      return {
        statusCode: 200,

        roomsWithUrls,
      };
    }
  });

  findTrainerRooms = asyncHandler(async (trainer) => {
    const rooms = await ChatRepository.findTrainerRooms(trainer);

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
      return {
        statusCode: 200,

        roomsWithUrls,
      };
    }
  });

  findMessages = asyncHandler(async (roomid) => {
    const messages = await ChatRepository.getMessages(roomid);
    return { statusCode: 200, messages };
  });
}

export default new ChatServices();
