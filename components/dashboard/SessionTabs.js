//Session tabs for event details page
import React from "react";
import { Tab } from "@headlessui/react";

export default function SessionTabs({ sessions }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl py-3 my-4">Sessions</h2>
      <Tab.Group>
        <Tab.List className="w-full bg-dark-400">
          {sessions.map((session, idx) => {
            return (
              <Tab
                key={idx}
                className={({ selected }) =>
                  `w-[90px] sm:w-[120px] py-4  ${
                    selected
                      ? " text-red-500 border-b-4 border-red-500 "
                      : "hover:bg-dark-500 hover:border-b-4 hover:border-red-400 hover:text-red-400"
                  }`
                }
              >
                <h2 className="text-sm sm:text-md">
                  {session.sessionType.charAt(0).toUpperCase() +
                    session.sessionType.slice(1)}
                </h2>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="w-full bg-dark-300">
          {sessions.map((session, idx) => {
            return (
              <Tab.Panel key={idx} className="min-h-40 py-10 px-5 ">
                <div className="my-2 ">
                  Duration:{" "}
                  <span className="text-red-400 font-bold">
                    {session.duration}

                    {session.duration && session.durationType === "laps"
                      ? " Laps"
                      : " minutes"}
                  </span>
                </div>
                {session.qualiType && (
                  <div className="my-2">
                    Qualifying type:{" "}
                    <span className="text-red-400 font-bold">
                      {session.qualiType === "fastest"
                        ? "Fastest Lap"
                        : "Average Lap Time"}
                    </span>
                  </div>
                )}
                {session.sessionType === "race" && (
                  <>
                    <div className="my-2">
                      Required Pit Stops:{" "}
                      <span className="text-red-400 font-bold">
                        {session.pitStopsRequired}
                      </span>
                    </div>
                    <div className="my-2">
                      Start:{" "}
                      <span className="text-red-400 font-bold">Standing</span>
                    </div>
                  </>
                )}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
