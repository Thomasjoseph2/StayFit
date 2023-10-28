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
  addProfileImage
} from "../controllers/userController.js";

import { protect,isBlocked,loginBlockCheck } from "../middleware/authMiddleware.js";
const storage = multer.memoryStorage()
const uploadProfile = multer({ storage: storage })


router.post("/",  registerUser); 
router.post("/auth",loginBlockCheck, authUser);
router.post("/logout",logoutUser);
router.get('/trainers',getTrainers)
router.get('/getTrainer/:trainerId',getTrainer)
router.get('/get-user-videos',getUserVideos)
router.get('/get-userprofile/:userId', protect, getUserProfile);
router.post('/add-profile-image',protect,uploadProfile.single("profileImage"),addProfileImage)

export default router;
