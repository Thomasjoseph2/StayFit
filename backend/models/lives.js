import mongoose from "mongoose";

const liveSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
  },
  trainerName: {
    type: String,
    required: true,
  },
  lives:[
    {
      title: {
        type: String,
        required: true,
      },
      randomId: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      expired: {
        type: String,
        required: true,
        default:"false"
      },
    }
  ]


});

const Live = mongoose.model("Live", liveSchema);

export default Live;



