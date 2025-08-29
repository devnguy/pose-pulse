import { useEffect, useRef, useState } from "react";

type TimerProps = {
  seconds: number;
  onTimeElapsed: () => void;
};

export function Timer(props: TimerProps) {
  const { seconds, onTimeElapsed } = props;
  const [timeRemaining, setTimeRemaining] = useState(seconds);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else {
      onTimeElapsed();
      if (interval) {
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [timeRemaining, onTimeElapsed]);

  useEffect(() => {
    handleReset(seconds);
  }, [seconds]);

  const handleReset = (s: number) => {
    setTimeRemaining(s);
  };

  return <div>{timeRemaining}</div>;
}
