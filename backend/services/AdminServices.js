import asyncHandler from "express-async-handler";
import generateAdminTokken from "../utils/generateAdminToken.js";
import AdminRepository from "../repositorys/AdminRepository.js";
import { randomImageName } from "../utils/randomName.js";
import { goodSizeResize } from "../utils/buffer.js";
import generateUrl from "../utils/generateUrl.js";
import putS3Obj from "../utils/putS3Obj.js";

class AdminServices {
  static instance;

  constructor() {
    if (AdminServices.instance) {
      return AdminServices.instance;
    }

    AdminServices.instance = this;
  }

  adminLogin = asyncHandler(async (email, password, res) => {
    const admin = await AdminRepository.findAdminByEmail(email);

    if (
      admin &&
      (await AdminRepository.matchPasswords(password, admin.password))
    ) {
      generateAdminTokken(res, admin._id);

      return {
        statusCode: 201,
        data: {
          _id: admin._id,

          name: admin.name,

          email: admin.email,
        },
      };
    }
  });

  getUsers = asyncHandler(async () => {
    const users = await AdminRepository.getUsers();

    if (users) {
      return { statusCode: 200, users };
    }
  });

  getTrainers = asyncHandler(async () => {
    const trainers = await AdminRepository.getTrainers();

    if (trainers) {
      return { statusCode: 200, trainers };
    }
  });

  blockUser = asyncHandler(async (userId) => {
    const user = await AdminRepository.findUserById(userId);

    if (user) {
      user.blocked = true;

      await AdminRepository.updateUser(user);

      return { statusCode: 200, message: "User blocked successfully" };
    }
  });

  blockTrainer = asyncHandler(async (trainerId) => {

    const trainer = await AdminRepository.findTrainerById(trainerId);

    if (trainer) {
      trainer.blocked = true;

      await AdminRepository.updateTainerBlock(trainer);

      return { statusCode: 200, message: "User blocked successfully" };
    }
  });

  unblockUser = asyncHandler(async (userId) => {
    const user = await AdminRepository.findUserById(userId);

    if (user) {
      user.blocked = false;

      await AdminRepository.updateUser(user);

      return { statusCode: 200, message: "user unblocked" };
    }
  });

  unblockTrainer = asyncHandler(async (trainerId) => {
    const trainer = await AdminRepository.findTrainerById(trainerId);

    if (trainer) {
      trainer.blocked = false;

      await AdminRepository.updateTainerBlock(trainer);

      return { statusCode: 200, message: "trainer unblocked" };
    }
  });

  addTrainer = asyncHandler(
    async (
      name,
      email,
      phone,
      password,
      qualifications,
      experience,
      specialties,
      dob,
      gender,
      mimetype,
      imgbuffer
    ) => {
      const TrainerExists = await AdminRepository.findTrainerByEmail(email);

      if (TrainerExists) {
        return { statusCode: 400, message: "trainer already exists" };
      }

      const buffer = await goodSizeResize(imgbuffer);

      const imageName = randomImageName();

      await putS3Obj(imageName, mimetype, buffer);

      const newTrainer = {
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
      };

      await AdminRepository.addTrainer(newTrainer);

      return { statusCode: 201, message: "Trainer created successfully" };
    }
  );

  getAdminVideos = asyncHandler(async () => {
    const postVideos = await AdminRepository.getAdminVideos();

    const videosWithSignedUrls = await Promise.all(
      postVideos.map(async (trainer) => {
        const videosWithUrls = await Promise.all(
          trainer.videos.map(async (video) => {
            const signedUrl = await generateUrl(video.videoName);

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

    return { statusCode: 200, videosWithSignedUrls };
  });
  approveVideo = asyncHandler(async (trainerId, videoId) => {
    const status = await AdminRepository.approveVideo(trainerId, videoId);

    return { statusCode: 200, status };
  });

  rejectVideo = asyncHandler(async (trainerId, videoId) => {
    const status = await AdminRepository.rejectVideo(trainerId, videoId);

    return { statusCode: 200, status };
  });

  getDiet = asyncHandler(async () => {
    const diets = await AdminRepository.getDiets();

    const dietsWithSignedUrls = await Promise.all(
      diets.map(async (trainer) => {
        const dietsWithUrls = await Promise.all(
          trainer.diets.map(async (diet) => {
            const signedUrl = await generateUrl(diet.imageName);

            return {
              ...diet.toObject(),

              signedUrl: signedUrl,

              trainer: trainer.trainerName,
            };
          })
        );

        return {
          ...trainer.toObject(),

          diets: dietsWithUrls,
        };
      })
    );

    return { statusCode: 200, diets: dietsWithSignedUrls };
  });

  approveDiet = asyncHandler(async (trainerId, dietId) => {
    const status = await AdminRepository.approveDiet(
      trainerId,

      dietId
    );

    if (status.success === true) {
      return { statusCode: 200, status };
    }
  });

  rejectDiet = asyncHandler(async (req) => {
    const status = await AdminRepository.rejectDiet(
      req.body.trainerId,

      req.body.dietId
    );

    if (status.success === true) {
      return { statusCode: 200, status };
    } else {
      throw new Error("failed to reject");
    }
  });

  addPlans = asyncHandler(async (req) => {
    const plan = req.body;

    const addedPlan = await AdminRepository.addPlans(plan);

    if (addedPlan) {
      return { statusCode: 200, success: true };
    } else {
      return { statusCode: 200, success: false };
    }
  });

  unlistPlans = asyncHandler(async (planId) => {

    const planAdded = await AdminRepository.unlistPlans(planId);

    if (planAdded) {
    
      return { statusCode: 200, success: true };
    } else {
      return { statusCode: 200, success: false };
    }
  });

  activatePlan = asyncHandler(async (planId) => {

    const planAdded = await AdminRepository.activatePlan(planId);

    if (planAdded) {
    
      return { statusCode: 200, success: true };
    } else {
      return { statusCode: 200, success: false };
    }
  });

  getPlans = asyncHandler(async () => {
    const plans = await AdminRepository.getPlans();

    if (plans) {
      return { statusCode: 200, plans };
    } else {
      throw new Error("plans not found");
    }
  });

  getSales = asyncHandler(async () => {
    const sales = await AdminRepository.getSales();
    if (sales) {
      return { statusCode: 200, sales };
    } else {
      throw new Error("plans not found");
    }
  });

  getSubscriptions = asyncHandler(async () => {
    const subscriptions = await AdminRepository.getSubscriptions();

    if (subscriptions) {
      return { statusCode: 200, subscriptions };
    } else {
      throw new Error("subscriptions not found");
    }
  });

  getAdminConferences = asyncHandler(async () => {
    const lives = await AdminRepository.findActiveLives();
    
    if (lives) {
      return { statusCode: 200, lives };
    }
  });

  getCustomRangeData = asyncHandler(async (startDate, endDate) => {
    const data = await AdminRepository.getCustomRangeData(startDate, endDate);
    if (data) {
      
      return { statusCode: 200, sales:data };
    } else {
      throw new Error("data not found");
    }
  });
  
}

export default new AdminServices();
