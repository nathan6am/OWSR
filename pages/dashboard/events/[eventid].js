import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Countdown from "@/components/Countdown";
import Loading from "@/components/Loading";
import EventIcon from "@/components/dashboard/EventIcon";
import { MdDownload, MdCancel } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { ImUnlocked, ImLock } from "react-icons/im";
import { BsFillCloudSunFill } from "react-icons/bs";
import { DateTime } from "luxon";
import axios from "axios";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";
import CancelDialog from "@/components/modalContent/CancelDialog";
import SessionTabs from "@/components/dashboard/SessionTabs";

export default function EventDetails({ eventid }) {
  const { data: userData } = useCurrentUser();
  const { data, mutate, error } = useSWR(`/api/events/${eventid}`, fetcher);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const onRegister = async () => {
    const res = await axios.post(`/api/events/register/${eventid}`);
    if (res?.data?.success) {
      mutate();
    }
  };
  const onCancelRegister = async () => {
    const res = await axios.delete(`/api/events/register/${eventid}`);
    if (res?.data?.success) {
      setCancelDialogOpen(false);
      mutate();
    }
  };
  const event = data?.event;
  const registered = data?.event.registeredDrivers.includes(userData?.user._id);
  const waitlisted = data?.event.waitlist.includes(userData?.user._id);
  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <>
          <CancelDialog
            isOpen={cancelDialogOpen}
            setIsOpen={setCancelDialogOpen}
            message="Are you sure you want to cancel your registration?"
            title="Cancel Registraion"
            onCancel={onCancelRegister}
          />
          <Header
            event={event}
            onRegister={onRegister}
            onCancelRegister={() => setCancelDialogOpen(true)}
            registered={registered}
          />
          <div className="container py-8 ">
            <h2 className="text-2xl py-3">Event Info</h2>
            <div className="grid grid-cols-1  xl:grid-cols-4 gap-4">
              <ContentCard cars={event.cars} track={event.track} />
              <div className="lg:col-span-2 lg:flex lg:flex-row justify-between">
                <DetailsCard details={event.details} />
                <WeatherCard weather={event.details.weather} />
              </div>
            </div>
            <SessionTabs sessions={event.sessions} />
          </div>
        </>
      )}
    </>
  );
}

EventDetails.getInitialProps = async ({ query }) => {
  const { eventid } = query;
  return {
    eventid,
  };
};

EventDetails.layout = "Dashboard";

function ContentCard({ cars, track }) {
  return (
    <div className="bg-dark-300 lg:col-span-2 overflow-hidden my-4">
      <h2 className="p-4 bg-dark-400 border-b">Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 p-4">
        <div className="mb-4 mx-3">
          <h2 className="py-3">Cars:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 w-fit">
            {cars.map((car, idx) => (
              <RenderCar key={idx} id={car.id} car={car} />
            ))}
          </div>
        </div>

        <div className="mb-4 mx-3">
          <h2 className="py-3">Track:</h2>
          <RenderTrack track={track} />
        </div>
      </div>
    </div>
  );
}
function WeatherCard({ weather }) {
  return (
    <div className="bg-sky-800 shadow w-full overflow-hidden  my-4">
      <h2 className="p-4 bg-sky-700 border-b">
        <BsFillCloudSunFill className="inline mr-2" />
        Weather Forecast
      </h2>
      <div className="p-4">
        <div className="mb-2 flex flex-row justify-between mx-3">
          <span>Forecast:</span> {weather.description}
        </div>
        <div className="mb-2 flex flex-row justify-between mx-3">
          <span>Ambient Temperature</span> {weather.temp}°C
        </div>
        <div className="mb-2 flex flex-row justify-between mx-3">
          <span>Track Temperature</span>{" "}
          {`+${weather.trackTemp - weather.temp}/${weather.trackTemp}°C`}
        </div>
      </div>
    </div>
  );
}
function DetailsCard({ details }) {
  return (
    <div className="bg-dark-300 shadow w-full overflow-hidden lg:mr-4 my-4">
      <h2 className="p-4 bg-dark-400 border-b">Event Details</h2>
      <div className="p-4">
        <div className="mb-2 flex flex-row justify-between mx-3">
          <span className="text-red-500">Grid Spots:</span> {details.gridSize}
        </div>
        <div className="mb-2 flex flex-row justify-between mx-3">
          <span className="text-red-500">Setup:</span>
          <div>
            {details.fixedSetup ? (
              <>
                <ImLock className="inline mb-2 mr-2" />
                Fixed
              </>
            ) : (
              <>
                <ImUnlocked className="inline mb-2 mr-2" />
                Open
              </>
            )}
          </div>
        </div>
        <p className="mb-2 flex flex-row justify-between mx-3">
          <span className="text-red-500">Damage:</span> {details.damage}x
        </p>
        <p className="mb-2 flex flex-row justify-between mx-3">
          <span className="text-red-500">Track State:</span>{" "}
          {details.trackState.starting}%
        </p>
        <p className="mb-2 flex flex-row justify-between mx-3">
          <span className="text-red-500">Track Evolution:</span>{" "}
          {details.trackState.development}
        </p>
      </div>
    </div>
  );
}
function RenderCar({ car }) {
  return (
    <div
      className="w-[240px] h-[140px] bg-cover rounded overflow-hidden border border-white/[0.3] relative"
      style={{
        backgroundImage: `url(${car.image})`,
        backgroundPosition: "center",
      }}
    >
      <p className="p-2 rounded bg-white/[0.1]">{car.name}</p>
      {car.isMod && (
        <a
          target="blank"
          href={car.link}
          className="text-red-500 hover:text-red-400 absolute bottom-1 left-2"
        >
          <MdDownload className="mb-1 inline" size="25px" />
          <u>Get mod</u>
        </a>
      )}
      {car.isFree === false && (
        <FaDollarSign
          className="absolute top-2.5 right-2 text-red-500"
          size="20px"
        />
      )}
    </div>
  );
}

