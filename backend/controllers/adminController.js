import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
import Trainer from "../models/TrainerModel.js";
import AdminRepository from "../repositorys/AdminRepository.js";
import { randomImageName } from "../utils/randomName.js";
import { goodSizeResize } from "../utils/buffer.js";
import generateUrl from "../utils/generateUrl.js";
const { ObjectId } = mongoose.Types;

//@desc Auth user/set token
//@route POST /api/admin/auth
//@access public

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await AdminRepository.findAdminByEmail(email);

  if (
    admin &&
    (await AdminRepository.matchPasswords(password, admin.password))
  ) {
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
  const users = await AdminRepository.getUsers(); // Fetch all users from the database

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);

    throw new Error("user not found");
  }
});

const getTrainers = asyncHandler(async (req, res) => {
  const trainers = await AdminRepository.getTrainers(); // Fetch all trainers from the database

  if (trainers) {
    res.status(200).json(trainers);
  } else {
    res.status(404);

    throw new Error("trainers not found");
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const userId = new ObjectId(req.body.userId);

  const user = await AdminRepository.findUserById(userId);

  if (user) {
    user.blocked = true;

    await AdminRepository.updateUser(user);

    res.status(200).json({ message: "User blocked successfully" });
  } else {
    res.status(404);

    throw new Error("user not found");
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const userId = new ObjectId(req.body.userId);

  const user = await AdminRepository.findUserById(userId);

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
    name,
    email,
    phone,
    password,
    qualifications,
    experience,
    specialties,
    dob,
    gender,
  } = req.body;

  const TrainerExists = await AdminRepository.findTrainerByEmail(email);

  if (TrainerExists) {
    res.status(400).json("trainer already exists");

    throw new Error("User already exists");
  }

  const buffer= await goodSizeResize(req.file.buffer);

  const imageName= randomImageName();

  await putS3Obj(imageName,req.file.mimetype,buffer)

  const newTrainer = new Trainer({
    name,
    email,
    phone,
    password,
    qualifications,
    experience,
    specialties,
    imageName,
    dob: new Date(dob), 
    gender,
    blocked: false, 
  });

  await AdminRepository.updateTrainer(newTrainer);

  res.status(201).json("Trainer created successfully");
});

const getAdminVideos = asyncHandler(async (req, res) => {
  const postVideos = await AdminRepository.getAdminVideos();

  const videosWithSignedUrls = await Promise.all(postVideos.map(async (trainer) => {
    const videosWithUrls = await Promise.all(trainer.videos.map(async (video) => {
      
    const signedUrl= await generateUrl(video.videoName)
      return {
        ...video.toObject(),
        signedUrl: signedUrl,
      };
    }));

    // Replace trainer's videos array with videos containing signed URLs
    return {
      ...trainer.toObject(),
      videos: videosWithUrls,
    };
  }));


  res.status(200).json({ postVideos: videosWithSignedUrls });
});

const approveVideo=asyncHandler(async(req,res)=>{

  const status=await AdminRepository.approveVideo(req.body.trainerId,req.body.videoId)

  res.status(200).json({status})

})

const rejectVideo=asyncHandler(async(req,res)=>{

  const status=await AdminRepository.rejectVideo(req.body.trainerId,req.body.videoId)

  res.status(200).json({status})

})

const getDiet=asyncHandler(async(req,res)=>{

  const diets = await AdminRepository.getDiets();

  const dietsWithSignedUrls = await Promise.all(diets.map(async (trainer) => {
    const dietsWithUrls = await Promise.all(trainer.diets.map(async (diet) => {

      const signedUrl = await generateUrl(diet.imageName)
      
      return {
        ...diet.toObject(),
        signedUrl: signedUrl,
        trainer:trainer.trainerName
      };
    }));

    return {
      ...trainer.toObject(),
      diets: dietsWithUrls,
    };
  }));


  res.status(200).json({ diets: dietsWithSignedUrls });

})
const approveDiet=asyncHandler(async(req,res)=>{

  const status=await AdminRepository.approveDiet(req.body.trainerId,req.body.dietId)

  if(status.success===true){
    res.status(200).json({status})
  }
else{
  res.status(400).json("failed to approve");

  throw new Error("failed to approve");
}
})
const rejectDiet=asyncHandler(async(req,res)=>{

  const status=await AdminRepository.rejectDiet(req.body.trainerId,req.body.dietId)

  if(status.success===true){
    res.status(200).json({status})
  }
else{
  res.status(400).json("failed to reject");

  throw new Error("failed to reject");
}
 
})

const addPlans=asyncHandler(async(req,res)=>{

  const plan=req.body
  
  const addedPlan=await AdminRepository.addPlans(plan)

  if(addedPlan){
    res.status(200).json({success:true})
  }else{
    res.status(200).json({success:false})
  }
})

const getPlans=asyncHandler(async(req,res)=>{
  const plans =await AdminRepository.getPlans();
  if(plans){
    res.status(200).json(plans)
  }else{
    res.status(400).json("plans not found");

    throw new Error("plans not found");
  }
})

const getSubscriptions=asyncHandler(async(req,res)=>{

  const subscriptions =await AdminRepository.getSubscriptions();
  if(subscriptions){
    res.status(200).json(subscriptions)
  }else{
    res.status(400).json("subscriptions not found");

    throw new Error("plans not found");
  }
})
export {
  authAdmin,
  logoutAdmin,
  users,
  blockUser,
  unblockUser,
  addTrainer,
  getTrainers,
  getAdminVideos,
  rejectVideo,
  approveVideo,
  getDiet,
  rejectDiet,
  approveDiet,
  addPlans,
  getPlans,
  getSubscriptions
};
