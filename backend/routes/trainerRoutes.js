import express from "express";

const router = express.Router();

import {
    logoutTrainer,
    authTrainer

} from "../controllers/TraninerController.js";

import { protect } from "../middleware/authMiddleware.js";



router.post("/login", authTrainer);

router.post("/logout",logoutTrainer);


export default router;
