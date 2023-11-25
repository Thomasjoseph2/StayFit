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
    editDiet,
    addLive,
    getLives,
    deleteLive

} from "../controllers/TraninerController.js";
import { getTrainerRooms,chatSend,getMessages ,createTrainerRoom} from "../controllers/chatController.js";
import { protectTrainer,trainerLoginBlockCheck ,isTrainerBlocked} from "../middleware/trainerMiddleware.js";
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

router.post("/login",trainerLoginBlockCheck, authTrainer);

router.post("/logout",logoutTrainer);

router.get('/getProfile/:trainerId',protectTrainer,isTrainerBlocked, getProfile);

router.post('/addPost',protectTrainer,isTrainerBlocked,upload.single("postImage"),addPost)

router.get('/getPosts/:trainerId',protectTrainer,isTrainerBlocked,getPosts);

router.post('/addVideo',protectTrainer,isTrainerBlocked,upload.single("postFile"),addVideos)

router.get('/getVideos/:trainerId',isTrainerBlocked,protectTrainer, getVideos);

router.post('/deletePost',isTrainerBlocked,protectTrainer,deletePost)

router.post('/deleteVideo',isTrainerBlocked,protectTrainer,deleteVideo)

router.post('/add-diet',isTrainerBlocked,protectTrainer,upload.single("dietImage"),addDiet)

router.get('/get-diets/:trainerId',isTrainerBlocked,protectTrainer, getDiets);

router.post('/delete-diet',protectTrainer,deleteDiet)

router.post('/add-trainer-profile-image',protectTrainer,upload.single("trainerImage"),addTrainerProfileImage)

router.post('/update-trainer-profile',protectTrainer,editTrainerProfile)

router.post('/update-diet',protectTrainer,editDiet)

router.post('/add-live',protectTrainer,addLive)

router.post('/delete-live',protectTrainer,deleteLive)


router.get('/get-lives/:trainerId',protectTrainer,getLives)



router.post('/get-or-create-trainer-room',protectTrainer,isTrainerBlocked,createTrainerRoom)
router.get('/get-trainer-rooms/:trainer',protectTrainer,isTrainerBlocked,getTrainerRooms)
router.post('/send-message',protectTrainer,isTrainerBlocked,chatSend)

router.get('/get-room-messages/:roomid',protectTrainer,isTrainerBlocked,getMessages)

export default router;
