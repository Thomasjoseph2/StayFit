import User from "../models/userModel.js";
import Trainer from "../models/TrainerModel.js";
import Result from "../models/resultsModel.js";
import Videos from "../models/videosModel.js";
class TrainerRepository{

  async findByEmail(email) {

    return await Trainer.findOne(email );
  }

  async matchPasswords(trainer,enteredPassword) {

    return await trainer.matchPasswords(enteredPassword);
    
  }

  async findById(trainerId) {

    return await Trainer.findById(trainerId);
    
  }
  async getPost(trainerId) {

    const post = await Result.findById(trainerId);

  }
  
  async updatePost(trainerId, newPost) {
    try {
      // Find the existing Result document by trainer ID
      let result = await Result.findOne({ trainer: trainerId });

      if (result) {
        // If the Result document exists, add the new post to the existing posts array
        result.posts.push(...newPost.posts);
      } else {
        // If the Result document doesn't exist, create a new one with the new post
        result = new Result(newPost);
      }

      // Save the updated or new Result document to the results collection
      await result.save();

      return result; // Return the updated or newly created Result document if needed
    } catch (error) {
      throw error; // Handle any errors that occur during the database operation
    }
  }
  async getPosts(trainerId) {
    try {
      // Find the Result document by trainer ID
      const result = await Result.findOne({ trainer: trainerId });

      if (result) {
        // If the Result document exists, return the posts as an array of objects
        return result.posts.map(post => {
          return {
            imageName: post.imageName,
            description: post.description,
            postId: post._id // Optionally include the post ID if needed
          };
        });
      } else {
        // If the Result document doesn't exist, return an empty array
        return [];
      }
    } catch (error) {
      throw error; // Handle any errors that occur during the database operation
    }
  }

  async updateVideo(trainerId, newVideo) {
    try {

      // Find the existing video document by trainer ID
      let videos = await Videos.findOne({ trainer: trainerId });

  
      if (videos) {
        videos.videos.push(...newVideo.videos);
      } else {
        // If the video document doesn't exist, create a new one with the new video
        videos = new Videos({ trainer: trainerId, videos: [newVideo] });
      }
  
      // Save the updated or new video document to the videos collection
      await videos.save();
  
      return videos; // Return the updated or newly created video document if needed
    } catch (error) {
      throw error; // Handle any errors that occur during the database operation
    }
  }
  
  async getVideos(trainerId) {
    try {
      // Find the videos document by trainer ID
      const videos = await Videos.findOne({ trainer: trainerId });

      if (videos) {
        // If the videos document exists, return the posts as an array of objects
        return videos.videos.map(post => {
          return {
            videoName: post.videoName,
            description: post.description,
            postId: post._id // Optionally include the post ID if needed
          };
        });
      } else {
        // If the videos document doesn't exist, return an empty array
        return [];
      }
    } catch (error) {
      throw error; // Handle any errors that occur during the database operation
    }
  }
  
}


export default new TrainerRepository();
