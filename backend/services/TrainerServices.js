import TrainerRepository from "../repositorys/TrainerRepository.js";
import generateTrainerToken from "../utils/generateTrainerTokken.js";
import asyncHandler from "express-async-handler";
import s3Obj from "../utils/s3.js";
import generateUrl from "../utils/generateUrl.js";
import { goodSizeResize } from "../utils/buffer.js";
import { resize } from "../utils/buffer.js";
import { randomImageName } from "../utils/randomName.js";
import putS3Obj from "../utils/puts3Obj.js";
import deletes3Obj from "../utils/deletes3Obj.js";

class TrainerServices {
  static instance;

  constructor() {
    if (TrainerServices.instance) {
      return TrainerServices.instance;
    }

    TrainerServices.instance = this;
  }

  trainerLogin = async (email, password, res) => {
    const trainer = await TrainerRepository.findByEmail({ email });

    if (
      trainer &&
      (await TrainerRepository.matchPasswords(trainer, password))
    ) {
      generateTrainerToken(res, trainer._id);

      const image = await generateUrl(trainer.imageName);

      return {
        statusCode: 201,

        data: {
          _id: trainer._id,

          name: trainer.name,

          email: trainer.email,

          imageName: image,

          blocked: trainer.blocked,
        },
      };
    }
  };

  getProfile = asyncHandler(async (trainerId) => {
    const trainer = await TrainerRepository.findById(trainerId);

    if (trainer) {
      const url = await generateUrl(trainer.imageName);

      const plainTrainer = trainer.toObject();

      plainTrainer.imageUrl = url;

      return { statusCode: 200, plainTrainer };
    }
  });

  addPost = asyncHandler(
    async (description, trainerId, imgbuffer, mimetype) => {
      const buffer = await resize(imgbuffer);

      const imageName = randomImageName();

      await putS3Obj(imageName, mimetype, buffer);

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

      return { statusCode: 201, message: "post created successfully" };
    }
  );
  getPosts = asyncHandler(async (trainerId) => {
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
      return { statusCode: 200, postsWithUrl };
    }
  });
  addVideos = asyncHandler(
    async (
      description,
      specification,
      trainersId,
      trainerName,
      videoName,
      mimetype,
      buffer
    ) => {
      s3Obj.destroy();

      await putS3Obj(videoName, mimetype, buffer);

      const newVideo = {
        trainer: trainersId,

        trainerName: trainerName,

        videos: [
          {
            videoName: videoName,

            specification: specification,

            description: description,
          },
        ],
      };

      await TrainerRepository.updateVideo(trainersId, newVideo);

      return { statusCode: 201, message: "video uploaded successfully" };
    }
  );

  getVideos = asyncHandler(async (trainerId) => {
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

      return { statusCode: 200, videosWithUrl };
    }
  });

  deletePost = asyncHandler(async (selectedPostId, trainer, imageName) => {
    const response = await TrainerRepository.deletePost(
      selectedPostId,
      trainer
    );

    if (response.success === true) {
      await deletes3Obj(imageName);

      return { statusCode: 201, message: "post deleted successfully" };
    } else if (response.success === false) {
      return { statusCode: 401, message: "post not found" };
    }
  });

  deleteVideo = asyncHandler(async (postId, trainer,name) => {

    const response = await TrainerRepository.deleteVideo(
      postId,
      trainer,
      name
    );

    if (response.success === true) {
      await deletes3Obj(name);

      return { statusCode: 200, message: "video deleted successfully" };
    } else if (response.success === false) {
      return { statusCode: 401, message: "video not found" };
    }
  });

  addDiet = asyncHandler(
    async (
      description,
      trainerId,
      category,
      dietType,
      trainerName,
      imgbuffer,
      mimetype
    ) => {
      const imageName = randomImageName();

      const buffer = await resize(imgbuffer);

      await putS3Obj(imageName, mimetype, buffer);

      const newDiet = {
        trainer: trainerId,

        trainerName: trainerName,

        diets: [
          {
            imageName: imageName,

            description: description,

            category: category,

            dietType: dietType,
          },
        ],
      };

      await TrainerRepository.updateDiet(trainerId, newDiet);

      return { statusCode: 201, message: "diet created successfully" };
    }
  );

  getLives=asyncHandler(async(trainerId)=>{
    const lives = await TrainerRepository.getLives(trainerId);
    return { statusCode: 200, lives };
  })

  getDiets = asyncHandler(async (trainerId) => {
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

      return { statusCode: 200, dietsWithUrl };
    }
  });
  deleteDiet = asyncHandler(async (selectedDietId, trainer, name) => {

    
    const response = await TrainerRepository.deleteDiet(
      selectedDietId,
      trainer
    );

    if (response.success === true) {

      await deletes3Obj(name);

      return { statusCode: 201, message: "post deleted successfully" };
    } else if (response.success === false) {
      return { statusCode: 401, message: "post not found" };
    } else {
      throw new Error("posts not found"); // Send error response as JSON
    }
  });

  deleteLive = asyncHandler(async (trainerId, liveId) => {

    
    const response = await TrainerRepository.deleteLive(
      trainerId,
      liveId
    );

    if (response.success === true) {

      return { statusCode: 201, message: "live deleted successfully" };
    } else if (response.success === false) {
      return { statusCode: 401, message: "live not found" };
    } else {
      throw new Error("posts not found"); // Send error response as JSON
    }
  });
  addProfileImage = asyncHandler(async (trainerId, imgbuffer, mimetype) => {
    const buffer = await goodSizeResize(imgbuffer);

    const imageName = randomImageName();

    const exists = await TrainerRepository.addProfileImage(
      imageName,
      trainerId
    );

    if (exists) {
      await deletes3Obj(exists);
    }

    await putS3Obj(imageName, mimetype, buffer);

    return { statusCode: 200, message: "profile photo updated " };
  });
  editTrainer = asyncHandler(async (trainerDetails) => {
    const trainer = await TrainerRepository.editTrainer(trainerDetails);

    if (trainer) {
      return { statusCode: 200, trainer };
    }
  });

  addLive = asyncHandler(async (liveObj) => {

    const live={
      trainer:liveObj.trainer,
      trainerName:liveObj.trainerName,
      lives:[{
        title:liveObj.title,
        randomId:liveObj.randomId,
        date:liveObj.date,
        time:liveObj.time,
      }]
    }

    const addLive = await TrainerRepository.addLive(liveObj.trainer,live);

    if (addLive) {
      return { statusCode: 200, addLive };
    }
  });

  editDiet = asyncHandler(
    async (trainer, dietId, category, dietType, description) => {
      const response = await TrainerRepository.editDiet(
        trainer,
        dietId,
        category,
        dietType,
        description
      );

      if (response.success === true) {
        return { statusCode: 200, response };
      }
    }
  );
}

export default new TrainerServices();
