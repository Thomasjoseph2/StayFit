import express from "express";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
} from "../controllers/userController.js";

import { protect,isBlocked,loginBlockCheck } from "../middleware/authMiddleware.js";



router.post("/",  registerUser); 
router.post("/auth",loginBlockCheck, authUser);
router.post("/logout",logoutUser);

export default router;
