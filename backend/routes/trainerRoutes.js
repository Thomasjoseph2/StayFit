import express from "express";

const router = express.Router();

import {
    logoutTrainer,
    authTrainer,
    getProfile

} from "../controllers/TraninerController.js";

import { protect } from "../middleware/authMiddleware.js";



router.post("/login", authTrainer);

router.post("/logout",logoutTrainer);

router.get('/getProfile/:trainerId', protect, getProfile);



export default router;
