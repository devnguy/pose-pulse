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
    let interval: NodeJS.Timeout | undefined = undefined;

    if (!isPaused) {
      if (timeRemaining >= 0) {
        interval = setInterval(() => {
          setTimeRemaining((prev) => prev - 1);
        }, 1000);
      } else {
        if (interval) {
          clearInterval(interval);
        }
        onTimeElapsed();
        // incorrectly setting it to the previous state seconds value
        handleReset(seconds);
      }
    }

    return () => clearInterval(interval);
  }, [timeRemaining, onTimeElapsed, seconds, isPaused]);

  const handleReset = (s: number) => {
    setTimeRemaining(s);
  };

  return <div>{timeRemaining}</div>;
}
