"use client";
import * as React from "react";

export type UseCountdownSecondsProps = {
  value: number;
  start: () => void;
  reset: () => void;
  isCounting: boolean;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * Custom hook to create a countdown timer in seconds.
 *
 * @param {number} defaultValue - The initial countdown value in seconds.
 * @param {number} interval - The countdown interval.
 *
 * @returns {UseCountdownSecondsProps} - An object containing:
 * - `value`: The current countdown value in seconds.
 * - `start`: A function to start the countdown.
 * - `reset`: A function to reset the countdown to the initial value.
 * - `isCounting`: A boolean indicating whether the countdown is currently active.
 * - `setValue`: A function to manually set the countdown value.
 *
 * @example
 * const { value, start, reset, isCounting } = useCountdownSeconds(30);
 *
 * return (
 *   <div>
 *     <p>Countdown: {value} seconds</p>
 *     <button onClick={start} disabled={isCounting}>Start</button>
 *     <button onClick={reset}>Reset</button>
 *   </div>
 * );
 */
export default function useCountdownSeconds(
  defaultValue: number,
  interval: number = 1e3
): UseCountdownSecondsProps {
  let [state, setState] = React.useState<number>(defaultValue),
    [countDown, setCountDown] = React.useState(!1),
    start = React.useCallback(() => {
      setCountDown(!0);
    }, []),
    reset = React.useCallback(() => {
      (setCountDown(!1), setState(defaultValue));
    }, [defaultValue]);

  return (
    React.useEffect(() => {
      let countDownInterval: NodeJS.Timeout | null = null;

      return (
        countDown && state > 0
          ? (countDownInterval = setInterval(() => {
              setState((c) => c - 1);
            }, interval))
          : state <= 0 && setCountDown(!1),
        () => {
          countDownInterval && clearInterval(countDownInterval);
        }
      );
    }, [countDown, state]),
    {
      value: state,
      setValue: setState,
      isCounting: countDown,
      start,
      reset,
    }
  );
}
