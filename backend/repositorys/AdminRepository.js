import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Trainer from "../models/TrainerModel.js";
import bcrypt from "bcryptjs";
import Videos from "../models/videosModel.js";

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

  async getUsers(){
    return await User.find({});
  }

  async getTrainers(){
    return await Trainer.find({});
  }

  async findUserById(userId){
    
    return await User.findById(userId)
  }

  async updateUser(user) {
    
    await user.save();
  }

  async updateTrainer(newTrainer) {
    
    await newTrainer.save();
  }
  async getAdminVideos(){

    return  await Videos.find({})
  
    }
    async approveVideo(trainerId, videoId) {
      try {

        console.log(trainerId,videoId);
        const trainer = await Trainer.findById(trainerId);
        if (!trainer) {
          // Trainer not found
          return { success: false, message: "Trainer not found." };
        }

        
    
        const videoIndex = trainer.videos.findIndex((video) => video._id.toString() === videoId);
        if (videoIndex === -1) {
          // Video not found
          return { success: false, message: "Video not found." };
        }
    
        // Update video status to 'approved'
        trainer.videos[videoIndex].status = "approved";
        await trainer.save();
    
        return { success: true, message: "Video approved successfully." };
      } catch (error) {
        // Handle error
        console.error(error);
        return { success: false, message: "Internal server error." };
      }
    }
    
    async rejectVideo(trainerId, videoId) {
      try {
        const trainer = await Trainer.findById(trainerId);
        if (!trainer) {
          // Trainer not found
          return { success: false, message: "Trainer not found." };
        }
    
        const videoIndex = trainer.videos.findIndex((video) => video._id.toString() === videoId);
        if (videoIndex === -1) {
          // Video not found
          return { success: false, message: "Video not found." };
        }
    
        // Update video status to 'rejected'
        trainer.videos[videoIndex].status = "rejected";
        await trainer.save();
    
        return { success: true, message: "Video rejected successfully." };
      } catch (error) {
        // Handle error
        console.error(error);
        return { success: false, message: "Internal server error." };
      }
    }
    
}

export default new AdminRepository();
