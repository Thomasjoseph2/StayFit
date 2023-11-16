import UserRepository from "../repositorys/UserRepository.js";
import { generateOTP, configureMailOptions } from "../utils/mailoptions.js";
import generateToken from "../utils/generateToken.js";
import transporter from "../utils/transporter.js";
import { OAuth2Client } from "google-auth-library";
import asyncHandler from "express-async-handler";
import s3Obj from "../utils/s3.js";
import generateUrl from "../utils/generateUrl.js";
import { goodSizeResize } from "../utils/buffer.js";
import { randomImageName } from "../utils/randomName.js";
import putS3Obj from "../utils/puts3Obj.js";
import deletes3Obj from "../utils/deletes3Obj.js";
import instance from "../utils/instance.js";
import crypto from "crypto";
import util from "util";

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
 
      const subject = "registration";
 
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
 
        message:
 
        "OTP sent successfully. Please check your email for verification.",
 
      };
 
    } else {
 
      throw new Error("Invalid user data");
 
    }
 
  });

  userLogin = async (email, password, res) => {
 
    const user = await UserRepository.findByEmail({ email });

    if (
 
      user &&
 
      (await UserRepository.matchPasswords(user, password)) &&
 
      user.verified === true
 
      ) {
 
        generateToken(res, user._id);

      return {

        statusCode: 201,

        data: {

          _id: user._id,

          name: user.name,

          email: user.email,

          blocked: user.blocked,

        },

      };

    } else if (!user.verified === true) {

      return { statusCode: 401, data: { message: "Verify your email" } };

    } else {

      return {

        statusCode: 401,

        data: { message: "Invalid email or password" },

      };

    }

  };


  googleLogin = asyncHandler(async (token, res) => {
  
    const googleClient = new OAuth2Client(process.env.GOOGLE_KEY);

    const ticket = await googleClient.verifyIdToken({
  
      idToken: token,
  
      audience: process.env.GOOGLE_KEY,
  
    });
  
    const payload = ticket.getPayload();

    const name = payload.name;

    const email = payload.email;

    const userExists = await UserRepository.findByEmail({ email });

    if (userExists !== null) {
  
      generateToken(res, userExists._id);

      return {
  
        statusCode: 201,
  
        data: {
  
          _id: userExists._id,
  
          name: userExists.name,
  
          email: userExists.email,
  
          blocked: userExists.blocked,
  
        },
  
      };
  
    } else {
  
      const user = await UserRepository.createUser({ name, email });

      if (user) {
  
        generateToken(res, user._id);

        return {
  
          statusCode: 201,
  
          data: {
  
            _id: user._id,
  
            name: user.name,
  
            email: user.email,
  
            blocked: user.blocked,
  
          },
  
        };
  
      } else {
  
        return { statusCode: 400, data: { message: "Cannot create user" } };
  
      }
  
    }
  
  });

  getTrainers = asyncHandler(async () => {
  
    const trainers = await UserRepository.getTrainers();


    if (trainers) {

      s3Obj.destroy();

      const trainersWithUrls = await Promise.all(

        trainers.map(async (trainer) => {

          const url = await generateUrl(trainer.imageName);

          return {

            ...trainer.toObject(),

            imageUrl: url,

          };

        })

        );

        return {

          statusCode: 200,

          trainersWithUrls,

        };

      }

    });

  getTrainer = asyncHandler(async (trainerId) => {

    let plainTrainer;

    const trainer = await UserRepository.getTrainer(trainerId);

    if (trainer) {

      s3Obj.destroy();

      const url = await generateUrl(trainer.imageName);

      plainTrainer = trainer.toObject();

      plainTrainer.imageUrl = url;

      const posts = await UserRepository.getPosts(trainerId);

      const postsWithUrl = await Promise.all(

        posts.map(async (post) => {

          const url = await generateUrl(post.imageName);

          return {
            ...post,
            imageUrl: url,

          };

        })

        );

        return { statusCode: 200, plainTrainer, postsWithUrl };

      } else {

        res.status(404).json({ message: "Trainer not found" });

      }

    });

  getUserVideos = asyncHandler(async (req, res) => {

    const postVideos = await UserRepository.getUserVideos();

    const videosWithSignedUrls = await Promise.all(

      postVideos.map(async (trainer) => {

        const videosWithUrls = await Promise.all(

          trainer.videos.map(async (video) => {

            const signedUrl = await generateUrl(video.videoName);


            return {
              ...video.toObject(),
              signedUrl: signedUrl,
            
            };
          
          })
        
          );

        // Replace trainer's videos array with videos containing signed URLs
        return {
          ...trainer.toObject(),
          videos: videosWithUrls,
        };
      })
    
      );
    
      return { statusCode: 200, videosWithSignedUrls };
  
    });

  getUser = asyncHandler(async (userId) => {
  
    const finduser = await UserRepository.getUser(userId);

    if (finduser) {
 
      if (finduser.imagePath) {
 
        const url = await generateUrl(finduser.imagePath);

        const user = finduser.toObject();

        user.imageUrl = url;

        // res.status(200).json({ user });
        return { statusCode: 200, user };
 
      } else {
 
        const user = finduser.toObject();

        // res.status(200).json({ user });
        return { statusCode: 200, user };
 
      }
 
    } else {
 
      throw new Error("user not found");
 
    }
 
  });

  addProfileImage = asyncHandler(async (imgBuffer, userId, mimetype) => {
 
    const buffer = await goodSizeResize(imgBuffer);
 
    const imageName = randomImageName();

    const exists = await UserRepository.addProfileImage(imageName, userId);

    if (exists) {

      await deletes3Obj(exists);

    }

    await putS3Obj(imageName, mimetype, buffer);

    return { statusCode: 200, message: "profile photo updated " };

  });

  editUser = asyncHandler(async (userId, name, email) => {

    const user = await UserRepository.editUser(userId, name, email);

    if (user) {

      return { statusCode: 200, user };

    } else {

      throw new Error("user not found");

    }

  });

  getUserDiets = asyncHandler(async (req, res) => {

    const postDiets = await UserRepository.getUserDiets();

    const dietsWithSignedUrls = await Promise.all(

      postDiets.map(async (trainer) => {

        const dietsWithUrls = await Promise.all(

          trainer.diets.map(async (diet) => {

            const signedUrl = await generateUrl(diet.imageName);


            return {
              ...diet.toObject(),
              signedUrl: signedUrl,
            
            };
          })

        );

        return {
          ...trainer.toObject(),
          diets: dietsWithUrls,
        };
   
      })
   
      );
    return { statusCode: 200, dietsWithSignedUrls };
 
  });

  verifyOtp = asyncHandler(async (email, otp, res) => {
 
    const user = await UserRepository.verifyOtp(email, otp);

    if (user) {
 
      const user = await UserRepository.verifyUser(email);

      generateToken(res, user._id);

      return {
        statusCode: 201,
        data: {
          _id: user._id,

          name: user.name,

          email: user.email,

          blocked: user.blocked,
        },
      };
    }
  });

  findActivePlans = asyncHandler(async () => {
 
    const plans = await UserRepository.findActivePlans();
 
    if (plans) {
 
      return { statusCode: 200, plans };
 
    }
 
  });

  createOrder = asyncHandler(async (price) => {
 
    var options = {
 
      amount: Number(price * 100),
 
      currency: "INR",
 
      receipt: "order_rcptid_11" + Date.now(),
 
    };
 
    const order = await instance.orders.create(options);
 
    if (order) {
 
      return { statusCode: 200, order };
 
    }
 
  });

 
  verifyPayment = asyncHandler(async (data) => {
 
    const {
 
      razorpay_order_id,
 
      razorpay_payment_id,
 
      razorpay_signature,
 
      plan,
 
      userId,
 
      duration,
 
    } = data;

    const generated_signature = crypto
 
    .createHmac("sha256", process.env.KEY_SECRET)
 
    .update(razorpay_order_id + "|" + razorpay_payment_id)
 
    .digest("hex");


    
    if (generated_signature === razorpay_signature) {
    
      await UserRepository.addPayment(data);
    
      await UserRepository.addSubscription(userId, plan, duration);
    
      return {
    
        statusCode: 200,
    
    
        data: { success: true, message: "Payment verified successfully" },
    
      };
    
    } else {
  
      return {
  
        statusCode: 400,
  
        data: { success: true, message: "Invalid payment signature" },
  
      };
  
    }
  
  });

  checkPlanStatus = asyncHandler(async (userId) => {
  
    const status = await UserRepository.checkPlanStatus(userId);


    if (status) {
    
      return { statusCode: 200, data: { status: true } };
    
    } else if (!status) {
    
      return { statusCode: 200, data: { status: false } };
    
    }
  
  });

  ForgotSendOtp = asyncHandler(async (email) => {
  
    const status = await UserRepository.findByEmail({ email });

    if (status) {
  
      const subject = "forgot password";
  
      const otp = generateOTP(6);
  
      const mailOptions = configureMailOptions(email, otp, subject);

      // Convert transporter.sendMail into a promise
      const sendMailAsync = util
  
      .promisify(transporter.sendMail)
  
      .bind(transporter);

  
      try {
  
        await sendMailAsync(mailOptions);
  
        await UserRepository.saveOtp(email, otp);
  
        return { statusCode: 200, data: { status: true } };
  
      } catch (error) {
  
        console.error(error);
  
        throw new Error("Error sending OTP");
  
      }
  
    } else {
  
      return { statusCode: 404, data: { status: false } };
  
    }
  
  });


  changePassword = asyncHandler(async (email, password) => {
  
    const response = await UserRepository.changePassword(email, password);
  
    if (response) {
  
      return { statusCode: 200, data: { status: "success" } };
  
    } else {
      throw new Error("password updation failed");
    }
  });

  verifyOtpForgot = asyncHandler(async (email, otp) => {
  
    const user = await UserRepository.verifyOtp(email, otp);

    if (user) {
  
      return { statusCode: 200, data: { status: "success" } };
  
    } else {
  
      throw new Error("verification failed");
  
    }
  
  });
}

export default new UserService();
