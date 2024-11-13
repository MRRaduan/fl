import React, { useCallback, useEffect, useRef, useState } from "react";
import * as styles from "./index.module.scss";

type CountdownFunctionProps = {
  seconds?: number;
  label?: string;
  loop?: boolean;
  customClass?: string;
  onFinish: () => void;
};

const Countdown = ({
  seconds = 300,
  label = "Reserving your wines for",
  loop = false,
  customClass,
  onFinish,
}: CountdownFunctionProps) => {
  const [counterInSeconds, setCounterInSeconds] = useState(seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const configCounter = useCallback(() => {
    setCounterInSeconds((prev) => {
      const end = loop ? seconds : 0;
      return prev > 0 ? prev - 1 : end;
    });
    if (counterInSeconds === 0) onFinish();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(configCounter, 1000);
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []);

  const minutes = Math.floor(counterInSeconds / 60);
  const remainingSeconds = counterInSeconds % 60;
  const counter = `00:${`0${minutes}`.slice(-2)}:${`0${remainingSeconds}`.slice(
    -2
  )}`;

  return (
    <div
      className={`${styles.countdown} ${customClass} ${
        remainingSeconds < 10 ? styles.blink : ""
      }`}
    >
      {label && <div className={`${styles.label} `}>{label}</div>}
      <div className={`${styles.counter} `}>{counter}</div>
    </div>
  );
};

export default Countdown;
