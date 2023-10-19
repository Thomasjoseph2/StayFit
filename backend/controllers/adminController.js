import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
import Trainer from "../models/TrainerModel.js";
import AdminRepository from "../repositorys/AdminRepository.js";

const { ObjectId } = mongoose.Types;



//@desc Auth user/set token
//@route POST /api/admin/auth
//@access public


const authAdmin = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

   const admin =await AdminRepository.findAdminByEmail(email)

  if (admin && (await AdminRepository.matchPasswords(password, admin.password))) {

    generateToken(res, admin._id);

    res.status(201).json({

      _id: admin._id,

      name: admin.name,

      email: admin.email,

    });

  } else {

    res.status(401);

    throw new Error("Invalid email or password");

  }
  
});


//@admin logout
//@ route post api/admin/logout
//@access public

const logoutAdmin = asyncHandler(async (req, res) => {

  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({ message: "user logged out" });

});

const users = asyncHandler(async (req, res) => {

    const users = await AdminRepository.getUsers() // Fetch all users from the database

    if(users){

      res.status(200).json(users);

    }else{

      res.status(404);

      throw new Error("user not found");

    }

});

const getTrainers=asyncHandler(async(req,res)=>{

  const trainers = await AdminRepository.getTrainers() // Fetch all trainers from the database

  if(trainers){

    res.status(200).json(trainers);

  }else{

    res.status(404);

    throw new Error("trainers not found");

  }
})

const blockUser = asyncHandler(async (req, res) => {
 
    const userId = new ObjectId(req.body.userId);

    const user = await AdminRepository.findUserById(userId)

    if (user) {

      user.blocked = true;

      await AdminRepository.updateUser(user)

      res.status(200).json({ message: "User blocked successfully" });

    } else {

      res.status(404);

      throw new Error("user not found");
  
    }
  
});

const unblockUser = asyncHandler(async (req, res) => {

  const userId = new ObjectId(req.body.userId);

  const user = await AdminRepository.findUserById(userId)

  if (user) {

    user.blocked = false;

    await AdminRepository.updateUser(user);

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

  const TrainerExists = await AdminRepository.findTrainerByEmail(email)

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
  await AdminRepository.updateTrainer(newTrainer);

  res.status(201).json("Trainer created successfully");
});

export { authAdmin, logoutAdmin, users, blockUser, unblockUser, addTrainer ,getTrainers};
