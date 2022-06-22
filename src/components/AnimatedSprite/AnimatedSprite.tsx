import { useCallback, useEffect, useRef, useState } from "react";
import { AnimationFrame } from "@/interfaces";

type AnimatedSpritePropTypes = {
  isPlaying?: boolean;
  width: number;
  height: number;
  animation: AnimationFrame[];
};

/**
 * Animated <img> that plays through the given animation frames.
 */
export function AnimatedSprite(props: AnimatedSpritePropTypes) {
  const [frameIndex, setFrameIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const imgSrc =
    "data:image/png;base64," + props.animation[frameIndex]?.base64EncodedImage;

  const draw = useCallback(() => {
    if (
      props.isPlaying &&
      props.animation.length > 0 &&
      props.animation[frameIndex]
    ) {
      timeoutRef.current = window.setTimeout(() => {
        setFrameIndex((f) => (f + 1) % props.animation.length);
      }, props.animation[frameIndex].durationInS * 1000);
    }
  }, [frameIndex, props.animation, props.isPlaying]);

  useEffect(() => {
    draw();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [draw]);

  useEffect(() => {
    if (frameIndex >= props.animation.length) {
      setFrameIndex(0);
    }
  }, [frameIndex, props.animation]);

  useEffect(() => {
    if (!props.isPlaying && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [props.isPlaying]);

  return imgSrc ? (
    <img
      src={imgSrc}
      width={props.width}
      height={props.height}
      title={"Frame " + frameIndex}
      alt="Animation"
    />
  ) : null;
}
