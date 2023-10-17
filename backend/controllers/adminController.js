import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { Types as mongooseTypes } from "mongoose";
import Trainer from "../models/TrainerModel.js";
const { ObjectId } = mongooseTypes;


//@desc Auth user/set token
//@route POST /api/users/auth
//@access public

const authAdmin = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPasswords(password))) {

    generateToken(res, admin._id);

    res.status(201).json({
      _id: admin._id,

      name: admin.name,

      email: admin.email,

      image: admin.imagePath,

    });

  } else {

    res.status(401);

    throw new Error("Invalid email or password");

  }
});

//@user logout
//@ route post api/users/logout
//@access public

const logoutAdmin = asyncHandler(async (req, res) => {

  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({ message: "user logged out" });

});

const users = asyncHandler(async (req, res) => {


    const users = await User.find({}); // Fetch all users from the database

    if(users){

      res.status(200).json(users);

    }else{

      res.status(404);

      throw new Error("user not found");

    }

});

const getTrainers=asyncHandler(async(req,res)=>{

  const trainers = await Trainer.find({}); // Fetch all trainers from the database

  if(trainers){

    res.status(200).json(trainers);

  }else{

    res.status(404);

    throw new Error("trainers not found");

  }
})

const blockUser = asyncHandler(async (req, res) => {
  
    const userId = new ObjectId(req.body.userId);

    const user = await User.findById(userId);

    if (user) {

      user.blocked = true;

      await user.save();

      res.status(200).json({ message: "User blocked successfully" });

    } else {

      res.status(404);

      throw new Error("user not found");
  
    }
  
});

const unblockUser = asyncHandler(async (req, res) => {

  const userId = new ObjectId(req.body.userId);

  const user = await User.findById(userId);

  if (user) {

    user.blocked = false;

    await user.save();

    res.status(200).json({ message: "user unblocked" });

  } else {

    res.status(404);

    throw new Error("user not found");

  }

});

const addTrainer = asyncHandler(async (req, res) => {

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    qualifications,
    experience,
    specialties,
    dob,
    gender,
  } = req.body;

  const TrainerExists = await Trainer.findOne({ email });

  if (TrainerExists) {

    res.status(400).json("trainer already exists");

    throw new Error("User already exists");
    
  }

  // Create a new Trainer instance using the Trainer model
  const newTrainer = new Trainer({
    firstName,
    lastName,
    email,
    phone,
    password, 
    qualifications,
    experience,
    specialties,
    dob: new Date(dob), // Assuming dob is a string in the format 'YYYY-MM-DD'
    gender,
    blocked: false, // Assuming blocked should be set to false by default
  });

  // Save the new trainer to the database
  await newTrainer.save();

  res.status(201).json("Trainer created successfully");
});

export { authAdmin, logoutAdmin, users, blockUser, unblockUser, addTrainer ,getTrainers};
