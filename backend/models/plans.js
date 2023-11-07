import mongoose from "mongoose";
const planSchema = mongoose.Schema(
  {
    plan: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
        default:"active"
      },
  },
  { timestamps: true }
);


const Plan = mongoose.model("Plan", planSchema);

export default Plan;
