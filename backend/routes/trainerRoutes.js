import express from "express";
import multer from "multer";
const router = express.Router();

import {
    logoutTrainer,
    authTrainer,
    getProfile,
    addPost,
    getPosts

} from "../controllers/TraninerController.js";

import { protect } from "../middleware/authMiddleware.js";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post("/login", authTrainer);

router.post("/logout",logoutTrainer);

router.get('/getProfile/:trainerId', protect, getProfile);

router.post('/addPost',protect,upload.single("postImage"),addPost)

router.get('/getPosts/:trainerId', protect, getPosts);



export default router;
