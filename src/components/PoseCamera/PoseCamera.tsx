import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { ResultsListener, POSE_CONNECTIONS } from "@mediapipe/pose";
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  CSSProperties,
  useImperativeHandle,
} from "react";
import { PoseAngle } from "../../interfaces/pose";
import { checkIsInPose, poseManager } from "../../utils/posing";

export type PoseCameraRef = {
  captureScreenshot: () => string | null;
};

type PoseCameraPropTypes = {
  isSkeletonDrawn: boolean;
  pose?: PoseAngle[];
  handleInPoseChange?: (isInPose: boolean) => void;
};

export const PoseCamera = forwardRef<PoseCameraRef, PoseCameraPropTypes>(
  ({ pose, isSkeletonDrawn, handleInPoseChange }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const cameraRef = useRef<Camera | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const screenshotCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const [isInPose, setIsInPose] = useState<boolean>(false);

    /** Capture a FULL screenshot of the video and return it as a data URL. */
    const captureScreenshot = useCallback(() => {
      if (!videoRef.current) return null;

      const video = videoRef.current;

      let canvasWidth = video.videoWidth;
      let canvasHeight = video.videoHeight;

      if (!screenshotCanvasRef.current) {
        screenshotCanvasRef.current = document.createElement("canvas");
        screenshotCanvasRef.current.width = canvasWidth;
        screenshotCanvasRef.current.height = canvasHeight;
      }

      const ctx = screenshotCanvasRef.current.getContext("2d");
      if (!ctx) return null;

      ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight);

      return screenshotCanvasRef.current.toDataURL("image/png");
    }, []);

    // Expose the captureScreenshot method to parents via ref
    useImperativeHandle(ref, () => ({
      captureScreenshot,
    }));

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

          if (pose) {
            if (checkIsInPose(results.poseLandmarks, pose)) {
              setIsInPose(true);
              canvasCtx.font = "30px sans-serif";
              canvasCtx.fillText("IN POSE", 10, 60);
            } else {
              setIsInPose(false);
            }
          } else {
            setIsInPose(false);
          }
        } catch (error) {
          setIsInPose(false);
        }
      },
      [isSkeletonDrawn, pose]
    );

    useEffect(() => {
      if (handleInPoseChange) {
        handleInPoseChange(isInPose);
      }
    }, [handleInPoseChange, isInPose]);

    /** Update the results handler anytime it changes. */
    useEffect(() => {
      if (!poseManager) return;
      poseManager.onResults(handleResults);
    }, [handleResults]);

    /** Create the camera and keep it connected to the video element. */
    useEffect(() => {
      if (videoRef.current) {
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            // @ts-expect-error
            await poseManager.send({ image: videoRef.current });
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

    const style: CSSProperties = {};
    if (isInPose) {
      style.border = "1px solid green";
    }

    return (
      <>
        <video ref={videoRef} className="is-hidden" />
        <canvas style={style} ref={canvasRef} width="400px" height="400px" />
      </>
    );
  }
);