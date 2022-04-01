export interface PoseAngle {
  /** The index of the pose landmark on the outside of the angle. */
  poseIndex1: number;
  /** The index of the pose landmark in the center of the angle. */
  poseIndex2: number;
  /** The index of the third pose landmark on the outside of the angle. */
  poseIndex3: number;
  /** The minimum allowed degrees for this angle. */
  angleMin: number;
  /** The maximum allowed degrees for this angle. */
  angleMax: number;
}
