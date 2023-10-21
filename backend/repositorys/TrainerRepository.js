import User from "../models/userModel.js";
import Trainer from "../models/TrainerModel.js";

class TrainerRepository{

  async findByEmail(email) {

    return await Trainer.findOne(email );
  }

  async matchPasswords(trainer,enteredPassword) {

    return await trainer.matchPasswords(enteredPassword);
    
  }

  async findById(trainerId) {

    return await Trainer.findById(trainerId);
    
  }
  

//   async findUserByIdForMiddleWare(userId){
    
//     return await User.findById(userId).select('-password');
//   }

//   async createUser(userData) {

//     return await User.create(userData);
//   }


//   async findUserById(userId){
    
//     return await User.findById(userId)
//   }


//   async matchPasswords(user,enteredPassword) {

//     return await user.matchPasswords(enteredPassword);
    
//   }

  
}

export default new TrainerRepository();
