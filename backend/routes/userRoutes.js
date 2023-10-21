import express from "express";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getTrainers,
  getTrainer
} from "../controllers/userController.js";

import { protect,isBlocked,loginBlockCheck } from "../middleware/authMiddleware.js";



router.post("/",  registerUser); 
router.post("/auth",loginBlockCheck, authUser);
router.post("/logout",logoutUser);
router.get('/trainers',getTrainers)
router.get('/getTrainer/:trainerId',getTrainer)

export default router;
