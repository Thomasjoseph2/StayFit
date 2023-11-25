import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux/es/hooks/useSelector";
const VideoStream = () => {
  const { liveId } = useParams();
  const { trainerInfo } = useSelector((state) => state.trainerAuth);

  const myMeeting = async (element) => {
    const appID = 1386993773;
    const serverSecret = "9f5a181252a1975976ab3ec06c014321";
    const roomID = liveId;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      'trainer'
    );
    // Create instance object from Kit Token.
    const zp =  ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  
  return (
  <div className="mt-[6%] mb-10 w-full h-auto">
    <div className=" ">
      <div ref={myMeeting} />
    </div>
    
    </div>
  );
};

export default VideoStream;
