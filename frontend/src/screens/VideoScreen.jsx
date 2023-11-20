import React,{useState} from "react";
import AddVideos from "../components/trainerComponent/AddVideos";
import ShowVideos from "../components/trainerComponent/ShowVideos";
import VideosHoc from "../components/trainerComponent/VideosHoc";
const VideoScreen = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);

  return (
    <>
      <div>
        <AddVideos refreshPosts={() => setRefreshPosts(prev => !prev)} />
      </div>
      <div>
        <VideosHoc refreshTrigger={refreshPosts} />
      </div>
    </>
  );
};

export default VideoScreen;
