import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Trainer from "../models/TrainerModel.js";
import bcrypt from "bcryptjs";
import Videos from "../models/videosModel.js";
import Diet from "../models/dietModel.js";
import Plan from "../models/plans.js";
import Payment from "../models/payments.js";
import Live from "../models/lives.js";
class AdminRepository {
  static instance;

  constructor() {
    if (AdminRepository.instance) {
      return AdminRepository.instance;
    }

    AdminRepository.instance = this;
  }

  async findAdminByEmail(email) {
    return await Admin.findOne({ email });
  }
  async findById(adminId) {
    return await Admin.findById(adminId);
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
  async findTrainerById(trainerId) {
    return await Trainer.findById(trainerId);
  }
  async updateUser(user) {
    await user.save();
  }
  async updateTainerBlock(trainer) {
    await trainer.save();
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

  async findActiveLives(){
    const result = await Live.find({});
    return result;
  }

  async unlistPlans(planId) {
    try {
      const plan = await Plan.findOneAndUpdate(
        { _id: planId },
        { $set: { status: 'unlisted' } },
        { new: true } 
      );
  
      if (!plan) {
        throw new Error("Plan not found");
      }
      return plan;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to unlist plan");
    }
  }

  async activatePlan(planId) {
    try {
      const plan = await Plan.findOneAndUpdate(
        { _id: planId },
        { $set: { status: 'active' } },
        { new: true } 
      );
  
      if (!plan) {
        throw new Error("Plan not found");
      }
      return plan;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to unlist plan");
    }
  }
  async getSales() {
    const currentYear = new Date().getFullYear();
  
    const aggregatePipeline = [
      {
        $project: {
          month: { $month: "$createdAt" },
          amount: "$amount",
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
            year: "$year",
          },
          totalMonthlySales: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $group: {
          _id: null,
          totalAllTimeSales: { $sum: "$totalMonthlySales" },
          totalCurrentYearSales: {
            $sum: {
              $cond: [
                { $eq: ["$_id.year", currentYear] },
                "$totalMonthlySales",
                0,
              ],
            },
          },
          monthlySales: { $push: "$$ROOT" },
        },
      },
    ];
  
    try {
      const result = await Payment.aggregate(aggregatePipeline);
      const noOfUsers = await User.countDocuments();
      const noOfTrainers = await Trainer.countDocuments();
      return { result, noOfTrainers, noOfUsers };
    } catch (error) {
      console.error(error);
    }
  }

  async getCustomRangeData(startDate, endDate) {
    // Convert the start and end dates to Date objects
    const startDay = new Date(startDate);
    const endDay = new Date(endDate);
  
    // Set the time part of both start and end dates to midnight
    startDay.setUTCHours(0, 0, 0, 0);
    endDay.setUTCHours(23, 59, 59, 999);
  
    const aggregatePipeline = [
      {
        $match: {
          createdAt: {
            $gte: startDay,
            $lte: endDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCustomSales: { $sum: "$amount" },
        },
      },
    ];
  
    try {
      const result = await Payment.aggregate(aggregatePipeline);
      return { data: result }
    } catch (error) {
      console.error(error);
      return { statusCode: 500, error: "Internal server error" };
    }
  }
  
  
  
  
  
  
}

export default new AdminRepository();
