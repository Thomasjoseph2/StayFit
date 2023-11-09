import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
    },
    otpExpirationTime: {
      type: Date,
    },
    password: {
      type: String,
    },
    blocked: {
      type: Boolean,
      required: true,
      default:false
    },
    verified: {
      type: Boolean,
      required: true,
      default:false
    },
    subscription_status: {
      type: String,
      required: true,
      default: "Inactive", 
    },
    subscribed_plan: {
      type: String,
      required: true,
      default: "no current plans", 
    },
    subscription_expire: {
      type: Date, 
    },
    imagePath:{
      type:String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

});


userSchema.methods.matchPasswords =async function(enteredPassword){

     return await bcrypt.compare(enteredPassword,this.password)

}
  userSchema.pre('save', function (next) {
    if (this.isModified('subscription_expire') && this.subscription_expire < new Date()) {
      this.subscription_status = 'inactive';
    }
    next();
  });
const User = mongoose.model("User", userSchema);

export default User;
