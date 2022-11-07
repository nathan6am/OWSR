import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
export default function LeagueDashboard({ leagueid }) {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="container bg-dark-200 p-0">
        <LeagueTabs />
      </div>
    </div>
  );
}

LeagueDashboard.layout = "Dashboard";

LeagueDashboard.getInitialProps = async ({ query }) => {
  const { leagueid } = query;
  return {
    leagueid,
  };
};

function Header() {
  return (
    <div
      className="h-80 w-full bg-cover"
      style={{
        backgroundImage: "url(/images/atf1.jpg)",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-dark-100/[0.7] w-full h-full flex flex-col items-center justify-center ">
        <h1 className="dashboard-header">OWSR Formula Hybrid Series</h1>
      </div>
    </div>
  );
}

function LeagueTabs() {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`px-4 py-3 w-40 border-b-4 hover:bg-dark-300 hover:text-white outline-none ${
                selected
                  ? "text-white  border-red-500"
                  : "text-white/[0.6]  border-transparent"
              }`}
            >
              Info
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`px-4 py-3 w-40 border-b-4 hover:bg-dark-300 hover:text-white outline-none ${
                selected
                  ? "text-white  border-red-500"
                  : "text-white/[0.6]  border-transparent"
              }`}
            >
              Schedule
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`px-4 py-3 w-40 border-b-4 hover:bg-dark-300 hover:text-white outline-none ${
                selected
                  ? "text-white  border-red-500"
                  : "text-white/[0.6]  border-transparent"
              }`}
            >
              Results
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`px-4 py-3 w-40 border-b-4 hover:bg-dark-300 hover:text-white outline-none ${
                selected
                  ? "text-white  border-red-500"
                  : "text-white/[0.6]  border-transparent"
              }`}
            >
              Rules
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <div className="py-4 px-4">
            <h2>Info</h2>
          </div>
        </Tab.Panel>
        <Tab.Panel>Schedule</Tab.Panel>
        <Tab.Panel>Results</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
