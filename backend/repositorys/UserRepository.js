import User from "../models/userModel.js";
import Trainer from "../models/TrainerModel.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

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

  
}

export default new UserRepository();
