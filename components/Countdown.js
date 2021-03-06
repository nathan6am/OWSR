import React from "react";
import { useTimer } from "react-timer-hook";

//Countdown component returns text only countdown to date prop
export default function Countdown({ date, showFull }) {
  function formatTimer(val) {
    const string = `${val}`;
    const single = string.length === 1;
    if (single) {
      return `0${string}`;
    } else {
      return string;
    }
  }
  const timeUntil = useTimer({
    expiryTimestamp: new Date(date),
    autoStart: true,
  });
  const days = timeUntil.days
    ? `${timeUntil.days} day${timeUntil.days > 1 ? "s" : ""} `
    : "";
  return (
    <>
      {showFull ? (
        <>
          {days +
            `${formatTimer(timeUntil.hours)}h : ${formatTimer(
              timeUntil.minutes
            )}m : ${formatTimer(timeUntil.seconds)}s`}
        </>
      ) : (
        <>
          {timeUntil.days
            ? `${timeUntil.days} day${timeUntil.days > 1 ? "s" : ""} `
            : `${formatTimer(timeUntil.hours)}h : ${formatTimer(
                timeUntil.minutes
              )}min`}
        </>
      )}
    </>
  );
}
