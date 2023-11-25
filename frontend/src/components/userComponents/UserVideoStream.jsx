import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux/es/hooks/useSelector";
const UserVideoStream = () => {
  const { liveId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const myMeeting = async (element) => {
    const appID = 1386993773;
    const serverSecret = "9f5a181252a1975976ab3ec06c014321";
    const roomID = liveId;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      userInfo.name
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
  <div className="mt-[6%] mb-10   ">
    <div className="  ">
      <div className="h-screen" ref={myMeeting} />
    </div>
    
    </div>
  );
};

export default UserVideoStream;
