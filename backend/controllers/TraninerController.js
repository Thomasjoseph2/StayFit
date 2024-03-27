import "dotenv/config.js";
import asyncHandler from "express-async-handler";
import { Types as mongooseTypes } from "mongoose";
import TrainerServices from "../services/TrainerServices.js";
const { ObjectId } = mongooseTypes;

//@desc Auth trainer/set token
//@route POST /api/trainer/auth
//@access public
const authTrainer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await TrainerServices.trainerLogin(email, password, res);

  if (result) {
    res.status(result.statusCode).json(result.data);
  } else {
    res.status(401);

    throw new Error("Invalid email or password");
  }
});

//@trainer logout
//@ route post api/trainer/logout
//@access public

const logoutTrainer = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({ message: "trainer logged out" });
});

const getProfile = asyncHandler(async (req, res) => {
  const trainerId = new ObjectId(req.params.trainerId);

  const trainer = await TrainerServices.getProfile(trainerId);

  if (trainer) {
    res.status(trainer.statusCode).json({ plainTrainer: trainer.plainTrainer });
  } else {
    res.status(404);

    throw new Error("trainer not found");
  }
});

const addPost = asyncHandler(async (req, res) => {
  const { description, trainerId } = req.body;

  const addPost = await TrainerServices.addPost(
    description,
    trainerId,
    req.file.buffer,
    req.file.mimetype
  );

  if (addPost.statusCode) {
    res.status(addPost.statusCode).json(addPost.message);
  } else {
    res.status(500);

    throw new Error("something went wrong");
  }
});

const getPosts = asyncHandler(async (req, res) => {
  const trainerId = new ObjectId(req.params.trainerId);

  const posts = await TrainerServices.getPosts(trainerId);

  if (posts) {
    res.status(posts.statusCode).json(posts.postsWithUrl);
  } else {
    res.status(404);
    throw new Error("posts not found");
  }
});

const addVideos = asyncHandler(async (req, res) => {
  const { description, specification, trainerId, trainerName } = req.body;

  const trainersId = new ObjectId(trainerId);

  const buffer = req.file.buffer;

  const videoName = req.file.originalname;

  const video = await TrainerServices.addVideos(
    description,

    specification,

    trainersId,

    trainerName,

    videoName,

    req.file.mimetype,

    buffer
  );

  if (video.statusCode) {
    res.status(video.statusCode).json(video.message);
  } else {
    res.status(500);

    throw new Error("something went wrong");
  }
});

const getVideos = asyncHandler(async (req, res) => {
  const trainerId = new ObjectId(req.params.trainerId);

  const videos = await TrainerServices.getVideos(trainerId);

  if (videos) {
    res.status(videos.statusCode).json(videos.videosWithUrl);
  } else {
    res.status(404);

    throw new Error("videos not found");
  }
});

const deletePost = asyncHandler(async (req, res) => {
  const response = await TrainerServices.deletePost(
    req.body.selectedPostId,
    req.body.trainer,
    req.body.imageName
  );

  if (response) {
    res.status(response.statusCode).json(response.message);
  } else {
    res.status(500);

    throw new Error("something went wrong");
  }
});

const deleteVideo = asyncHandler(async (req, res) => {
  const response = await TrainerServices.deleteVideo(
    req.body.postId,
    req.body.trainer,
    req.body.name
  );

  if (response.statusCode) {
    res.status(response.statusCode).json({ message: response.message });
  } else {
    res.status(500);

    throw new Error("something went wrong");
  }
});

const addDiet = asyncHandler(async (req, res) => {
  const { description, trainerId, category, dietType, trainerName } = req.body;

  const diet = await TrainerServices.addDiet(
    description,
    trainerId,
    category,
    dietType,
    trainerName,
    req.file.buffer,
    req.file.mimetype
  );

  if (diet) {
    res.status(diet.statusCode).json(diet.message);
  } else {
    res.status(500);

    throw new Error("something went wrong");
  }
});

const addLive = asyncHandler(async (req, res) => {

  const addLive = await TrainerServices.addLive(req.body.live)

  if (addLive) {
    res.status(addLive.statusCode).json(addLive.addLive);
  } else {
    res.status(500);

    throw new Error("something went wrong");
  }
});

const getDiets = asyncHandler(async (req, res) => {
  const trainerId = new ObjectId(req.params.trainerId);

  const diets = await TrainerServices.getDiets(trainerId);

  if (diets) {
    res.status(diets.statusCode).json(diets.dietsWithUrl);
  } else {
    res.status(404);

    throw new Error("diets not found");
  }
});

const getLives = asyncHandler(async (req, res) => {

  const trainerId = new ObjectId(req.params.trainerId);

  const lives = await TrainerServices.getLives(trainerId);

  if (lives) {
    res.status(lives.statusCode).json(lives.lives);
  } else {
    res.status(404);

    throw new Error("diets not found");
  }
});

const deleteDiet = asyncHandler(async (req, res) => {
  const response = await TrainerServices.deleteDiet(
    req.body.postId,
    req.body.trainer,
    req.body.name
  );

  if (response) {
    res.status(response.statusCode).json({ message: response.message });
  } else {
    res.status(500);

    throw new Error("something went wrong");
  }
});

const deleteLive = asyncHandler(async (req, res) => {

  const response = await TrainerServices.deleteLive(
    req.body.trainerId,
    req.body.liveId,
  );

  if (response) {
    res.status(response.statusCode).json({ message: response.message });
  } else {
    res.status(500);

    throw new Error("something went wrong");
  }
});

const addTrainerProfileImage = asyncHandler(async (req, res) => {
  const result = await TrainerServices.addProfileImage(
    req.body.trainerId,
    req.file.buffer,
    req.file.mimetype
  );

  if (result) {
    res.status(result.statusCode).json({ message: result.message });
  } else {
    res.status(500);

    throw new Error("something went wrong");
  }
});

const editTrainerProfile = asyncHandler(async (req, res) => {
  const trainerDetails = req.body;

  const result = await TrainerServices.editTrainer(trainerDetails);

  if (result) {
    res.status(result.statusCode).json({ trainer: result.trainer });
  } else {
    res.status(401);

    throw new Error("something went wrong");
  }
});

const editDiet = asyncHandler(async (req, res) => {
  const { trainer, dietId, category, dietType, description } = req.body;

  const response = await TrainerServices.editDiet(
    trainer,
    dietId,
    category,
    dietType,
    description
  );

  if (response.statusCode) {
    res.status(response.statusCode).json({ response: response.response });
  } else {
    res.status(401);

    throw new Error("something went wrong");
  }
});

export {
  logoutTrainer,
  authTrainer,
  getProfile,
  addPost,
  getPosts,
  addVideos,
  getVideos,
  deletePost,
  deleteVideo,
  addDiet,
  getDiets,
  deleteDiet,
  addTrainerProfileImage,
  editTrainerProfile,
  editDiet,
  addLive,
  getLives,
  deleteLive
};
