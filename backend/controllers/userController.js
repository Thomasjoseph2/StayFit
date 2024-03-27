import "dotenv/config.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import asyncHandler from "express-async-handler";
import UserServices from "../services/UserServices.js";

//@desc Auth user/set token
//@route POST /api/users/auth
//@access publicbucket

const authUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const result = await UserServices.userLogin(email, password, res);

  res.status(result.statusCode).json(result.data);
});

//@desc new user registration
//route POST api/users
//@access public
// Controller.js

const registerUser = asyncHandler(async (req, res) => {

  const result = await UserServices.registerUserWithOTP(req.body);

  

  res.status(200).json(result);
});

const googleLogin = asyncHandler(async (req, res) => {

  const { token } = req.body;

  const result = await UserServices.googleLogin(token, res);

  res.status(result.statusCode).json(result.data);
});
//@user logout
//@ route post api/users/logout
//@access public

const logoutUser = asyncHandler(async (req, res) => {

  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({ message: "user logged out" });
});

const getTrainers = asyncHandler(async (req, res) => {
  
  const trainers = await UserServices.getTrainers();

  res.status(trainers.statusCode).json(trainers.trainersWithUrls);
});

const getTrainer = asyncHandler(async (req, res) => {
  
  const trainerId = new ObjectId(req.params.trainerId);

  const trainer = await UserServices.getTrainer(trainerId);

  res
    .status(trainer.statusCode)
  
    .json({
  
      plainTrainer: trainer.plainTrainer,
  
      postsWithUrl: trainer.postsWithUrl,
  
    });

  });

const getUserVideos = asyncHandler(async (req, res) => {

  const postVideos = await UserServices.getUserVideos();

  res

  .status(postVideos.statusCode)

  .json({ postVideos: postVideos.videosWithSignedUrls });

});

const getUserProfile = asyncHandler(async (req, res) => {

  const user = await UserServices.getUser(req.params.userId);

  res.status(user.statusCode).json({ user: user.user });

});

const addProfileImage = asyncHandler(async (req, res) => {

  const result = await UserServices.addProfileImage(

    req.file.buffer,

    req.body.userId,

    req.file.mimetype

    );


    res.status(result.statusCode).json({ message: result.message ,url:result.url});
});

const editProfile = asyncHandler(async (req, res) => {

  const { userId, name, email } = req.body;

  const user = await UserServices.editUser(userId, name, email);

  res.status(user.statusCode).json({ user: user.user });

});

const getUserDiets = asyncHandler(async (req, res) => {

  const postDiets = await UserServices.getUserDiets();

  res

  .status(postDiets.statusCode)

  .json({ postDiets: postDiets.dietsWithSignedUrls });

});

const verifyOtp = asyncHandler(async (req, res) => {

  const { email, otp } = req.body;

  const result = await UserServices.verifyOtp(email, otp, res);

  res.status(result.statusCode).json(result.data);

});

const getUserPlans = asyncHandler(async (req, res) => {

  const plans = await UserServices.findActivePlans();

  res.status(plans.statusCode).json(plans.plans);

});

const getUserConferences=asyncHandler(async(req,res)=>{

  const lives=await UserServices.findActiveLives();

  res.status(lives.statusCode).json(lives.lives);

})

const createOrder = asyncHandler(async (req, res) => {

  const order = await UserServices.createOrder(req.body.price);

  res.status(order.statusCode).json(order.order);

});

const paymentVerification = async (req, res) => {

  const result = await UserServices.verifyPayment(req.body);

  res.status(result.statusCode).json(result.data);
};

const checkPlanStatus = asyncHandler(async (req, res) => {

  const status = await UserServices.checkPlanStatus(req.body.userId);

  res.status(status.statusCode).json(status.data);

});

const forgotPassword = asyncHandler(async (req, res) => {

  const email = req.body.email;

  try {

    const status = await UserServices.ForgotSendOtp(email);

    res.status(status.statusCode).json(status.data);

  } catch (error) {

    console.error(error);

    res.status(500).json({ status: false, message: "Internal server error" });

  }

});

const verifyForgotOtp = asyncHandler(async (req, res) => {

  const { email, otp } = req.body;

  const user =await UserServices.verifyOtpForgot(email,otp)

  res.status(user.statusCode).json(user.data)

});

const changePassword = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const response = await UserServices.changePassword(email, password);

  res.status(response.statusCode).json(response.data);

});
export {
  authUser,
  registerUser,
  getUserProfile,
  logoutUser,
  getTrainers,
  getTrainer,
  getUserVideos,
  addProfileImage,
  googleLogin,
  editProfile,
  getUserDiets,
  verifyOtp,
  getUserPlans,
  createOrder,
  paymentVerification,
  checkPlanStatus,
  forgotPassword,
  verifyForgotOtp,
  changePassword,
  getUserConferences
};
