import "dotenv/config.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import asyncHandler from "express-async-handler";

import { OAuth2Client } from "google-auth-library";

import generateToken from "../utils/generateToken.js";
import UserRepository from "../repositorys/UserRepository.js";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

import s3Obj from "../utils/s3.js";

import { randomImageName } from "../utils/randomName.js";
import { goodSizeResize } from "../utils/buffer.js";

const googleClient = new OAuth2Client(
  "714641682565-959gsh23k6n5qflfoeb419s7g3pntjrk.apps.googleusercontent.com"
);
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

const googleLogin = asyncHandler(async (req, res) => {
  const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience:
      "714641682565-959gsh23k6n5qflfoeb419s7g3pntjrk.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();

  const name = payload.name;
  const email = payload.email;

  console.log(name, email);

  const userExists = await UserRepository.findByEmail({ email });

  if (userExists !== null) {
    generateToken(res, userExists._id);

    res.status(201).json({
      _id: userExists._id,

      name: userExists.name,

      email: userExists.email,

      blocked: userExists.blocked,
    });
  } else {
    const user = await UserRepository.createUser({ name, email });

    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,

        name: user.name,

        email: user.email,

        blocked: user.blocked,
      });
    } else {
      res.status(400);
      throw new Error("cant create user");
    }
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
    s3Obj.destroy();

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
  let plainTrainer;

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

const getUserVideos = asyncHandler(async (req, res) => {
  const postVideos = await UserRepository.getUserVideos();

  const videosWithSignedUrls = await Promise.all(
    postVideos.map(async (trainer) => {
      const videosWithUrls = await Promise.all(
        trainer.videos.map(async (video) => {
          const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: video.videoName,
          };

          const command = new GetObjectCommand(getObjectParams);

          const signedUrl = await getSignedUrl(s3Obj, command, {
            expiresIn: 600,
          });

          // Append signed URL to the video object
          return {
            ...video.toObject(),
            signedUrl: signedUrl,
          };
        })
      );

      // Replace trainer's videos array with videos containing signed URLs
      return {
        ...trainer.toObject(),
        videos: videosWithUrls,
      };
    })
  );

  res.status(200).json({ postVideos: videosWithSignedUrls });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const finduser = await UserRepository.getUser(req.params.userId);

  if (finduser) {
    if (finduser.imagePath) {
      s3Obj.destroy();

      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,

        Key: finduser.imagePath,
      };
      const command = new GetObjectCommand(getObjectParams);

      const url = await getSignedUrl(s3Obj, command, { expiresIn: 600 });

      const user = finduser.toObject();

      user.imageUrl = url;

      res.status(200).json({ user });
    } else {
      const user = finduser.toObject();

      res.status(200).json({ user });
    }
  } else {
    res.status(401);

    throw new Error("user not found");
  }
});

const addProfileImage = asyncHandler(async (req, res) => {
  
  const buffer = await goodSizeResize(req.file.buffer);

  const imageName = randomImageName();

  const exists = await UserRepository.addProfileImage(
    imageName,
    req.body.userId
  );
  if (exists) {
    const deleteParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: exists,
    };
    const deleteCommand = new DeleteObjectCommand(deleteParams);

    await s3Obj.send(deleteCommand);
  }
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: imageName,
    Body: buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3Obj.send(command);

  res.status(200).json({ message: "profile photo updated " });
});

const editProfile=asyncHandler(async (req,res)=>{

  const {userId,name,email}=req.body

  const user=await UserRepository.editUser(userId,name,email)

  if(user){
     res.status(200).json({ user});
  }else{
    res.status(401);

    throw new Error("something went wrong");
  }
})
const getUserDiets = asyncHandler(async (req, res) => {
  const postDiets = await UserRepository.getUserDiets();

  const dietsWithSignedUrls = await Promise.all(
    postDiets.map(async (trainer) => {
      const dietsWithUrls = await Promise.all(
        trainer.diets.map(async (diet) => {
          const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: diet.imageName,
          };

          const command = new GetObjectCommand(getObjectParams);

          const signedUrl = await getSignedUrl(s3Obj, command, {
            expiresIn: 600,
          });

          // Append signed URL to the diet object
          return {
            ...diet.toObject(),
            signedUrl: signedUrl,
          };
        })
      );

      // Replace trainer's diets array with diets containing signed URLs
      return {
        ...trainer.toObject(),
        diets: dietsWithUrls,
      };
    })
  );

  res.status(200).json({ postDiets: dietsWithSignedUrls });
});
export {
  authUser,
  registerUser,
  getUserProfile,
  logoutUser,
  profile,
  getTrainers,
  getTrainer,
  getUserVideos,
  addProfileImage,
  googleLogin,
  editProfile,
  getUserDiets
};
