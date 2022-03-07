/** Represents a single frame of an animation. The image is Base64 encoded. */
export interface AnimationFrame {
  /** The hardcoded pose for this animation frame move. Is set if this is a school program move. Meant to be displayed on top of camera for user to align themselves with. */
  base64EncodedPoseImage: string | null;
  /** The actual frame image, Base64 encoded. */
  base64EncodedImage: string | null;
  /** The number of seconds this frame is displayed for before going to the next frame */
  durationInS: number;
  /** Whether or not the character is immune to damage/attack cancellation during this frame. */
  isInvincible: boolean;
}
