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
  unBlockTrainer,
  unlistPlans,
  activatePlan,
  getSales
} from "../controllers/adminController.js";


import { protectAdmin } from "../middleware/adminAuthMiddleWare.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/login", authAdmin);

router.post("/logout", logoutAdmin);

router.post("/block-user",protectAdmin, blockUser);

router.post("/unblock-user",protectAdmin, unblockUser);

router.post("/block-trainer",protectAdmin, blockTrainer)

router.post("/unblock-trainer",protectAdmin, unBlockTrainer);

router.get("/users",protectAdmin,  users);

router.post("/add-trainer",protectAdmin, upload.single("profileImage"), addTrainer);

router.get("/trainers",protectAdmin,  getTrainers);

router.get("/get-videos", protectAdmin, getAdminVideos);

router.post("/approve-video", protectAdmin, approveVideo);

router.post("/reject-video",protectAdmin,  rejectVideo);

router.get("/get-diets",protectAdmin,  getDiet);

router.post("/approve-diet",protectAdmin,  approveDiet);

router.post("/reject-diet", protectAdmin, rejectDiet);

router.post ('/add-plans',protectAdmin,addPlans)

router.post ('/unlist-plan',protectAdmin,unlistPlans)

router.post('/activate-plan',protectAdmin,activatePlan)

router.get('/get-plans',protectAdmin,getPlans)

router.get('/get-subscriptions',protectAdmin,getSubscriptions)

router.get('/get-sales',protectAdmin,getSales)

// router.route('/profile').get(protect,profile).put(protect,upload.single('file'),updateUserProfile);



export default router;
