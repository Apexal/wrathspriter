import { LandmarkList, Pose } from "@mediapipe/pose";
import { PoseAngle } from "../interfaces/pose";

export const poseManager = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  },
});

// https://google.github.io/mediapipe/solutions/pose.html
poseManager.setOptions({
  modelComplexity: 2,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.75,
});

/** Given a landmark list and a pose angle, calculates the absolute value of the angle. */
export function calculatePoseAngle(
  landmarks: LandmarkList,
  poseAngle: PoseAngle
): number {
  const landmark1 = landmarks[poseAngle.poseIndex1];
  const landmark2 = landmarks[poseAngle.poseIndex2];
  const landmark3 = landmarks[poseAngle.poseIndex3];

  let angleRadians =
    Math.atan2(landmark3.y - landmark2.y, landmark3.x - landmark2.x) -
    Math.atan2(landmark1.y - landmark2.y, landmark1.x - landmark2.x);

  let angleDegrees = angleRadians * (180 / Math.PI);

  if (angleDegrees < 0) {
    angleDegrees += 360;
  }

  return angleDegrees;
}

/** Returns true if the given pose angle is matched by the given pose landmarks. */
export function checkIsPoseAngleWithinRange(
  landmarks: LandmarkList,
  poseAngle: PoseAngle
): boolean {
  const angle = calculatePoseAngle(landmarks, poseAngle);
  return angle >= poseAngle.angleMin && angle <= poseAngle.angleMax;
}

/** Checks whether every pose landmark is visible, which would mean the person is fully in frame. */
export function checkIsFullyInFrame(
  landmarks: LandmarkList,
  visibilityCutoff: number = 0.4
): boolean {
  return !landmarks.some(
    (l, index) =>
      // Ignore where the arms and hands are
      (index < 13 || index > 22) &&
      l.visibility &&
      l.visibility < visibilityCutoff
  );
}

/** Given a list of pose landmarks and pose angles, returns true if every desired angle is matched. */
export function checkIsInPose(
  landmarks: LandmarkList,
  poseAngles: PoseAngle[]
): boolean {
  return poseAngles.every((poseAngle) =>
    checkIsPoseAngleWithinRange(landmarks, poseAngle)
  );
}
