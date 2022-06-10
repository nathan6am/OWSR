import React from "react";
import { IoStar } from "react-icons/io";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";
export default function EventIcon({ eventType, size }) {
  switch (eventType) {
    case "special":
      return <IoStar data-tip="Special Event" className="inline" size={size} />;
    case "weekly":
      return (
        <BsFillCalendar2WeekFill
          data-tip="Weekly Race"
          data-event-off="mouse-leave"
          className="inline"
          size={size}
        />
      );
    case "championship":
      return (
        <FaTrophy data-tip="Championship Race" className="inline" size={size} />
      );
    case "hotlap":
      return <FaTrophy className=" text-red-500" size={size} />;
    default:
      return null;
  }
}
