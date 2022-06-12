import { useState, Fragment } from "react";
import {
  MdClose,
  MdOutlineExpandMore,
  MdOutlineExpandLess,
  MdSearch,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from "react-icons/md";

const eventTypes = [
  { value: "championship", label: "Championship" },
  { value: "special", label: "Special Events" },
  { value: "weekly", label: "Weekly Features" },
  { value: "hotlap", label: "Hotlap Challenges" },
];

const games = [
  { value: "assetto-corsa", label: "Assetto Corsa" },
  { value: "ams2", label: "Automobilista 2" },
  { value: "iracing", label: "iRacing" },
  { value: "rfactor2", label: "rFactor2" },
];

const modOptions = [
  { value: "in-game-only", label: "In-game only" },
  { value: "free", label: "Only free mods" },
  { value: "all", label: "All mods" },
];

const sortOptions = [
  {
    value: "date",
    label: "Date",
  },
  {
    value: "popular",
    label: "Most Popular",
  },
];
const setupOptions = [
  {
    value: "fixed",
    label: "Fixed",
  },
  { value: "open", label: "Open" },
];

import { Listbox } from "@headlessui/react";
export default function EventFilters({ setQuery }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedEventTypes, setSelectedEventTypes] = useState(eventTypes);
  const [selectedSetups, setSelectedSetups] = useState(setupOptions);
  const [selectedMods, setSelectedMods] = useState(modOptions[2]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [selectedGames, setSelectedGames] = useState(games);
  return (
    <div className="py-5 border-b relative">
      <div className="flex flex-col justify-between">
        <div className="flex flex-row justify-between items-start">
          <h2 className="text-2xl">Event Search</h2>
          <div
            className={`flex flex-col-reverse ${
              expanded ? "justify-between" : "sm:flex-row justify-center"
            } items-center `}
          >
            <button
              onClick={() => {
                setExpanded(true);
              }}
              className={`text-red-500 hover:text-red-400 ${
                expanded ? "hidden" : "block"
              }`}
            >
              Show Filters <MdOutlineExpandMore className="inline " />
            </button>
            <button className="text-white w-fit bg-red-500/[0.4] hover:bg-red-500/[0.6] rounded p-2 px-4 ml-4 flex flex-row items-center mb-2 sm:mb-0">
              Clear Search <MdClose className="inline ml-2" />
            </button>
          </div>
        </div>
        <div
          className={`w-full pt-10 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 xs:grid-cols-2 gap-2 ${
            expanded ? "grid" : "hidden"
          }`}
        >
          <EventTypeFilters
            selectedEventTypes={selectedEventTypes}
            setSelectedEventTypes={setSelectedEventTypes}
          />
          <GameFilters
            selectedGames={selectedGames}
            setSelectedGames={setSelectedGames}
          />
          <ModFilters
            selectedMods={selectedMods}
            setSelectedMods={setSelectedMods}
          />
          <SetupFilters
            selectedSetups={selectedSetups}
            setSelectedSetups={setSelectedSetups}
          />
          <SortBy
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </div>
        <div
          className={`${
            expanded ? "flex" : "hidden"
          } flex-row items-center justify-between pt-5`}
        >
          <button className="text-white bg-dark-400 hover:bg-dark-500 rounded p-2 px-4  flex flex-row items-center sm:mb-0">
            Update Search <MdSearch className="inline ml-2 text-xl" />
          </button>
          <button
            onClick={() => {
              setExpanded(false);
            }}
            className="text-red-500 hover:text-red-400 $"
          >
            Hide Filters <MdOutlineExpandLess className="inline text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SetupFilters({ selectedSetups, setSelectedSetups }) {
  return (
    <div className="relative">
      <Listbox value={selectedSetups} onChange={setSelectedSetups} multiple>
        <Listbox.Button className="bg-dark-300 hover:bg-dark-400 flex flex-row items-center justify-between w-[190px] p-2">
          Setup <MdOutlineExpandMore className="inline " />
        </Listbox.Button>
        <Listbox.Options className="absolute top-full mt-1 z-40 ">
          {setupOptions.map((option) => (
            <Listbox.Option key={option.value} value={option} as={Fragment}>
              {({ active, selected }) => (
                <li
                  className={`p-2 cursor-pointer w-[190px] select-none border-y border-dark-500 ${
                    active ? "bg-dark-400 text-white" : "bg-dark-300 text-white"
                  }`}
                >
                  {selected ? (
                    <MdCheckBox className="inline text-red-500 mr-2 text-xl" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="inline text-red-500  mr-2 text-xl" />
                  )}
                  {option.label}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
function SortBy({ selectedSort, setSelectedSort }) {
  return (
    <div className="relative">
      <Listbox value={selectedSort} onChange={setSelectedSort}>
        <Listbox.Button className="bg-dark-300 hover:bg-dark-400 flex flex-row items-center justify-between w-[190px] p-2">
          Sort by: {selectedSort.label}{" "}
          <MdOutlineExpandMore className="inline " />
        </Listbox.Button>
        <Listbox.Options className="absolute top-full mt-1 z-40 ">
          {sortOptions.map((option) => (
            <Listbox.Option key={option.value} value={option} as={Fragment}>
              {({ active, selected }) => (
                <li
                  className={`p-2 cursor-pointer w-[190px] select-none border-y border-dark-500 ${
                    active ? "bg-dark-400 text-white" : "bg-dark-300 text-white"
                  }`}
                >
                  {selected ? (
                    <MdRadioButtonChecked className="inline text-red-500 mr-2 text-xl" />
                  ) : (
                    <MdRadioButtonUnchecked className="inline text-red-500  mr-2 text-xl" />
                  )}
                  {option.label}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
function ModFilters({ selectedMods, setSelectedMods }) {
  return (
    <div className="relative">
      <Listbox value={selectedMods} onChange={setSelectedMods}>
        <Listbox.Button className="bg-dark-300 hover:bg-dark-400 flex flex-row items-center justify-between w-[190px] p-2">
          Mods <MdOutlineExpandMore className="inline " />
        </Listbox.Button>
        <Listbox.Options className="absolute top-full mt-1 z-40 ">
          {modOptions.map((option) => (
            <Listbox.Option key={option.value} value={option} as={Fragment}>
              {({ active, selected }) => (
                <li
                  className={`p-2 cursor-pointer w-[190px] select-none border-y border-dark-500 ${
                    active ? "bg-dark-400 text-white" : "bg-dark-300 text-white"
                  }`}
                >
                  {selected ? (
                    <MdRadioButtonChecked className="inline text-red-500 mr-2 text-xl" />
                  ) : (
                    <MdRadioButtonUnchecked className="inline text-red-500  mr-2 text-xl" />
                  )}
                  {option.label}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
function GameFilters({ selectedGames, setSelectedGames }) {
  return (
    <div className="relative">
      <Listbox value={selectedGames} onChange={setSelectedGames} multiple>
        <Listbox.Button className="bg-dark-300 hover:bg-dark-400 flex flex-row items-center justify-between w-[190px] p-2">
          Games <MdOutlineExpandMore className="inline " />
        </Listbox.Button>
        <Listbox.Options className="absolute top-full mt-1 z-40 ">
          {games.map((game) => (
            <Listbox.Option key={game.value} value={game} as={Fragment}>
              {({ active, selected }) => (
                <li
                  className={`p-2 cursor-pointer w-[190px] select-none border-y border-dark-500 ${
                    active ? "bg-dark-400 text-white" : "bg-dark-300 text-white"
                  }`}
                >
                  {selected ? (
                    <MdCheckBox className="inline text-red-500 mr-2 text-xl" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="inline text-red-500  mr-2 text-xl" />
                  )}
                  {game.label}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

function EventTypeFilters({ selectedEventTypes, setSelectedEventTypes }) {
  return (
    <div className="relative">
      <Listbox
        value={selectedEventTypes}
        onChange={setSelectedEventTypes}
        multiple
      >
        <Listbox.Button className="bg-dark-300 hover:bg-dark-400 flex flex-row items-center justify-between w-[190px] p-2">
          Event Type <MdOutlineExpandMore className="inline " />
        </Listbox.Button>
        <Listbox.Options className="absolute top-full mt-1 z-40 ">
          {eventTypes.map((eventType) => (
            <Listbox.Option
              key={eventType.value}
              value={eventType}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={`p-2 cursor-pointer w-[190px] select-none border-y border-dark-500 ${
                    active ? "bg-dark-400 text-white" : "bg-dark-300 text-white"
                  }`}
                >
                  {selected ? (
                    <MdCheckBox className="inline text-red-500 mr-2 text-xl" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="inline text-red-500  mr-2 text-xl" />
                  )}
                  {eventType.label}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
