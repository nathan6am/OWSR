import React, { useEffect, useState } from "react";
import useSWR from "swr";
import TeamColors from "@/components/TeamColors";
import { fetcher } from "@/lib/fetcher";
import Loading from "@/components/Loading";
import Head from "next/head";
import Helmet from "../../../../public/icons/helmet.svg";
import EditButton from "@/components/UI/EditButton";
import {
  MdExitToApp,
  MdPersonAdd,
  MdAdminPanelSettings,
  MdOutlineContentCopy,
} from "react-icons/md";
import GenericModal from "@/components/GenericModal";
import axios from "axios";
function InviteModal({ isOpen, hide, teamid }) {
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchLink = async () => {
    setError(null);
    setLoading(true);
    const res = await axios.get(`/api/teams/${teamid}/invite-link`, {
      withCredentials: true,
    });
    if (!res.data || !res.data.success) {
      setError("Something Went Wrong");
      setLoading(false);
    } else {
      setLink(res.data.link);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <GenericModal isOpen={isOpen} hide={hide} onAfterOpen={fetchLink}>
      <div className="flex w-full flex-col justify-between p-5 py-10">
        <div className="flex flex-col mb-10">
          <p className="text-left text-white/[0.7] my-2">
            Share this link with others to invite them to join your team
          </p>
          <></>
          <div className="flex flex-row items-center justify-between bg-dark-200 p-1 rounded-md ring-2 ring-dark-400">
            {loading ? "Generating link" : <p className="mx-4 mr-8">{link}</p>}
            <button
              onClick={() => {
                navigator.clipboard.writeText(link);
              }}
              className="px-3 py-1 bg-dark-400 hover:bg-dark-500 rounded-md flex flex-row items-center"
            >
              Copy <MdOutlineContentCopy className="ml-1" />
            </button>
          </div>
          <p className="text-left text-white/[0.5] my-2 text-sm ml-4">
            This link will expire after 7 days.
          </p>
          <button onClick={hide}>Close</button>
        </div>
      </div>
    </GenericModal>
  );
}
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
              <div className="container bg-dark-200 h-full">
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
  const [inviteModalShown, setInviteModalShown] = useState(false);
  return (
    <>
      <InviteModal
        isOpen={inviteModalShown}
        teamid={team._id}
        hide={() => {
          setInviteModalShown(false);
        }}
      />
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
          <button
            onClick={() => {
              setInviteModalShown(true);
            }}
            className="flex flex-row items-center bg-dark-400 w-fit p-2 px-4 rounded-lg "
          >
            Invite Drivers <MdPersonAdd className="ml-2 text-xl" />
          </button>
        </div>

        <div className="border-t  border-white/[0.3]">
          {team.drivers.map((driver) => {
            return (
              <div
                className="py-4 border-b border-white/[0.3] flex flex-row items-center"
                key={driver._id}
              >
                <img
                  className="mr-5 ml-1 inline"
                  src={`/icons/flags/${driver.country.toLowerCase()}.svg`}
                  width="25px"
                  height="auto"
                />
                {driver.name}
                {driver._id === team.owner && (
                  <MdAdminPanelSettings className="ml-2 text-xl opacity-50" />
                )}
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