function RenderTrack({ track }) {
  return (
    <div
      className="w-[230px]  h-[140px] bg-cover rounded overflow-hidden border border-white/[0.3] relative"
      style={{
        backgroundImage: `url(${track.image})`,
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full bg-dark-100/[0.5]">
        <p className="p-2 rounded bg-white/[0.2]">{track.name}</p>
        <div className="absolute bottom-2 right-2">
          <p>Turns: {track.corners}</p>
          <p>{track.length}km</p>
        </div>
        {track.isMod && (
          <a
            target="blank"
            href={track.link}
            className="text-red-500 hover:text-red-400 absolute bottom-1 left-2"
          >
            <MdDownload className="mb-1 inline" size="25px" />
            <u>Get mod</u>
          </a>
        )}
        {track.isFree === false && (
          <FaDollarSign
            className="absolute top-2.5 right-2 text-red-500"
            size="20px"
          />
        )}
      </div>
    </div>
  );
}

function Header({ event, onRegister, registered, onCancelRegister }) {
  const dt = new DateTime(event.date);
  return (
    <div
      className=" w-full bg-cover"
      style={{
        backgroundImage: `url(${event.headerImage})`,
        backgroundPosition: "center",
      }}
    >
      <div className="bg-dark-100/[0.6] w-full h-full flex flex-col p-5 pt-5 pb-10">
        <div className="container relative">
          <div className="flex w-full flex-col ">
            <div>
              <h2 className="my-3 text-red-500">
                <div className="mr-3 inline">
                  <EventIcon eventType={event.type} size="1rem" />
                </div>
                <span className="underline">{event.series}</span>
              </h2>
              <h1 className="my-3 text-2xl lg:text-4xl xl:text-5xl w-fit">
                {event.title}
              </h1>
              <h2>
                {`${dt.toLocaleString(DateTime.DATETIME_MED)} - (${dt
                  .toUTC()
                  .toFormat("hh:mm")} UTC)`}
              </h2>
              <div className="bg-red-500/[0.7] rounded py-2 px-6 text-white w-fit my-6 ">
                <Countdown date={event.date} showFull />
              </div>

              <h2 className="my-6  w-fit">
                Grid Spots Available:{" "}
                <span
                  className={`font-bold ${
                    event.isFull ? "text-red-700" : "text-green-500"
                  }`}
                >{`${event.emptySlots}/${event.details.gridSize}`}</span>
              </h2>
            </div>

            <img
              className="sm:absolute sm:bottom-2 sm:right-4 my-3"
              src="/images/AC-logo.png"
              width="200"
            />
            <RegisterButton
              event={event}
              onRegister={onRegister}
              onCancelRegister={onCancelRegister}
              registered={registered}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterButton({ event, onCancelRegister, onRegister, registered }) {
  return (
    <>
      {registered ? (
        <>
          <div>
            You are registered for this event
            <button
              onClick={onCancelRegister}
              className="flex flex-row w-fit bg-red-500 hover:bg-red-400 my-2 py-2 px-4 rounded items-center"
            >
              Cancel Registration
              <MdCancel className="inline ml-2 text-xl" />
            </button>
          </div>
        </>
      ) : (
        <>
          {event.isFull ? (
            <button className="bg-yellow-500 hover:bg-yellow-600 shadow px-6 py-4 rounded text-lg h-fit w-fit">
              Join the Waitlist
            </button>
          ) : (
            <button
              onClick={onRegister}
              className="bg-green-500 hover:bg-green-600 shadow px-6 py-4 rounded text-lg h-fit w-fit"
            >
              Register for this Event!
            </button>
          )}
        </>
      )}
    </>
  );
}
