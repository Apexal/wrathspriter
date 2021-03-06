import { useState, useRef, useEffect, useCallback } from "react";

export function useCountdown(
  seconds: number,
  onExecute: () => void
): [boolean, number, () => void, () => void] {
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(seconds);
  const intervalRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    setSecondsLeft(secondsLeft - 1);

    if (secondsLeft - 1 <= 0) {
      setIsCountingDown(false);
      onExecute();
      setSecondsLeft(seconds);
    }
  }, [onExecute, seconds, secondsLeft]);

  useEffect(() => {
    let interval = intervalRef.current;

    if (isCountingDown) {
      intervalRef.current = window.setInterval(tick, 1000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
      intervalRef.current = null;
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCountingDown, tick]);

  const startCountdown = () => {
    if (!isCountingDown) {
      setSecondsLeft(seconds);
      setIsCountingDown(true);
    } else {
      console.warn("Attempted to start already running countdown");
    }
  };

  const endCountdown = () => {
    setIsCountingDown(false);
    setSecondsLeft(seconds);
  };

  return [isCountingDown, secondsLeft, startCountdown, endCountdown];
}
