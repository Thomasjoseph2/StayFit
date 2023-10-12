import express from "express";

const router = express.Router();

import { authAdmin,logoutAdmin, users,deleteUser,updateUser } from "../controllers/adminController.js";


import { protect } from "../middleware/authMiddleware.js";


router.post("/login", authAdmin);
router.post("/logout",logoutAdmin);
router.post("/delete",deleteUser)
router.get("/users",users)
router.put("/updateUser",updateUser)

// router.route('/profile').get(protect,profile).put(protect,upload.single('file'),updateUserProfile);


export default router;
