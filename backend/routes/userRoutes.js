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
  checkPlanStatus
} from "../controllers/userController.js";

import { protect,isBlocked,loginBlockCheck } from "../middleware/authMiddleware.js";

const storage = multer.memoryStorage()
const uploadProfile = multer({ storage: storage })


router.post("/",  registerUser); 

router.post("/auth",loginBlockCheck, authUser);

router.post("/google-login", googleLogin);

router.post("/logout",logoutUser);

router.get('/trainers',getTrainers)

router.get('/getTrainer/:trainerId',getTrainer)

router.get('/get-user-videos',getUserVideos)

router.get('/get-userprofile/:userId', protect, getUserProfile);

router.post('/add-profile-image',protect,uploadProfile.single("profileImage"),addProfileImage)

router.post('/update-profile',protect,editProfile)

router.get('/get-user-diets',getUserDiets)

router.post('/otp-verification',verifyOtp)

router.get('/get-user-plans',protect,getUserPlans)

router.post('/create-order',protect,createOrder)

router.post('/verify-payment',protect,paymentVerification)

router.post('/check-plan-status',protect,checkPlanStatus)


export default router;
