"use client";
import * as React from "react";

export type UseCountdownDateProps = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function addZero(value: number) {
  return String(value).length === 1 ? `0${value}` : `${value}`;
}

function calculateDateTime(
  targetDate: Date,
  placeholder: Date
): Record<keyof UseCountdownDateProps, number> {
  let e = targetDate.getTime() - placeholder.getTime();

  return {
    days: Math.floor(e / (1e3 * 60 * 60 * 24)),
    hours: Math.floor((e % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60)),
    minutes: Math.floor((e % (1e3 * 60 * 60)) / (1e3 * 60)),
    seconds: Math.floor((e % (1e3 * 60)) / 1e3),
  };
}

/**
 * Custom hook to create a countdown timer to a target date.
 *
 * @param {Date} targetDate - The target date to count down to.
 * @param {string} [placeholder='- -'] - The placeholder value to display before the countdown starts.
 *
 * @returns {UseCountdownDateProps} - An object containing the current countdown values in days, hours, minutes, and seconds.
 *
 * @example
 * const { days, hours, minutes, seconds } = useCountdownDate(new Date('2023-12-31T23:59:59'));
 *
 * return (
 *   <div>
 *     <p>Days: {days}</p>
 *     <p>Hours: {hours}</p>
 *     <p>Minutes: {minutes}</p>
 *     <p>Seconds: {seconds}</p>
 *   </div>
 * );
 */
export default function useCountdownDate(
  targetDate: Date,
  placeholder?: string
): UseCountdownDateProps {
  let [timer, setTimer] = React.useState({
      days: placeholder,
      hours: placeholder,
      minutes: placeholder,
      seconds: placeholder,
    }),
    toggleTimer = React.useCallback(() => {
      let newDate = new Date(),
        {
          days: a,
          hours: i,
          minutes: c,
          seconds: m,
        } = calculateDateTime(targetDate, newDate);

      setTimer({
        days: addZero(a),
        hours: addZero(i),
        minutes: addZero(c),
        seconds: addZero(m),
      });
    }, [targetDate]);

  return (
    React.useEffect(() => {
      toggleTimer();
      let interval = setInterval(toggleTimer, 1e3);
      return () => clearInterval(interval);
    }, []),
    timer as UseCountdownDateProps
  );
}
