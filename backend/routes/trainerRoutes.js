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
    editTrainerProfile,
    editDiet

} from "../controllers/TraninerController.js";
import { getTrainerRooms,chatSend,getMessages ,createTrainerRoom} from "../controllers/chatController.js";
import { protectTrainer } from "../middleware/trainerMiddleware.js";
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

router.get('/getProfile/:trainerId',protectTrainer,  getProfile);

router.post('/addPost',protectTrainer,upload.single("postImage"),addPost)

router.get('/getPosts/:trainerId',protectTrainer,getPosts);

router.post('/addVideo',protectTrainer,upload.single("postFile"),addVideos)

router.get('/getVideos/:trainerId',protectTrainer, getVideos);

router.post('/deletePost',protectTrainer,deletePost)

router.post('/deleteVideo',protectTrainer,deleteVideo)

router.post('/add-diet',protectTrainer,upload.single("dietImage"),addDiet)

router.get('/get-diets/:trainerId',protectTrainer, getDiets);

router.post('/delete-diet',protectTrainer,deleteDiet)

router.post('/add-trainer-profile-image',protectTrainer,upload.single("trainerImage"),addTrainerProfileImage)

router.post('/update-trainer-profile',protectTrainer,editTrainerProfile)

router.post('/update-diet',protectTrainer,editDiet)


router.post('/get-or-create-trainer-room',protectTrainer,createTrainerRoom)
router.get('/get-trainer-rooms/:trainer',protectTrainer,getTrainerRooms)
router.post('/send-message',protectTrainer,chatSend)

router.get('/get-room-messages/:roomid',protectTrainer,getMessages)

export default router;
