import express from "express";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getTrainers
} from "../controllers/userController.js";

import { protect,isBlocked,loginBlockCheck } from "../middleware/authMiddleware.js";



router.post("/",  registerUser); 
router.post("/auth",loginBlockCheck, authUser);
router.post("/logout",logoutUser);
router.get('/trainers',protect,isBlocked,getTrainers)

export default router;
