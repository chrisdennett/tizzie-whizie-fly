import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useAnimationFrame } from "../hooks/useAnimationFrame";

const videoConstraints = {
  width: 1024,
  height: 768,
};

export const WebcamFrameGrabber = ({ setCurrFrame, isHidden = false }) => {
  const [mediaReady, setMediaReady] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  const webcamRef = useRef(null);

  useAnimationFrame(() => setTickCount((prev) => prev + 1));

  const grabFrame = () => {
    if (!webcamRef || !webcamRef.current) return;
    const frameCanvas = webcamRef.current.getCanvas();
    setCurrFrame(frameCanvas);
  };

  useEffect(grabFrame, [tickCount, webcamRef]);

  const style = isHidden ? { position: "fixed", left: -10000 } : {};

  return (
    <>
      {tickCount}
      {!mediaReady && <h1>LOOKING FOR WEBCAM... PLEASE HOLD</h1>}
      {/* HIDDEN */}

      <Webcam
        onUserMedia={() => setMediaReady(true)}
        audio={false}
        width={videoConstraints.width}
        style={style}
        ref={webcamRef}
        mirrored={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </>
  );
};
