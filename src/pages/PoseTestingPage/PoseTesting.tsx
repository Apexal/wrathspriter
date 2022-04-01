import { Pose, ResultsListener } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { useCallback, useEffect, useRef } from "react";

export function PoseTestingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const poseRef = useRef<Pose | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onResults = useCallback<ResultsListener>((results) => {
    if (!canvasRef.current) return;

    const canvasCtx = canvasRef.current.getContext("2d");
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    canvasCtx.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = "source-in";
    canvasCtx.fillStyle = "#00FF00";
    canvasCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = "source-in";
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    canvasCtx.restore();
  }, []);

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);
    poseRef.current = pose;

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          // @ts-expect-error
          await pose.send({ image: videoRef.current });
        },
        width: 400,
        height: 400,
      });
      cameraRef.current = camera;
      camera.start();
    }
  }, [onResults, videoRef]);

  return (
    <div className="section pose-testing-page">
      <div className="container">
        <video ref={videoRef} />
        <canvas ref={canvasRef} width="400px" height="400px" />
      </div>
    </div>
  );
}
