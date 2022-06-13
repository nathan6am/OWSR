//Session tabs for event details page
import React from "react";
import { Tab } from "@headlessui/react";
import EventGrid from "./EventGrid";
export default function ChampTabs({ championship }) {
  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="w-full bg-dark-300">
          <Tab
            className={({ selected }) =>
              `w-fit px-4 py-4  ${
                selected
                  ? " text-red-500 border-b-4 border-red-500 "
                  : "hover:bg-dark-500 hover:border-b-4 hover:border-red-400 hover:text-red-400"
              }`
            }
          >
            <h2 className="text-lg">Events</h2>
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-fit px-4 py-4  ${
                selected
                  ? " text-red-500 border-b-4 border-red-500 "
                  : "hover:bg-dark-400 hover:border-b-4 hover:border-red-400 hover:text-red-400"
              }`
            }
          >
            <h2 className="text-lg">Rules and Info</h2>
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-fit px-4 py-4  ${
                selected
                  ? " text-red-500 border-b-4 border-red-500 "
                  : "hover:bg-dark-400 hover:border-b-4 hover:border-red-400 hover:text-red-400"
              }`
            }
          >
            <h2 className="text-lg">Standings</h2>
          </Tab>
        </Tab.List>
        <Tab.Panels className="w-full bg-dark-200">
          <Tab.Panel>
            <div className="p-8">
              <EventGrid events={championship.events} />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="p-8 min-h-[500px]">Rules and Info placeholder</div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="p-8 min-h-[500px]">Standings placeholder</div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
