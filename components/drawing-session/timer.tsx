import { useEffect, useState } from "react";

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
  const [timeRemaining, setTimeRemaining] = useState(seconds);

  useEffect(() => {
    setTimeRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    // TODO: handle the case when paused and user presses Next.
    // Timer should reset but it does not
    if (isPaused) {
      return;
    }

    // TODO: timeRemaining is not being reset when all intervals are the same
    if (timeRemaining < 0) {
      onTimeElapsed();
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, isPaused, onTimeElapsed, seconds]);

  return <div>{timeRemaining >= 0 ? timeRemaining : 0}</div>;
}
