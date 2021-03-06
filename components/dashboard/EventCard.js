import React, { useEffect, useState } from "react";

//icons
import { IoStar } from "react-icons/io5";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaTrophy, FaDollarSign } from "react-icons/fa";
import { MdOutlineTimer, MdDownload } from "react-icons/md";

//components
import ReactTooltip from "react-tooltip";
import Countdown from "../Countdown";
import GameLogo from "../GameLogo";

//utilities
import { DateTime } from "luxon";

export default function EventCard({ event }) {
  const dt = DateTime.fromISO(event.date);

  return (
    <div className="flex flex-col w-full  rounded shadow-lg hover:shadow-red-700/[0.2]  bg-dark-300 overflow-hidden group cursor-pointer min-h-[280px] md:min-h-[320px] max-w-[500px] mx-auto">
      <div className="flex-grow overflow-hidden relative">
        <div
          className="w-full h-full group-hover:scale-105 transition-all ease-in-out "
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className=" bg-dark-100/[0.4] flex w-full h-full">
            <div className="opacity-0 transition-opacity ease-in-out group-hover:opacity-50 bg-red-700 flex w-full h-full"></div>
          </div>
        </div>
        <h2 className="absolute top-2 left-2 rounded-md bg-dark-200/[0.8] px-3 max-w-[85%]">
          {event.title}
        </h2>
        <ReactTooltip effect="solid" place="top" />
        <div
          suppressHydrationWarning={true}
          className="absolute bottom-2 left-2 "
        >
          <div className="flex flex-row items-center">
            <div className="rounded-md bg-red-700/[0.8] py-2 px-3">
              <Countdown date={event.date} />
            </div>
            {event.modsRequired && (
              <MdDownload
                className="text-red-500 inline text-4xl"
                data-tip="Mods Required"
              />
            )}
            {event.paidContent && (
              <FaDollarSign
                className="text-red-500 inline text-3xl mb-1"
                data-tip="Paid Content Required"
              />
            )}
          </div>
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
        <MdOutlineTimer
          className="absolute top-2 right-2 text-red-500"
          size="30px"
        />
      );
    default:
      return null;
  }
}
