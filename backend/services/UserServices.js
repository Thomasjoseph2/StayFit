import UserRepository from "../repositorys/UserRepository.js";
import { generateOTP,configureMailOptions } from "../utils/mailoptions.js";
import transporter from "../utils/transporter.js";

import asyncHandler from "express-async-handler";

class UserService {
    registerUserWithOTP = asyncHandler(async (userData) => {
        const { name, email, password } = userData;
    
        const userExists = await UserRepository.findByEmail({ email });
    
        if (userExists) {
          throw new Error("User already exists");
        }
    
        const user = await UserRepository.createUser({
          name,
          email,
          password,
        });
    
        if (user) {
          const subject = 'registration';
          const otp = generateOTP(6);
          const mailOptions = configureMailOptions(email, otp, subject);
    
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.error(error);
              throw new Error("Error sending OTP");
            } else {
              await UserRepository.saveOtp(email, otp);
            }
          });
    
          return {
            success: true,
            message: "OTP sent successfully. Please check your email for verification.",
          };
        } else {
          throw new Error("Invalid user data");
        }
      });

}

export default new UserService();
