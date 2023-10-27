import express from "express";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getTrainers,
  getTrainer,
  getUserVideos
} from "../controllers/userController.js";

import { protect,isBlocked,loginBlockCheck } from "../middleware/authMiddleware.js";



router.post("/",  registerUser); 
router.post("/auth",loginBlockCheck, authUser);
router.post("/logout",logoutUser);
router.get('/trainers',getTrainers)
router.get('/getTrainer/:trainerId',getTrainer)
router.get('/get-user-videos',getUserVideos)

export default router;
