import otpGenerator from "otp-generator";
import transporter from "../utils/transporter.js";

export const generateOTP = (length) => {
  return otpGenerator.generate(length, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
};

export const configureMailOptions = (email, otp,subject) => {
  return {
    from: process.env.USER_EMAIL,
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for ${subject} is: ${otp}`,
  };
};
