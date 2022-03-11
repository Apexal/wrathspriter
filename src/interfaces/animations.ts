import { Vector2 } from ".";

/** Represents a single frame of an animation. The image is Base64 encoded. */
export interface AnimationFrame {
  /** The hardcoded pose for this animation frame move. Is set if this is a school program move. Meant to be displayed on top of camera for user to align themselves with. */
  base64EncodedPoseImage: string | null;
  /** The actual frame image, Base64 encoded */
  base64EncodedImage: string | null;
  /** Animation details for hit collider */
  hitCollider:
    | {
        /** Is this hit collider enabled on this frame and able to hurt a player? */
        isEnabled: true;
        /** The size of the hit collider on this frame */
        size: Vector2;
        /** The relative position on this frame of the hit collider to the player position */
        position: Vector2;
      }
    | {
        isEnabled: false;
        size: null;
        position: null;
      };
  /** Animation details for body collider */
  bodyCollider: {
    /** The size of the body collider on this frame */
    size: Vector2;
    /** The relative position on this frame of the body collider to the player position */
    position: Vector2;
  };
  /** The number of seconds this frame is displayed for before going to the next frame */
  durationInS: number;
}
