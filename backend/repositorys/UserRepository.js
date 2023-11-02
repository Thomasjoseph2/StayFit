import User from "../models/userModel.js";
import Trainer from "../models/TrainerModel.js";
import Result from "../models/resultsModel.js";
import Videos from "../models/videosModel.js";
import Diet from "../models/dietModel.js"
class UserRepository {
  async findByEmail(email) {
    return await User.findOne(email);
  }

  async findUserByIdForMiddleWare(userId) {
    return await User.findById(userId).select("-password");
  }

  async createUser(userData) {
    return await User.create(userData);
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
  async getUserVideos() {
    return await Videos.find({});
  }
  async getUserDiets() {
    return await Diet.find({});
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
        // If the Result document doesn't exist, return an empty array
        return [];
      }
    } catch (error) {
      throw error; // Handle any errors that occur during the database operation
    }
  }

  
  
  async getUser(userId) {
    return await User.findById(userId);
  }

  async addProfileImage(imageName, userId) {
    try {
      const user = await User.findById(userId);
      
      if (!user) {
        throw new Error("User not found");
      }
      const exists=user.imagePath;

      user.imagePath = imageName;
      
      await user.save();
      return exists
    } catch (error) {
      throw new Error(`Error adding profile image: ${error.message}`);
    }
  }
  async editUser(userId,name,email){
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }
      user.name=name;
      user.email=email;
      await user.save();
      return user;
    } catch (error) {
      console.log(error.message);
      
      throw new Error (`editing failed:${error.message}`)
      
    }
  }
}

export default new UserRepository();
