import mongoose from "mongoose";

const ResultSchema = mongoose.Schema({
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
    },
    posts: [
      {
        imageName: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      }
    ],
  }, { timestamps: true });
  
  const Result = mongoose.model("Result", ResultSchema);
  
  export default  Result;
