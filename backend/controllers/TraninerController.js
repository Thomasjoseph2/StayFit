import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { Types as mongooseTypes } from "mongoose";
import TrainerRepository from "../repositorys/TrainerRepository.js";

const { ObjectId } = mongooseTypes;


//@desc Auth trainer/set token
//@route POST /api/trainer/auth
//@access public

 const authTrainer= asyncHandler(async (req, res) => {

    const { email, password } = req.body;
  
    const trainer = await TrainerRepository.findByEmail({ email });
  
    if (trainer && (await TrainerRepository.matchPasswords(trainer,password))) {
  
      generateToken(res, trainer._id);
  
      res.status(201).json({

        _id: trainer._id,
  
        name: trainer.name,
  
        email: trainer.email,

        blocked: trainer.blocked,
  
      });
  
    } else {
  
      res.status(401);
  
      throw new Error("Invalid email or password");
  
    }
  });

//@trainer logout
//@ route post api/trainer/logout
//@access public

const logoutTrainer = asyncHandler(async (req, res) => {

  console.log("hiiiiiiii");

    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  
    res.status(200).json({ message: "trainer logged out" });
  
  });


  export { logoutTrainer,authTrainer };