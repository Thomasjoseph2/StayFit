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

router.post('/addPost',upload.single("postImage"),addPost)

router.get('/getPosts/:trainerId',  getPosts);

router.post('/addVideo',upload.single("postFile"),addVideos)

router.get('/getVideos/:trainerId', getVideos);

router.post('/deletePost',deletePost)

router.post('/deleteVideo',deleteVideo)

router.post('/add-diet',upload.single("dietImage"),addDiet)

router.get('/get-diets/:trainerId',  getDiets);

router.post('/delete-diet',deleteDiet)

router.post('/add-trainer-profile-image',upload.single("trainerImage"),addTrainerProfileImage)

router.post('/update-trainer-profile',editTrainerProfile)

router.post('/update-diet',editDiet)


router.post('/get-or-create-trainer-room',createTrainerRoom)
router.get('/get-trainer-rooms/:trainer',getTrainerRooms)
router.post('/send-message',chatSend)

router.get('/get-room-messages/:roomid',getMessages)

export default router;
