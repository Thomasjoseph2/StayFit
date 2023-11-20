import express from "express";
import multer from "multer";

const router = express.Router();

import {
  authAdmin,
  logoutAdmin,
  users,
  blockUser,
  unblockUser,
  addTrainer,
  getTrainers,
  getAdminVideos,
  approveVideo,
  rejectVideo,
  getDiet,
  approveDiet,
  rejectDiet,
  addPlans,
  getPlans,
  getSubscriptions,
  blockTrainer,
  unBlockTrainer
} from "../controllers/adminController.js";


import { protect } from "../middleware/authMiddleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/login", authAdmin);

router.post("/logout", logoutAdmin);

router.post("/block-user", blockUser);

router.post("/unblock-user", unblockUser);

router.post("/block-trainer", blockTrainer)

router.post("/unblock-trainer", unBlockTrainer);

router.get("/users", protect, users);

router.post("/add-trainer", upload.single("profileImage"), addTrainer);

router.get("/trainers", protect, getTrainers);

router.get("/get-videos", protect, getAdminVideos);

router.post("/approve-video", protect, approveVideo);

router.post("/reject-video", protect, rejectVideo);

router.get("/get-diets", protect, getDiet);

router.post("/approve-diet", protect, approveDiet);

router.post("/reject-diet", protect, rejectDiet);

router.post ('/add-plans',protect,addPlans)

router.get('/get-plans',protect,getPlans)

router.get('/get-subscriptions',protect,getSubscriptions)

// router.route('/profile').get(protect,profile).put(protect,upload.single('file'),updateUserProfile);



export default router;
