import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { IoStar } from "react-icons/io5";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";
import { DateTime } from "luxon";
import ReactTooltip from "react-tooltip";
import GameLogo from "../GameLogo";
export default function EventCard({ event }) {
  function formatTimer(val) {
    const string = `${val}`;
    const single = string.length === 1;
    if (single) {
      return `0${string}`;
    } else {
      return string;
    }
  }
  const dt = DateTime.fromISO(event.date);
  const timeUntil = useTimer({
    expiryTimestamp: new Date(event.date),
    autoStart: false,
  });

  useEffect(() => {
    timeUntil.start();
  }, []);

  return (
    <div className="flex flex-col w-full  rounded shadow-lg hover:shadow-red-700/[0.2]  bg-dark-300 overflow-hidden group cursor-pointer min-h-[280px] md:min-h-[320px] max-w-[500px] mx-auto">
      <div className="flex-grow overflow-hidden relative">
        {/* <ReactTooltip effect="solid" place="top" /> */}
        <div
          className="w-full h-full group-hover:scale-105 transition-all ease-in-out "
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className=" bg-dark-100/[0.4] flex w-full h-full">
            {" "}
            <div className="opacity-0 transition-opacity ease-in-out group-hover:opacity-50 bg-red-700 flex w-full h-full"></div>
          </div>
        </div>
        <h2 className="absolute top-2 left-2 rounded-md bg-dark-200/[0.8] px-3 max-w-[85%]">
          {event.title}
        </h2>
        <div
          suppressHydrationWarning={true}
          className="absolute bottom-2 left-2 rounded-md bg-red-700/[0.8] py-2 px-3"
        >
          {timeUntil.days
            ? `${timeUntil.days} day${timeUntil.days > 1 ? "s" : ""} `
            : `${formatTimer(timeUntil.hours)}h : ${formatTimer(
                timeUntil.minutes
              )}min`}
        </div>

        <EventIcon eventType={event.type} />

        <GameLogo
          className="absolute bottom-2 right-2"
          game={event.game}
          width="150"
        />
      </div>
      <div className="px-5 py-3 flex-col flex justify-around min-h-[35%]">
        <p className="text-red-500">{event.series}</p>

        <p className="truncate">{event.description}</p>
        <p className="text-sm text-white/[0.6]">
          {`${dt.toLocaleString(DateTime.DATETIME_MED)} - (${dt
            .toUTC()
            .toFormat("hh:mm")} UTC)`}
        </p>
      </div>
    </div>
  );
}

function EventIcon({ eventType }) {
  switch (eventType) {
    case "special":
      return (
        <IoStar
          data-tip="Special Event"
          className="absolute top-2 right-2 text-red-500"
          size="30px"
        />
      );
    case "weekly":
      return (
        <BsFillCalendar2WeekFill
          data-tip="Weekly Race"
          data-event-off="mouse-leave"
          className="absolute top-2 right-2 text-red-500"
          size="30px"
        />
      );
    case "championship":
      return (
        <FaTrophy
          data-tip="Championship Race"
          className="absolute top-2 right-2 text-red-500"
          size="30px"
        />
      );
    case "hotlap":
      return (
        <FaTrophy className="absolute top-2 right-2 text-red-500" size="30px" />
      );
    default:
      return null;
  }
}
