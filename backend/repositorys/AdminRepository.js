import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Trainer from "../models/TrainerModel.js";
import bcrypt from "bcryptjs";
import Videos from "../models/videosModel.js";
import Diet from "../models/dietModel.js";
import Plan from "../models/plans.js";
import Payment from "../models/payments.js";
class AdminRepository {
  async findAdminByEmail(email) {
    return await Admin.findOne({ email });
  }

  async findByEmail(email) {
    return await Admin.findOne({ email });
  }

  async findTrainerByEmail(email) {
    return await Trainer.findOne({ email });
  }

  async matchPasswords(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }

  async getUsers() {
    return await User.find({});
  }
  async getPlans() {
    return await Plan.find({}).sort({ _id: -1 });
  }
  async getSubscriptions() {
    return await Payment.find({}).sort({ _id: -1 });
  }
  async getTrainers() {
    return await Trainer.find({}).sort({ _id: -1 });
  }

  async findUserById(userId) {
    return await User.findById(userId);
  }

  async updateUser(user) {
    await user.save();
  }

  async addPlans(plan) {
    return await Plan.create(plan);
  }

  async updateTrainer(newTrainer) {
    await newTrainer.save();
  }
  async addTrainer(newTrainer) {
    return await Trainer.create(newTrainer);
  }
  async getAdminVideos() {
    return await Videos.find({});
  }
  async getDiets() {
    return await Diet.find({});
  }

  async approveVideo(trainerId, videoId) {
    try {
      // Find the video document with the trainer ID and video ID inside the videos array
      const video = await Videos.findOneAndUpdate(
        {
          trainer: trainerId,
          "videos._id": videoId,
        },
        {
          $set: {
            "videos.$.status": "approved",
          },
        },
        { new: true }
      );

      if (!video) {
        // Video not found
        return { success: false, message: "Video not found." };
      }

      return { success: true, message: "Video approved successfully." };
    } catch (error) {
      // Handle error
      console.error(error);
      return { success: false, message: "Internal server error." };
    }
  }
  async approveDiet(trainerId, dietId) {
    try {
      // Find the video document with the trainer ID and video ID inside the videos array
      const diet = await Diet.findOneAndUpdate(
        {
          trainer: trainerId,
          "diets._id": dietId,
        },
        {
          $set: {
            "diets.$.status": "approved",
          },
        },
        { new: true }
      );

      if (!diet) {
        // Diet not found
        return { success: false, message: "Diet not found." };
      }

      return { success: true, message: "Diet approved successfully." };
    } catch (error) {
      // Handle error
      console.error(error);
      return { success: false, message: "Internal server error." };
    }
  }

  async rejectVideo(trainerId, videoId) {
    try {
      // Find the video document with the trainer ID and video ID inside the videos array
      const video = await Videos.findOneAndUpdate(
        {
          trainer: trainerId,
          "videos._id": videoId,
        },
        {
          $set: {
            "videos.$.status": "rejected",
          },
        },
        { new: true }
      );

      if (!video) {
        // Video not found
        return { success: false, message: "Video not found." };
      }

      return { success: true, message: "Video rejected successfully." };
    } catch (error) {
      // Handle error
      console.error(error);
      return { success: false, message: "Internal server error." };
    }
  }
  async rejectDiet(trainerId, dietId) {
    try {
      // Find the video document with the trainer ID and video ID inside the videos array
      const diet = await Diet.findOneAndUpdate(
        {
          trainer: trainerId,
          "diets._id": dietId,
        },
        {
          $set: {
            "diets.$.status": "rejected",
          },
        },
        { new: true }
      );

      if (!diet) {
        // diet not found
        return { success: false, message: "diet not found." };
      }

      return { success: true, message: "Diet rejected successfully." };
    } catch (error) {
      // Handle error
      console.error(error);
      return { success: false, message: "Internal server error." };
    }
  }
}

export default new AdminRepository();
