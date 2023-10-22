import 'dotenv/config.js'
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import UserRepository from "../repositorys/UserRepository.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

import s3Obj from '../utils/s3.js';

import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

//@desc Auth user/set token
//@route POST /api/users/auth
//@access public

const authUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await UserRepository.findByEmail({ email });

  if (user && (await UserRepository.matchPasswords(user, password))) {

    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,

      name: user.name,

      email: user.email,

      blocked: user.blocked,
    });
  } else {
    res.status(401);

    throw new Error("Invalid email or password");
  }
});

//@desc new user registration
//route POST api/users
//@access public

const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  const userExists = await UserRepository.findByEmail({ email });

  if (userExists) {
    res.status(400);

    throw new Error("User already exists");
  }

  const user = await UserRepository.createUser({
    name,
    email,
    password,
    blocked: false,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,

      name: user.name,

      email: user.email,

      blocked: user.blocked,
    });
  } else {
    res.status(401);

    throw new Error("Invalid user data");
  }
});

//@user logout
//@ route post api/users/logout
//@access public

const logoutUser = asyncHandler(async (req, res) => {

  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

  res.status(200).json({ message: "user logged out" });
});

//@user get user profile
//@ route GET api/users/profile
//@access private(need to have access and the valid tokken)

const profile = asyncHandler(async (req, res) => {

  const user = {

    _id: req.user._id,

    name: req.user.name,

    email: req.user.email,
  };

  res.status(200).json(user);
});

const getTrainers = asyncHandler(async (req, res) => {

    const trainers = await UserRepository.getTrainers();

    if (trainers) {

      s3Obj.destroy()
  
      const trainersWithUrls = await Promise.all(

        trainers.map(async (trainer) => {

          const getObjectParams = {

            Bucket: process.env.BUCKET_NAME,

            Key: trainer.imageName,
          };

          const command = new GetObjectCommand(getObjectParams);

          const url = await getSignedUrl(s3Obj, command, { expiresIn: 600 });

          return {
            ...trainer.toObject(),

            imageUrl: url,

          };

        })

      );

      res.status(200).json(trainersWithUrls);

    } else {

      res.status(401);

      throw new Error("Invalid user data");

    }

});

const getTrainer = asyncHandler(async (req, res) => {
  let plainTrainer; // Declare plainTrainer variable outside the if block

  const trainerId = new ObjectId(req.params.trainerId);
  const trainer = await UserRepository.getTrainer(trainerId);

  if (trainer) {
    s3Obj.destroy();

    const getObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: trainer.imageName,
    };
    const command = new GetObjectCommand(getObjectParams);

    const url = await getSignedUrl(s3Obj, command, { expiresIn: 600 });

    plainTrainer = trainer.toObject();
    plainTrainer.imageUrl = url;

    const posts = await UserRepository.getPosts(trainerId);

    const postsWithUrl = await Promise.all(
      posts.map(async (post) => {
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: post.imageName,
        };

        const command = new GetObjectCommand(getObjectParams);

        const url = await getSignedUrl(s3Obj, command, { expiresIn: 600 });

        return {
          ...post,
          imageUrl: url,
        };
      })
    );

    res.status(200).json({ plainTrainer, postsWithUrl });
  } else {
    res.status(404).json({ message: "Trainer not found" });
  }
});

export { authUser, registerUser, logoutUser, profile, getTrainers, getTrainer };
