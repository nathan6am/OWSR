import React from "react";
import useSWR from "swr";
import TeamColors from "@/components/TeamColors";
import { fetcher } from "@/lib/fetcher";
import Loading from "@/components/Loading";
import Head from "next/head";
import Helmet from "../../../../public/icons/helmet.svg";
import EditButton from "@/components/UI/EditButton";
import { MdExitToApp, MdPersonAdd } from "react-icons/md";
export default function TeamDashboard({ teamid }) {
  const { data, mutate, error } = useSWR(`/api/teams/${teamid}`, fetcher);
  return (
    <>
      {!error && !data ? (
        <Loading />
      ) : (
        <>
          {data && (
            <>
              <Header />
              <div className="container bg-dark-200">
                <TeamDetails team={data.data} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

TeamDashboard.layout = "Dashboard";

TeamDashboard.getInitialProps = async ({ query }) => {
  const { teamid } = query;
  return {
    teamid,
  };
};

function TeamDetails({ team }) {
  return (
    <>
      <div className="w-full p-10 flex flex-col">
        <div className="flex flex-row items-center ">
          <TeamColors colors={team.colors} />
          <p className="text-xl">{team.name}</p>
          <EditButton />
        </div>
        <p className="py-4 opacity-50">{team.description}</p>
      </div>
      <div className="px-10">
        <div className="flex flex-row mb-3 justify-between">
          <div className="flex flex-row items-center">
            <h2>Team Roster</h2>
            <EditButton />
          </div>
          <div className="flex flex-row items-center opacity-75 bg-dark-400 w-fit p-2 px-4 rounded-lg ">
            Invite Drivers <MdPersonAdd className="ml-2 text-xl" />
          </div>
        </div>

        <div className="border-t ">
          {team.drivers.map((driver) => {
            return (
              <div
                className="py-4 border-b flex flex-row items-center"
                key={driver._id}
              >
                <Helmet className="fill-white/[0.7] mr-2" />
                {driver.name}
                {driver._id === team.owner && " (Owner)"}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Header() {
  return (
    <div
      className="h-60 w-full bg-cover relative"
      style={{
        backgroundImage: "url(/images/profileheader.jpg)",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-dark-100/[0.7] w-full h-full flex flex-col items-center justify-center ">
        <h1 className="dashboard-header">Team Dashboard</h1>
      </div>
      <button className="absolute top-5 left-5 opacity-75">
        Return to Driver Profile
        <MdExitToApp className="inline ml-2 text-xl" />
      </button>
    </div>
  );
}
