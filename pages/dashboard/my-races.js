import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import EventGrid from "@/components/dashboard/EventGrid";
import Link from "next/link";
export default function MyRaces() {
  const { data, error, mutate, isValidating } = useSWR(
    "/api/events/my-events",
    fetcher
  );
  const { registeredEvents, completedEvents } = !isValidating && data.events;
  const [eventsToShow, setEventsToShow] = useState(3);
  const [pastEventsToShow, setPastEventsToShow] = useState(3);
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container py-8 h-[100%] ">
        <section className="border-b">
          <h1>My Upcoming Events</h1>
          {registeredEvents?.length ? (
            <EventGrid events={registeredEvents.slice(0, eventsToShow)} />
          ) : (
            <div className="w-full flex flex-col justify-center items-center h-80">
              <div>You aren't registered for any events.</div>
              <Link href="/dashboard/events">
                <button className="px-3 py-2 bg-red-500 my-4 rounded">
                  Explore Upcoming Events
                </button>
              </Link>
            </div>
          )}
          {registeredEvents?.length > eventsToShow && (
            <div className="w-full flex justify-center items-end ">
              <button
                onClick={() => {
                  setEventsToShow(eventsToShow + 6);
                }}
                className="px-3 py-2 rounded bg-red-500 hover:bg-red-400 w-fit"
              >
                Show more
              </button>
            </div>
          )}
        </section>
        <section className="border-b">
          <h1>My Past Events</h1>
          {completedEvents?.length ? (
            <EventGrid events={completedEvents.slice(0, eventsToShow)} />
          ) : (
            <div className="w-full flex flex-col justify-center items-center h-80">
              <div>You haven't particpated in any races yet.</div>
            </div>
          )}
          {completedEvents?.length > pastEventsToShow && (
            <div className="w-full flex justify-center items-end ">
              <button
                onClick={() => {
                  setPastEventsToShow(eventsToShow + 6);
                }}
                className="px-3 py-2 rounded bg-red-500 hover:bg-red-400 w-fit"
              >
                Show more
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

MyRaces.layout = "Dashboard";

function Header() {
  return (
    <div
      className="h-60 w-full bg-cover"
      style={{
        backgroundImage: "url(/images/myevents.jpg)",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-dark-100/[0.7] w-full h-full flex flex-col items-center justify-center ">
        <h1 className="my-3 text-center text-2xl lg:text-4xl xl:text-5xl w-fit">
          My Races
        </h1>
      </div>
    </div>
  );
}
