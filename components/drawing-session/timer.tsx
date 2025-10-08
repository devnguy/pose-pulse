import { useEffect, useState } from "react";

type TimerProps = {
  seconds: number;
  onTimeElapsed: () => void;
  isPaused: boolean;
};

export function Timer(props: TimerProps) {
  const { seconds, onTimeElapsed, isPaused } = props;
  const [timeRemaining, setTimeRemaining] = useState(seconds);

  useEffect(() => {
    setTimeRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    if (timeRemaining < 0) {
      onTimeElapsed();
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, isPaused, onTimeElapsed]);

  return <div>{timeRemaining >= 0 ? timeRemaining : 0}</div>;
}
