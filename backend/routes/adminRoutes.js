import express from "express";

const router = express.Router();

import { authAdmin,logoutAdmin, users,blockUser,unblockUser } from "../controllers/adminController.js";


import { protect } from "../middleware/authMiddleware.js";


router.post("/login", authAdmin);
router.post("/logout",logoutAdmin);
router.post("/block-user",blockUser)
router.post("/unblock-user",unblockUser )
router.get("/users",users)


// router.route('/profile').get(protect,profile).put(protect,upload.single('file'),updateUserProfile);


export default router;
