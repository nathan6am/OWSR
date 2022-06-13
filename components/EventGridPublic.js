import React from "react";
import EventCardPublic from "@/components//EventCardPublic";
import Link from "next/link";

export default function EventGrid({ events }) {
  return (
    <ul className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 w-full pt-10 mb-8">
      {events &&
        events.map((event, idx) => {
          return (
            <Link
              href={`/dashboard/events/${event._id}`}
              key={idx}
              id={event._id}
            >
              <li className="flex">
                <EventCardPublic event={event} />
              </li>
            </Link>
          );
        })}
    </ul>
  );
}
