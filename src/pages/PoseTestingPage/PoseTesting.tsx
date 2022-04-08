import { useRef } from "react";
import { PoseCamera } from "../../components/PoseCamera/PoseCamera";
import { schoolPrograms } from "../../constants";

export function PoseTestingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCapture = () => {};

  return (
    <div className="section pose-testing-page">
      <div className="container">
        <PoseCamera
          pose={schoolPrograms[0].actionTemplates[0].animation[0].pose}
          isSkeletonDrawn={true}
          ref={videoRef}
        />
        <button className="button" onClick={handleCapture}>
          Capture
        </button>
      </div>
    </div>
  );
}
