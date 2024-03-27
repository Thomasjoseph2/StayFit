import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import Trainer from "../models/TrainerModel.js";
import Result from "../models/resultsModel.js";
import Videos from "../models/videosModel.js";
import Diet from "../models/dietModel.js";
import Plan from "../models/plans.js";
import Payments from "../models/payments.js";
import Live from "../models/lives.js";
class UserRepository {
  static instance;

  constructor() {
    if (UserRepository.instance) {
      return UserRepository.instance;
    }

    UserRepository.instance = this;
  }

  async findByEmail(email) {
    return await User.findOne(email);
  }

  async findUserByIdForMiddleWare(userId) {
    return await User.findById(userId).select("-password");
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async addPayment(paymentDetails) {
    try {
      const payment = {
        razorpay_order_id: paymentDetails.razorpay_order_id,
        razorpay_payment_id: paymentDetails.razorpay_payment_id,
        razorpay_signature: paymentDetails.razorpay_signature,
        user_id: paymentDetails.userId,
        user_name: paymentDetails.user_name,
        amount: paymentDetails.price,
        subscribed_plan: paymentDetails.plan,
        subscribed_plan_id: paymentDetails.planId,
      };
      await Payments.create(payment);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to save payment details");
    }
  }

  async findUserById(userId) {
    return await User.findById(userId);
  }

  async matchPasswords(user, enteredPassword) {
    return await user.matchPasswords(enteredPassword);
  }

  async getTrainers() {
    return await Trainer.find({});
  }
  async findActiveLives() {
    const currentDate = new Date();
    const result = await Live.aggregate([
      {
        $match: {
          "lives.date": { $gt: currentDate }, // Match dates greater than the current date
          "lives.time": {
            $gt: currentDate.toLocaleTimeString("en-US", { hour12: false }),
          }, // Match times greater than the current time
        },
      },
      {
        $project: {
          _id: 1,
          lives: {
            $filter: {
              input: "$lives",
              as: "live",
              cond: {
                $and: [
                  { $gt: ["$$live.date", currentDate] },
                  {
                    $gt: [
                      "$$live.time",
                      currentDate.toLocaleTimeString("en-US", {
                        hour12: false,
                      }),
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    ]);
    return result;
  }

  async findActivePlans() {
    try {
      const activePlans = await Plan.find({
        status: "active",
      });

      return activePlans;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserVideos() {
    return await Videos.find({});
  }
  async getUserDiets() {
    return await Diet.find({}).sort({ _id: -1 });
  }

  async getTrainer(trainerId) {
    try {
      const trainer = await Trainer.findById(trainerId);
      return trainer;
    } catch (error) {
      // Handle errors, for example, return a custom error message
      throw new Error("Trainer not found");
    }
  }

  async getPosts(trainerId) {
    try {
      // Find the Result document by trainer ID
      const result = await Result.findOne({ trainer: trainerId });

      if (result) {
        // If the Result document exists, return the posts as an array of objects
        return result.posts.map((post) => {
          return {
            imageName: post.imageName,
            description: post.description,
          };
        });
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

  async getUser(userId) {
    return await User.findById(userId);
  }
  async checkPlanStatus(userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      if (user.subscription_status === "inactive") {
        return false;
      }

      if (user.subscription_expire) {
        const currentDate = new Date();
        const subscriptionExpireDate = user.subscription_expire;
        if (currentDate > subscriptionExpireDate) {
          user.subscription_status = "inactive";
          await user.save();
          return false;
        } else if (user.subscription_status === "active") {
          return true;
        }
      } else {
        console.log("Subscription expire date is undefined for this user.");
        return false;
      }
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");
    }
  }

  async addProfileImage(imageName, userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }
      const exists = user.imagePath;

      user.imagePath = imageName;

      await user.save();
      return exists;
    } catch (error) {
      throw new Error(`Error adding profile image: ${error.message}`);
    }
  }
  async editUser(userId, name, email) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }
      user.name = name;
      user.email = email;
      await user.save();
      return user;
    } catch (error) {
      console.log(error.message);

      throw new Error(`editing failed:${error.message}`);
    }
  }

  async saveOtp(email, otp) {
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            otp: otp,
          },
        },
        { new: true }
      );

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error(`Error saving OTP: ${error.message}`);
    }
  }
  async verifyOtp(email, otp) {
    try {
      const user = await User.findOne({ email });

      if (user && user.otp === otp) {
        return user;
      } else {
        throw new Error("otp verification failed");
      }
    } catch (error) {
      console.log(error);
      throw new Error("otp verification failed");
    }
  }

  async verifyUser(email) {
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            verified: true,
          },
        },
        { new: true }
      );

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error(`Error saving OTP: ${error.message}`);
    }
  }
  async addSubscription(userId, plan, duration) {
    try {
      const currentDate = new Date();
      const expiryDate = new Date();
      expiryDate.setMonth(currentDate.getMonth() + duration);

      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            subscribed_plan: plan,
            subscription_status: "active",
            subscription_expire: expiryDate,
          },
        },
        { new: true }
      );

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error(`Error saving OTP: ${error.message}`);
    }
  }
  async changePassword(email, password) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return false;
      }

      user.password = password;
      await user.save();
      return true;
    } catch (error) {
      console.error("Error resetting password:", error.message);
    }
  }
}

export default new UserRepository();
