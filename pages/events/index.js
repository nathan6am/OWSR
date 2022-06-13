import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import EventGridPublic from "@/components/EventGridPublic";
import EventFilters from "@/components/dashboard/EventFilters";
import Loading from "@/components/Loading";

const PAGE_SIZE = 2;
export default function Events() {
  const [filters, setFilters] = useState(null);
  const [resultsLoading, setResultsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(2);
  const [reachedEnd, setReachedEnd] = useState(false);

  const onUpdateSearch = async (filters) => {
    setFilters(filters);
    setPage(2);
    setResultsLoading(true);
    console.log(filters);
    try {
      const res = await axios.get(
        `/api/events?page=1&&limit=${PAGE_SIZE}`,
        {
          params: {
            filters: JSON.stringify(filters),
          },
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      setEvents(res.data.events);
      setResultsLoading(false);
      setReachedEnd(!res.data.hasNextPage);
    } catch (e) {}
  };

  const getInitialEvents = async () => {
    setResultsLoading(true);
    try {
      const res = await axios.get(`/api/events?page=1&&limit=${PAGE_SIZE}`);
      setEvents(res.data.events);
      setResultsLoading(false);
      setReachedEnd(!res.data.hasNextPage);
    } catch (error) {
      console.error(error);
    }
  };
  const onLoadMore = async () => {
    if (reachedEnd) return;
    setLoadingMore(true);
    try {
      const res = await axios.get(
        `/api/events?page=${page}&&limit=${PAGE_SIZE}`,
        {
          filters: JSON.stringify(filters),
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      setEvents((events) => [...events, ...res.data.events]);
      console.log(res.data.hasNextPage);
      setLoadingMore(false);
      setPage(page + 1);
    } catch (error) {}
  };

  const onClearSearch = async () => {
    getInitialEvents();
    setFilters(null);
    setPage(2);
  };
  useEffect(() => {
    getInitialEvents();
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full pt-[85px]">
      <Header />
      <main className="container min-h-screen">
        <EventFilters
          onUpdateSearch={onUpdateSearch}
          onClearSearch={onClearSearch}
          filters={filters}
          setFilters={setFilters}
        />
        {resultsLoading ? <Loading /> : <EventGridPublic events={events} />}
        <button onClick={onLoadMore}>
          {loadingMore ? "loading" : "Load more"}
        </button>
      </main>
    </div>
  );
}

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
        <h1 className="dashboard-header">Upcoming Events</h1>
      </div>
    </div>
  );
}
