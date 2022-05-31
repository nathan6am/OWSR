import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";

export default function EventsCarousel({ events }) {
  return (
    <div className="container py-10">
      <h1 className="text-center">Events</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full pt-10 ">
        {events.map((event, idx) => {
          return <EventCard event={event} key={idx} id={idx + 1} />;
        })}
      </div>
    </div>
  );
}
