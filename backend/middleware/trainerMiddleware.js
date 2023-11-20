import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import TrainerRepository from "../repositorys/TrainerRepository.js";

const protectTrainer = asyncHandler(async (req, res, next) => {

    let token;
  
    token = req.cookies.trainerjwt;
  
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

  
        req.trainer = await TrainerRepository.findById(decoded.trainerId);
  
        next();
      } catch (error) {
        res.status(401);
  
        throw new Error("not authorizes,invalid token");
      }
    } else {
      res.status(401);
  
      throw new Error("not authorizes,no token");
    }
  });


  export {protectTrainer}