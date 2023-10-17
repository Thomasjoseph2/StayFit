import express from "express";

const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";
import { format } from "morgan";


router.post("/login", authTrainer);
router.post("/logout",logoutTrainer);


// router.route('/profile').get(protect,profile).put(protect,upload.single('file'),updateUserProfile);


export default router;
