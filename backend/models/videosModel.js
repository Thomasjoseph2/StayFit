import mongoose from "mongoose";

const VideosSchema = mongoose.Schema({
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
    },
    videos: [
      {
        videoName: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        specification: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
          default: "pending", 
        },
      }
    ],
  }, { timestamps: true });
  
  
  const Videos = mongoose.model("Videos", VideosSchema);
  
  export default  Videos;
