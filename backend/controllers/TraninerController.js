import "dotenv/config.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { Types as mongooseTypes } from "mongoose";
import TrainerRepository from "../repositorys/TrainerRepository.js";
import s3Obj from "../utils/s3.js";
import { goodSizeResize, resize } from "../utils/buffer.js";
import { randomImageName } from "../utils/randomName.js";
import generateUrl from "../utils/generateUrl.js";
import deletes3Obj from "../utils/deletes3Obj.js";
import putS3Obj from "../utils/puts3Obj.js";
const { ObjectId } = mongooseTypes;

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

    const url = await generateUrl(trainer.imageName);

    const plainTrainer = trainer.toObject();

    plainTrainer.imageUrl = url;

    res.status(200).json({ plainTrainer });
  } else {
    res.status(401);

    throw new Error("trainer not found");
  }
});

const addPost = asyncHandler(async (req, res) => {

  const { description, trainerId } = req.body;

  const buffer= await resize(req.file.buffer);

  const imageName = randomImageName();

  await putS3Obj(imageName,req.file.mimetype,buffer)

  const newPost = {
    trainer: trainerId,
    posts: [
      {
        imageName: imageName,
        description: description,
      },
    ],
  };

  await TrainerRepository.updatePost(trainerId, newPost);

  res.status(201).json("post created successfully");
});

const getPosts = asyncHandler(async (req, res) => {

  const trainerId = new ObjectId(req.params.trainerId);

  const posts = await TrainerRepository.getPosts(trainerId);

  if (posts) {

    const postsWithUrl = await Promise.all(

      posts.map(async (post) => {

        const url = await generateUrl(post.imageName);

        return {
          ...post,
          imageUrl: url,
        };

      })
    );

    res.status(200).json(postsWithUrl);
  } else {
    res.status(401);

    throw new Error("posts not found"); // Send error response as JSON
  }
});

const addVideos = asyncHandler(async (req, res) => {
  try {
    s3Obj.destroy();

    const { description,specification, trainerId,trainerName } = req.body;

    const trainersId = new ObjectId(trainerId);

    const buffer = req.file.buffer;

    const videoName = req.file.originalname; 

    await putS3Obj(videoName,req.file.mimetype,buffer)

    const newVideo = {
      trainer: trainersId,
      trainerName:trainerName,
      videos: [
        {
          videoName: videoName,
          specification:specification,
          description: description,
        },
      ],
    };

    await TrainerRepository.updateVideo(trainersId, newVideo);

    res.status(201).json("video uploaded successfully");
  } catch (error) {
    console.log(error);

    res.status(500);

    throw new Error("failed to add video"); // Send error response as JSON
  }
});

const getVideos = asyncHandler(async (req, res) => {
  const trainerId = new ObjectId(req.params.trainerId);

  const videos = await TrainerRepository.getVideos(trainerId);

  if (videos) {
    const videosWithUrl = await Promise.all(

      videos.map(async (video) => {

        const url = await generateUrl(video.videoName);

        return {
          ...video,
          videoUrl: url,
        };
      })
    );

    res.status(200).json(videosWithUrl);
  } else {
    res.status(401);

    throw new Error("posts not found"); 
  }
});

const deletePost=asyncHandler(async(req,res)=>{

  const response=await TrainerRepository.deletePost(req.body.selectedPostId,req.body.trainer);

  if(response.success===true){

   await deletes3Obj(req.body.imageName)

    res.status(201).json({message:'post deleted successfully'})

  }

  else if (response.success===false) {

    res.status(401).json({message:'post not found'})
    
  }
else{

  res.status(401);

  throw new Error("posts not found"); // Send error response as JSON
}

}
)


const deleteVideo = asyncHandler(async(req,res)=>{

  const response=await TrainerRepository.deleteVideo(req.body.postId,req.body.trainer);

  if(response.success===true){

    await deletes3Obj(req.body.videoName)

    res.status(201).json({message:'video deleted successfully'})

  }

  else if (response.success===false) {

    res.status(401).json({message:'video not found'})
    
  }
else{

  res.status(401);

  throw new Error("posts not found"); // Send error response as JSON
}
  
})

const addDiet=asyncHandler(async(req,res)=>{

  const { description, trainerId,category,dietType,trainerName} = req.body;

  const buffer= await resize(req.file.buffer);

  const imageName = randomImageName();

  await putS3Obj(imageName,req.file.mimetype,buffer)

  const newDiet = {
    trainer: trainerId,
    trainerName:trainerName,
    diets: [
      {
        imageName: imageName,
        description: description,
        category:category,
        dietType:dietType
      },
    ],
  };

  await TrainerRepository.updateDiet(trainerId, newDiet);

  res.status(201).json("dietcreated successfully");
})

const getDiets=asyncHandler(async(req,res)=>{

   const trainerId = new ObjectId(req.params.trainerId);

  const diets = await TrainerRepository.getDiets(trainerId);

  if (diets) {

    const dietsWithUrl = await Promise.all(

      diets.map(async (diet) => {

        const url = await generateUrl(diet.imageName);

        return {
          ...diet,
          imageUrl: url,
        };

      })
    );

    res.status(200).json(dietsWithUrl);
  } else {
    res.status(401);

    throw new Error("posts not found"); 
  }
})

const deleteDiet=asyncHandler(async(req,res)=>{
 
  const response=await TrainerRepository.deleteDiet(req.body.selectedDietId,req.body.trainer);

  if(response.success===true){

    await deletes3Obj(req.body.imageName)

    res.status(201).json({message:'post deleted successfully'})

  }

  else if (response.success===false) {

    res.status(401).json({message:'post not found'})
    
  }
else{

  res.status(401);

  throw new Error("posts not found"); // Send error response as JSON
}
})

const addTrainerProfileImage=asyncHandler(async(req,res)=>{

  const buffer = await goodSizeResize(req.file.buffer)

  const imageName = randomImageName();

  const exists = await TrainerRepository.addProfileImage(
    imageName,
    req.body.trainerId
  );

  if (exists) {

    await deletes3Obj(exists)
  }

  await putS3Obj(imageName,req.file.mimetype,buffer)

  res.status(200).json({ message: "profile photo updated " });

})

const editTrainerProfile=asyncHandler(async (req,res)=>{

  const trainerDetails=req.body;

  const trainer=await TrainerRepository.editTrainer(trainerDetails)

  if(trainer){
     res.status(200).json({ trainer});
  }else{
    res.status(401);

    throw new Error("something went wrong");
  }
})

const editDiet=asyncHandler(async (req,res)=>{


  const { trainer, dietId, category, dietType, description } = req.body;

  const response=await TrainerRepository.editDiet(trainer, dietId, category, dietType, description)

  if(response.success===true){
     res.status(200).json({response});
  }else{
    res.status(401);

    throw new Error("something went wrong");
  }
})

export {
  logoutTrainer,
  authTrainer,
  getProfile,
  addPost,
  getPosts,
  addVideos,
  getVideos,
  deletePost,
  deleteVideo,
  addDiet,
  getDiets,
  deleteDiet,
  addTrainerProfileImage,
  editTrainerProfile,
  editDiet
};
