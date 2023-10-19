import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Trainer from "../models/TrainerModel.js";
import bcrypt from "bcryptjs";

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

}

export default new AdminRepository();
