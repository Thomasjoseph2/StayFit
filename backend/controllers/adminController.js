import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import AdminServices from "../services/AdminServices.js";
const { ObjectId } = mongoose.Types;

//@desc Auth user/set token
//@route POST /api/admin/auth
//@access public

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await AdminServices.adminLogin(email, password, res);

  if (result) {
    res.status(result.statusCode).json(result.data);
  } else {
    res.status(401);

    throw new Error("Invalid email or password");
  }
});

//@admin logout
//@ route post api/admin/logout
//@access public

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({ message: "user logged out" });
});

const users = asyncHandler(async (req, res) => {
  const users = await AdminServices.getUsers();

  if (users) {
    res.status(users.statusCode).json(users.users);
  } else {
    res.status(404);

    throw new Error("users not found");
  }
});

const getTrainers = asyncHandler(async (req, res) => {
  const trainers = await AdminServices.getTrainers();

  if (trainers) {
    res.status(trainers.statusCode).json(trainers.trainers);
  } else {
    res.status(404);

    throw new Error("trainers not found");
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const userId = new ObjectId(req.body.userId);

  const blocked = await AdminServices.blockUser(userId);

  if (blocked) {
    res.status(blocked.statusCode).json({ message: blocked.message });
  } else {
    res.status(404);

    throw new Error("user not found");
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const userId = new ObjectId(req.body.userId);
  const unblocked = await AdminServices.unblockUser(userId);

  if (unblocked) {
    res.status(unblocked.statusCode).json({ message: unblocked.message });
  } else {
    res.status(404);

    throw new Error("user not found");
  }
});
const blockTrainer = asyncHandler(async (req, res) => {
  const trainerId = new ObjectId(req.body.trainerIdToConfirm);

  const blocked = await AdminServices.blockTrainer(trainerId);

  if (blocked) {
    res.status(blocked.statusCode).json({ message: blocked.message });
  } else {
    res.status(404);

    throw new Error("trainer not found");
  }
});

const unBlockTrainer = asyncHandler(async (req, res) => {
  const trainerId = new ObjectId(req.body.trainerIdToConfirm);

  const unblocked = await AdminServices.unblockTrainer(trainerId);

  if (unblocked) {
    res.status(unblocked.statusCode).json({ message: unblocked.message });
  } else {
    res.status(404);

    throw new Error("user not found");
  }
});
const addTrainer = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    qualifications,
    experience,
    specialties,
    dob,
    gender,
  } = req.body;

  const imgbuffer = req.file.buffer;

  const mimetype = req.file.mimetype;

  const added = await AdminServices.addTrainer(
    name,
    email,
    phone,
    password,
    qualifications,
    experience,
    specialties,
    dob,
    gender,
    mimetype,
    imgbuffer
  );

  if (added) {
    res.status(added.statusCode).json(added.message);
  } else {
    res.status(500);

    throw new Error("something went wrong");
  }
});

const getAdminVideos = asyncHandler(async (req, res) => {
  const response = await AdminServices.getAdminVideos();

  if (response) {
    res
      .status(response.statusCode)
      .json({ postVideos: response.videosWithSignedUrls });
  } else {
    res.status(404);

    throw new Error("videos not found");
  }
});

const approveVideo = asyncHandler(async (req, res) => {
  const response = await AdminServices.approveVideo(
    req.body.trainerId,
    req.body.videoId
  );

  if (response) {
    res.status(response.statusCode).json({ status: response.status });
  } else {
    res.status(500);
    throw new Error("something went wrong");
  }
});

const rejectVideo = asyncHandler(async (req, res) => {
  const response = await AdminServices.rejectVideo(
    req.body.trainerId,
    req.body.videoId
  );

  if (response) {
    res.status(response.statusCode).json({ status: response.status });
  } else {
    res.status(500);
    throw new Error("something went wrong");
  }
});

const getDiet = asyncHandler(async (req, res) => {
  const response = await AdminServices.getDiet();

  res.status(response.statusCode).json({ diets: response.diets });
});

const approveDiet = asyncHandler(async (req, res) => {
  const response = await AdminServices.approveDiet(
    req.body.trainerId,
    req.body.dietId
  );

  if (response) {
    res.status(response.statusCode).json({ status: response.status });
  } else {
    res.status(400).json("failed to approve");

    throw new Error("failed to approve");
  }
});

const rejectDiet = asyncHandler(async (req, res) => {
  const response = await AdminServices.rejectDiet(req);

  res.status(response.statusCode).json({ status: response.status });
});

const addPlans = asyncHandler(async (req, res) => {
  const response = await AdminServices.addPlans(req);

  res.status(response.statusCode).json({ success: response.success });
});

const unlistPlans = asyncHandler(async (req, res) => {
  const response = await AdminServices.unlistPlans(req.body.planId);

  res.status(response.statusCode).json({ success: response.success });
});

const activatePlan= asyncHandler(async (req, res) => {
  const response = await AdminServices.activatePlan(req.body.planId);

  res.status(response.statusCode).json({ success: response.success });
});

const getPlans = asyncHandler(async (req, res) => {
  const response = await AdminServices.getPlans();

  res.status(response.statusCode).json(response.plans);
});

const getSubscriptions = asyncHandler(async (req, res) => {
  const response = await AdminServices.getSubscriptions();

  res.status(response.statusCode).json(response.subscriptions);
});

const getSales = asyncHandler(async (req, res) => {
  const response = await AdminServices.getSales();

  res.status(response.statusCode).json(response.sales);
});
export {
  authAdmin,
  logoutAdmin,
  users,
  blockUser,
  unblockUser,
  addTrainer,
  getTrainers,
  getAdminVideos,
  rejectVideo,
  approveVideo,
  getDiet,
  rejectDiet,
  approveDiet,
  addPlans,
  getPlans,
  getSubscriptions,
  blockTrainer,
  unBlockTrainer,
  unlistPlans,
  getSales,
  activatePlan
};
