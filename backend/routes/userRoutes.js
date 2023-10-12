import express from "express";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  profile,
  updateUserProfile,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";



router.post("/", registerUser); 
router.post("/auth", authUser);
router.post("/logout",logoutUser);

export default router;
