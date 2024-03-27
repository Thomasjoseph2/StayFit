import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import TrainerRepository from "../repositorys/TrainerRepository.js";

const protectTrainer = asyncHandler(async (req, res, next) => {
    

    let token;
  
    token = req.cookies.trainerjwt;
  
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        console.log('here',decoded);

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

  const trainerLoginBlockCheck = asyncHandler(async (req, res, next) => {

    const email = req.body.email;
  
    const trainer = await TrainerRepository.findByEmail({ email });
  
    if (!trainer) {
      res.status(403); // Forbidden
  
      throw new Error("please signup to login");
    }
  
    if (trainer.blocked === true) {
      res.status(403); // Forbidden
  
      throw new Error("trainer is blocked. Please contact support for assistance.");
    }
  
    next();
  });
const isTrainerBlocked = asyncHandler(async (req, res, next) => {

  let token;

  token = req.cookies.trainerjwt;


  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const trainer = await TrainerRepository.findById(
        decoded.trainerId

      );

      if (!trainer.blocked) {

        next();

      } else {

        res.cookie("trainerjwt", "", { httpOnly: true, expires: new Date(0) });

        res.status(401);

        throw new Error("blocked by admin");
        
      }
    } catch (error) {
      res.status(401);

      throw new Error("not authorized,invalid token");
    }
  } else {
    res.status(401);

    throw new Error("not authorized,no token");
  }
});
  export {protectTrainer,trainerLoginBlockCheck,isTrainerBlocked}