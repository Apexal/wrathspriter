/** Represents a single frame of an animation. The image is Base64 encoded. */
export interface AnimationFrame {
  base64encodedImage: string;
  /** The number of milliseconds this frame is displayed for before going to the next frame */
  durationInMS: number;
  // TODO:
  // - collision shape here
  // - position of hit collider or NULL if disabled
}
