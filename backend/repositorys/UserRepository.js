import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async updateUser(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }


  async matchPasswords(email,enteredPassword) {

    const user= await this.findByEmail(email)

    return await user.matchPasswords(enteredPassword);
    
  }

  
}

export default new UserRepository();
