import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import ReactPlayer from 'react-player'
import peer from "../service/peer";
import { useParams } from "react-router-dom";

const ENDPOINT = "http://localhost:5000";
var socket;
const roompage = () => {
    const { roomId } = useParams()
    const [myStream, setMyStream] = useState(null);
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('videoCall',(roomId))
       // startStreaming();
        return ()=>{
            
        }
    }, [roomId]);

    const startStreaming = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peer.getOffer()
        socket.emit('uservideoCall', { to: id, offer })
        setMyStream(stream)
    }, [roomId]);

    const handleIncomingCall = useCallback(({ from, offer }) => {
        console.log(data);
    }, [])
    return (
        <div className="h-screen bg-gray-800 text-center mt-24 ">
            <div className="h-[40%] bg-white mt-20">
                {myStream && <ReactPlayer muted playing height='300px' width='500px' url={myStream} />}
            </div>
        </div>
    );
};

export default roompage;
