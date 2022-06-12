import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import EventGrid from "@/components/dashboard/EventGrid";
import EventFilters from "@/components/dashboard/EventFilters";
import Loading from "@/components/Loading";
export default function Events() {
  const [query, updateQuery] = useState("/api/events");
  const [filters, setFilters] = useState(null);
  const { data, error, mutate, isValidating } = useSWR(query, fetcher);
  const results = data?.events;

  return (
    <>
      <Header />
      <main className="container min-h-screen">
        <EventFilters
          filters={filters}
          setFilters={setFilters}
          refresh={() => mutate()}
        />
        {isValidating ? <Loading /> : <EventGrid events={results} />}
      </main>
    </>
  );
}

Events.layout = "Dashboard";

function Header() {
  return (
    <div
      className="h-60 w-full bg-cover"
      style={{
        backgroundImage: "url(/images/eventsheader.jpg)",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-dark-100/[0.7] w-full h-full flex flex-col items-center justify-center ">
        <h1 className="my-3 text-center text-2xl lg:text-4xl xl:text-5xl w-fit">
          Upcoming Events
        </h1>
      </div>
    </div>
  );
}
