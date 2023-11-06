import express from "express";
import multer from "multer";
const router = express.Router();

import {
    logoutTrainer,
    authTrainer,
    getProfile,
    addPost,
    getPosts,
    addVideos,
    getVideos,
    deletePost,
    deleteVideo,
    addDiet,
    getDiets,
    deleteDiet,
    addTrainerProfileImage,
    editTrainerProfile

} from "../controllers/TraninerController.js";

import { protect } from "../middleware/authMiddleware.js";

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only image and video files are allowed."), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

router.post("/login", authTrainer);

router.post("/logout",logoutTrainer);

router.get('/getProfile/:trainerId', protect, getProfile);

router.post('/addPost',protect,upload.single("postImage"),addPost)

router.get('/getPosts/:trainerId', protect, getPosts);

router.post('/addVideo',protect,upload.single("postFile"),addVideos)

router.get('/getVideos/:trainerId', protect,getVideos);

router.post('/deletePost',protect,deletePost)

router.post('/deleteVideo',protect,deleteVideo)

router.post('/add-diet',protect,upload.single("dietImage"),addDiet)

router.get('/get-diets/:trainerId', protect, getDiets);

router.post('/delete-diet',protect,deleteDiet)

router.post('/add-trainer-profile-image',upload.single("trainerImage"),protect,addTrainerProfileImage)

router.post('/update-trainer-profile',protect,editTrainerProfile)

export default router;
