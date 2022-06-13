import React from "react";

//components
import { FaTrophy } from "react-icons/fa";
import Loading from "@/components/Loading";
import GameLogo from "@/components/GameLogo";
import Link from "next/link";

//hooks
import useSWR from "swr";

//util
import { fetcher } from "@/lib/fetcher";

export default function Championsips() {
  const { data, error, isValidating } = useSWR("/api/championships", fetcher);
  const championships = data && data?.championships;
  return (
    <>
      <div
        className="w-full flex flex-col bg-fixed bg-cover min-h-screen"
        style={{ backgroundImage: "url(/images/bg.jpg)" }}
      >
        <div>
          <Header />
        </div>

        <main className="container px-0 ">
          {isValidating ? (
            <Loading />
          ) : (
            <>
              {championships.map((championship, idx) => {
                return (
                  <ChampBanner
                    key={idx}
                    id={championship._id}
                    championship={championship}
                  />
                );
              })}
            </>
          )}
        </main>
      </div>
    </>
  );
}

Championsips.layout = "Dashboard";

function Header() {
  return (
    <div className="h-40 w-full flex flex-col items-center justify-center bg-dark-100/[0.8]">
      <h1 className="dashboard-header">OWSR Championships</h1>
    </div>
  );
}
function ChampBanner({ championship }) {
  return (
    <div
      className="w-full bg-cover h-80 border-dark-600 border-y relative overflow-hidden relative overflow-hidden group"
      style={{
        backgroundImage: `url(${championship.image})`,
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full image-gradient p-8">
        <div className="flex flex-col justify-between h-full">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl ">
              <FaTrophy className="inline mr-3" />
              {championship.title}
            </h1>
            <p className="text-red-500 text-xl " style={{ fontWeight: 400 }}>
              {championship.frequency}, {championship.timeSlot.day}s @{" "}
              {championship.timeSlot.timeUtc}UTC
            </p>
            <h2 className="text-white text-2xl  " style={{ fontWeight: 400 }}>
              Rounds: {championship.rounds}
            </h2>
          </div>
          <div>
            <GameLogo
              className="absolute bottom-2 right-4 my-3"
              width="200"
              game={championship.game}
            />
            <Link href={`/dashboard/championships/${championship._id}`}>
              <button className="bg-green-500 px-4 py-3  hover:bg-green-400 rounded">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
