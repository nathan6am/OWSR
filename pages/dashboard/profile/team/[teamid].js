import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "@/components/layouts/DashboardLayout";
import useSWR from "swr";
import TeamColors from "@/components/TeamColors";
import { fetcher } from "@/lib/fetcher";
import Loading from "@/components/Loading";
import Head from "next/head";
import Helmet from "../../../../public/icons/helmet.svg";
import EditButton from "@/components/UI/EditButton";
import { motion, AnimatePresence } from "framer-motion";
import CancelDialog from "@/components/CancelDialog";
import {
  MdExitToApp,
  MdPersonAdd,
  MdAdminPanelSettings,
  MdOutlineContentCopy,
  MdPersonRemove,
} from "react-icons/md";
import GenericModal from "@/components/GenericModal";
import axios from "axios";
import UIButton from "@/components/UI/UIButton";
import CancelButton from "@/components/UI/CancelButton";
import InviteModal from "@/components/InviteModal";

export default function TeamDashboard({ teamid }) {
  const user = useContext(UserContext);
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
                <TeamDetails team={data.data} user={user} mutate={mutate} />
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

function TeamDetails({ team, user, mutate }) {
  const [inviteModalShown, setInviteModalShown] = useState(false);
  const [removeUsersShown, setRemoveUsersShown] = useState(false);
  const [driverToRemove, setDriverToRemove] = useState(null);
  const [removeDialogShown, setRemoveDialogShown] = useState(false);
  const currentUserIsAdmin = team.owner == user._id;
  async function removeDriver(driverid) {
    const res = await axios.post(
      `/api/teams/${team._id}/remove`,
      { userToRemove: driverid },
      {
        withCredentials: true,
      }
    );
    setDriverToRemove(null);
    setRemoveDialogShown(false);
    mutate();
  }
  return (
    <>
      <InviteModal
        isOpen={inviteModalShown}
        teamid={team._id}
        hide={() => {
          setInviteModalShown(false);
        }}
      />
      <CancelDialog
        isOpen={driverToRemove && removeDialogShown}
        setIsOpen={setRemoveDialogShown}
        confirmMessage="Yes, Remove"
        declineMessage="No, Cancel"
        title="Remove Driver"
        message={`Are you sure you want to remove ${driverToRemove?.name} from the team?`}
        onCancel={() => {
          removeDriver(driverToRemove._id);
        }}
      />
      <div className="w-full px-0 sm:px-10 p-10 flex flex-col">
        <div className="flex flex-row items-center ">
          <TeamColors colors={team.colors} />
          <p className="sm:text-xl text-lg">{team.name}</p>
          {currentUserIsAdmin && <EditButton />}
        </div>
        <p className="py-4 opacity-50">{team.description}</p>
      </div>
      <div className="sm:px-10">
        <div className="flex flex-col sm:flex-row mb-3 justify-between">
          <div className="flex flex-row items-center">
            <h2>Team Roster</h2>
            {currentUserIsAdmin && (
              <>
                {removeUsersShown ? (
                  <CancelButton
                    onClick={() => {
                      setRemoveUsersShown(false);
                    }}
                  />
                ) : (
                  <EditButton
                    onClick={() => {
                      setRemoveUsersShown(true);
                    }}
                  />
                )}
              </>
            )}
          </div>
          <button
            onClick={() => {
              setInviteModalShown(true);
            }}
            className="flex flex-row items-center bg-dark-400 w-fit p-2 px-4 my-2 sm:my-0 rounded-lg "
          >
            Invite Drivers <MdPersonAdd className="ml-2 text-xl" />
          </button>
        </div>

        <div className="border-t  border-white/[0.3]">
          {team.drivers.map((driver) => {
            return (
              <div key={driver._id}>
                <div className=" border-b border-white/[0.3] flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center my-4">
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
                  <AnimatePresence>
                    {driver._id !== team.owner && removeUsersShown && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <button
                          onClick={() => {
                            setDriverToRemove(driver);
                            setRemoveDialogShown(true);
                          }}
                        >
                          <MdPersonRemove className="text-red-400 text-2xl mr-2" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
