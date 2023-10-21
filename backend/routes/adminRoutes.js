import express from "express";
import multer from "multer";


const router = express.Router();

import { authAdmin,logoutAdmin, users,blockUser,unblockUser,addTrainer,getTrainers } from "../controllers/adminController.js";


import { protect } from "../middleware/authMiddleware.js";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.post("/login", authAdmin);
router.post("/logout",logoutAdmin);
router.post("/block-user",blockUser)
router.post("/unblock-user",unblockUser )
router.get("/users", protect ,users)
router.post('/add-trainer',upload.single("profileImage"),addTrainer)
router.get("/trainers",protect,getTrainers)

// router.route('/profile').get(protect,profile).put(protect,upload.single('file'),updateUserProfile);


export default router;
