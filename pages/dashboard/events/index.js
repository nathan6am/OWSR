import React, { useState, useEffect, useCallback } from "react";

//components
import EventGrid from "@/components/dashboard/EventGrid";
import EventFilters from "@/components/dashboard/EventFilters";
import Loading from "@/components/Loading";

//util
import axios from "axios";

//Default page size for fetching additional results
const PAGE_SIZE = 6;

export default function Events() {
  const [filters, setFilters] = useState(null);
  const [resultsLoading, setResultsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(2);
  const [reachedEnd, setReachedEnd] = useState(false);

  //Update search is passed filters from the EventFilters component
  const onUpdateSearch = async (filters) => {
    //store filters for retrieving additional pages
    setFilters(filters);
    //reset page index
    setPage(2);
    setResultsLoading(true);
    try {
      const res = await axios.get(`/api/events?page=1&&limit=${PAGE_SIZE}`, {
        params: {
          filters: JSON.stringify(filters),
        },
      });

      //Overwrite events array with new results
      setEvents(res.data.events);
      setResultsLoading(false);

      //Set reached end if api indicates final page
      setReachedEnd(!res.data.hasNextPage);
    } catch (error) {
      console.error(error);
    }
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

  //fetch the next page of results with the same filters and increment page index
  const onLoadMore = async () => {
    if (reachedEnd) return;
    setLoadingMore(true);
    try {
      const res = await axios.get(
        `/api/events?page=${page}&&limit=${PAGE_SIZE}`,
        {
          filters: JSON.stringify(filters),
        }
      );
      setEvents((events) => [...events, ...res.data.events]);
      console.log(res.data.hasNextPage);
      setLoadingMore(false);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    }
  };

  //Refetch initial events and reset page index
  const onClearSearch = async () => {
    getInitialEvents();
    setFilters(null);
    setPage(2);
  };

  useEffect(() => {
    getInitialEvents();
  }, []);

  return (
    <>
      <Header />
      <main className="container min-h-screen">
        <EventFilters
          onUpdateSearch={onUpdateSearch}
          onClearSearch={onClearSearch}
          filters={filters}
          setFilters={setFilters}
        />
        {resultsLoading ? <Loading /> : <EventGrid events={events} />}
        <button onClick={onLoadMore}>
          {loadingMore ? "loading" : "Load more"}
        </button>
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
        <h1 className="dashboard-header">Upcoming Events</h1>
      </div>
    </div>
  );
}
