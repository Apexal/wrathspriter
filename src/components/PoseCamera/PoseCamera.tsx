import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Pose, ResultsListener, POSE_CONNECTIONS } from "@mediapipe/pose";
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  CSSProperties,
} from "react";
import { PoseAngle } from "../../interfaces/pose";
import { checkIsInPose } from "../../utils/posing";

type PoseCameraPropTypes = {
  isSkeletonDrawn: boolean;
  pose?: PoseAngle[];
};

export const PoseCamera = forwardRef<HTMLVideoElement, PoseCameraPropTypes>(
  ({ pose, isSkeletonDrawn }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const poseRef = useRef<Pose | null>(null);
    const cameraRef = useRef<Camera | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const screenshotCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const [isInPose, setIsInPose] = useState<boolean>(false);

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
      if (!ref) return;
      if (typeof ref === "function") {
        ref(videoRef.current);
      } else {
        ref.current = videoRef.current;
      }
    }, [ref]);

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
