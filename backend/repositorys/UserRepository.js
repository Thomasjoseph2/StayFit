import User from "../models/userModel.js";
import Trainer from "../models/TrainerModel.js";
import Result from "../models/resultsModel.js";

class UserRepository {
  async findByEmail(email) {
    return await User.findOne(email );
  }

  async findUserByIdForMiddleWare(userId){
    
    return await User.findById(userId).select('-password');
  }

  async createUser(userData) {
    return await User.create(userData);
  }


  async findUserById(userId){
    
    return await User.findById(userId)
  }


  async matchPasswords(user,enteredPassword) {


    return await user.matchPasswords(enteredPassword);
    
  }

  async getTrainers(){

    return await Trainer.find({});
    
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
        return result.posts.map(post => {
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

  
}

export default new UserRepository();
