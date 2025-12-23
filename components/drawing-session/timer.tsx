import { useEffect, useState } from "react";
import { useDrawingSessionContext } from "@/components/drawing-session/context";
import { Time } from "@/components/drawing-session/types";

type TimerProps = {
  seconds: number;
  onTimeElapsed: () => void;
  isPaused: boolean;
};

/**
 * This component has access to DrawingSessionContext but with the useEffects
 * and dependencies, it's probably not worth.
 */
export function Timer(props: TimerProps) {
  const { seconds, onTimeElapsed, isPaused } = props;
  const [secondsRemaining, setSecondsRemaining] = useState(seconds);

  const { state } = useDrawingSessionContext();
  const currentImage = state.current;

  useEffect(() => {
    if (currentImage) {
      setSecondsRemaining(currentImage.interval);
    }
  }, [currentImage]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    if (secondsRemaining < 0) {
      onTimeElapsed();
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining, isPaused, onTimeElapsed]);

  /**
   * Returns the given value of seconds in minutes and seconds
   */
  const getTimeFromSeconds = (value: number): Time => {
    const minutes = Math.floor(value / 60);
    const seconds = value - 60 * minutes;

    return {
      minutes,
      seconds,
    };
  };

  /**
   * A pretty specific way to display minutes and seconds:
   * 1:59, 1:09, 1:00, 59, 9, 0
   */
  const displayTimeRemaining = (time: Time) => {
    const minutes = time.minutes > 0 ? `${time.minutes}:` : "";
    const seconds =
      time.minutes > 0 && time.seconds < 10
        ? `0${time.seconds}`
        : `${time.seconds}`;

    return `${minutes}${seconds}`;
  };

  return (
    <div>{displayTimeRemaining(getTimeFromSeconds(secondsRemaining))}</div>
  );
}
