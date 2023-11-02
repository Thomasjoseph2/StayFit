import mongoose from "mongoose";

const DietSchema = mongoose.Schema({
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
    },
    trainerName: {
      type: String,
      required: true,
    },
    diets: [
      {
        imageName: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        category: {
            type: String,
            required: true,
          },
          dietType: {
            type: String,
            required: true,
          },
          status: {
            type: String,
            required: true,
            default:'pending'
          },
      }
    ],
  }, { timestamps: true });
  
  const Diet = mongoose.model("Diet", DietSchema);
  
  export default  Diet;
