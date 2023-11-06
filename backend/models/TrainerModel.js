import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const TrainerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    qualifications: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    specialties: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"]
    },
    password: {
      type: String,
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

TrainerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

TrainerSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Trainer = mongoose.model("Trainer", TrainerSchema);

export default Trainer;
