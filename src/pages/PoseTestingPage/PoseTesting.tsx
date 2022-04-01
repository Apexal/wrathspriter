import { Pose, POSE_CONNECTIONS, ResultsListener } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { checkIsInPose } from "../../utils/posing";
import { schoolPrograms } from "../../constants";

export function PoseTestingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const poseRef = useRef<Pose | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isInPose, setIsInPose] = useState<boolean>(false);
  const [isSkeletonDrawn, setIsSkeletonDrawn] = useState<boolean>(true);

  /** Callback that draws the silhouette of the user in the camera onto the canvas, with optional pose skeleton. */
  const handleResults = useCallback<ResultsListener>(
    (results) => {
      if (!canvasRef.current) return;

      const canvasCtx = canvasRef.current.getContext("2d");
      if (!canvasCtx) return;

      try {
        canvasCtx.save();

        // Clear the whole canvas
        canvasCtx.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        // Draw the segmentation mask (the silhouette of the detected person)
        canvasCtx.drawImage(
          results.segmentationMask,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        // Draw the image on top of the segmentation mask in source-in mode, so that only the person gets drawn
        canvasCtx.globalCompositeOperation = "source-in";
        canvasCtx.drawImage(
          results.image,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        // Draw the connecting lines and landmarks
        if (isSkeletonDrawn) {
          canvasCtx.globalCompositeOperation = "source-over";
          drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 2,
          });
          drawLandmarks(canvasCtx, results.poseLandmarks, {
            color: "#FF0000",
            lineWidth: 1,
          });
        }

        canvasCtx.restore();

        // TODO: Replace this hardcoded pose
        const pose = schoolPrograms[0].actionTemplates[0].animation[0].pose;

        setIsInPose(checkIsInPose(results.poseLandmarks, pose));
      } catch (error) {
        setIsInPose(false);
      }
    },
    [isSkeletonDrawn]
  );

  /** Create the pose object once. */
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
    poseRef.current = pose;

    return () => {
      poseRef.current?.close();
      poseRef.current = null;
    };
  }, []);

  /** Update the results handler anytime it changes. */
  useEffect(() => {
    if (!poseRef.current) return;
    poseRef.current.onResults(handleResults);
  }, [poseRef, handleResults]);

  /** Create the camera and keep it connected to the video element. */
  useEffect(() => {
    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          // @ts-expect-error
          await poseRef.current?.send({ image: videoRef.current });
        },
        width: 400,
        height: 400,
      });

      cameraRef.current = camera;
      camera.start();
    } else {
      cameraRef.current?.stop();
      cameraRef.current = null;
    }
  }, [videoRef]);

  return (
    <div className="section pose-testing-page">
      <div className="container">
        <h1 className="title">{isInPose ? "T-POSE" : "OUT OF POSE"}</h1>
        <video ref={videoRef} />
        <canvas ref={canvasRef} width="400px" height="400px" />
        <button
          className="button"
          onClick={() => setIsSkeletonDrawn(!isSkeletonDrawn)}
        >
          Toggle Pose Skeleton
        </button>
      </div>
    </div>
  );
}
