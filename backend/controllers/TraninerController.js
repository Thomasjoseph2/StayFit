import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { Types as mongooseTypes } from "mongoose";
import TrainerRepository from "../repositorys/TrainerRepository.js";
import s3Obj from "../utils/s3.js";

const { ObjectId } = mongooseTypes;

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {GetObjectCommand } from "@aws-sdk/client-s3";

//@desc Auth trainer/set token
//@route POST /api/trainer/auth
//@access public

const authTrainer = asyncHandler(async (req, res) => {
  
  const { email, password } = req.body;

  const trainer = await TrainerRepository.findByEmail({ email });

  if (trainer && (await TrainerRepository.matchPasswords(trainer, password))) {

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

  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({ message: "trainer logged out" });
});

const getProfile = asyncHandler(async (req, res) => {

  const trainerId = new ObjectId(req.params.trainerId);

  const trainer = await TrainerRepository.findById(trainerId);

  if (trainer) {

    s3Obj.destroy()

    const getObjectParams = {

      Bucket: process.env.BUCKET_NAME,

      Key: trainer.imageName,

    };

    const command = new GetObjectCommand(getObjectParams);

    const url = await getSignedUrl(s3Obj, command, { expiresIn: 600 });

    const plainTrainer = trainer.toObject();

    plainTrainer.imageUrl = url;
  
    res.status(200).json({ plainTrainer });
    
  }else{

    res.status(401);

    throw new Error("trainer not found");
  }


});

export { logoutTrainer, authTrainer, getProfile };
