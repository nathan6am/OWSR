import React from "react";
import { DateTime } from "luxon";
import { useTimer } from "react-timer-hook";

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
  return (
    <>
      {showFull ? (
        <>{`${timeUntil.days} day${timeUntil.days > 1 && "s"} ${formatTimer(
          timeUntil.hours
        )}h : ${formatTimer(timeUntil.minutes)}m : ${formatTimer(
          timeUntil.seconds
        )}s`}</>
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
