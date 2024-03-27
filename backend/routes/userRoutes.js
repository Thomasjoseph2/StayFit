import express from "express";
import multer from "multer";
const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getTrainers,
  getTrainer,
  getUserVideos,
  getUserProfile,
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


} from "../controllers/userController.js";

import { createRoom,getRooms,chatSend,getMessages } from "../controllers/chatController.js";

import { protect,isBlocked,loginBlockCheck } from "../middleware/authMiddleware.js";

const storage = multer.memoryStorage()
const uploadProfile = multer({ storage: storage })


router.post("/",  registerUser); 

router.post("/auth",loginBlockCheck, authUser);

router.post("/google-login", googleLogin);

router.post("/logout",logoutUser);

router.get('/trainers',getTrainers)

router.get('/getTrainer/:trainerId',protect,isBlocked,getTrainer)

router.get('/get-user-videos',getUserVideos)

router.get('/get-userprofile/:userId',protect,isBlocked,getUserProfile);

router.post('/add-profile-image',protect,isBlocked,uploadProfile.single("profileImage"),addProfileImage)

router.post('/update-profile',protect,isBlocked,editProfile)

router.get('/get-user-diets',getUserDiets)

router.post('/otp-verification',verifyOtp)

router.get('/get-user-plans',isBlocked,protect,getUserPlans)

router.get('/get-user-conferences',isBlocked,protect,getUserConferences)

router.post('/create-order',protect,createOrder)

router.post('/verify-payment',protect,paymentVerification)

router.post('/check-plan-status',protect,checkPlanStatus)

router.post('/forgot-password',forgotPassword)

router.post('/forgot-otp-verification',verifyForgotOtp)

router.post('/change-password',changePassword)

//chat routes

router.post('/get-or-createroom',createRoom)

router.get('/getrooms/:userId',isBlocked,getRooms)

router.post('/send-message',chatSend)

router.get('/get-room-messages/:roomid',isBlocked,getMessages)




export default router;
