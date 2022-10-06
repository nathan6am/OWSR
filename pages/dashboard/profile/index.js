import React, { useEffect, useState, useMemo } from "react";
import ReactTooltip from "react-tooltip";
import axios from "axios";
//components
import Loading from "@/components/Loading";
import {
  MdEmail,
  MdAdd,
  MdCancel,
  MdExitToApp,
  MdNavigateNext,
  MdOutlineContentCopy,
  MdOutlineMoreVert,
  MdAdminPanelSettings,
} from "react-icons/md";
import { IoMdPodium } from "react-icons/io";
import { FaMedal } from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
import GenericModal from "@/components/GenericModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ChromePicker } from "react-color";
import { HexColorPicker } from "react-colorful";
import { Popover } from "@headlessui/react";
import TeamColors from "@/components/TeamColors";

import { useProfile } from "hooks/useProfile";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { debounce } from "lodash";
import Link from "next/link";
function CreateTeamModal({ isOpen, hide, mutate }) {
  const [color, setColor] = useState("#ffffff");

  const [colorText, setColorText] = useState(color.slice(1, 7));

  const [colorSecondary, setColorSecondary] = useState("#ffffff");

  const [colorSecondaryText, setColorSecondaryText] = useState(
    colorSecondary.slice(1, 7)
  );

  const changeHandler = (event) => {
    setVerifying(true);
    setName(event.target.value);
  };

  const debouncedChangeHandler = useMemo(() => {
    return debounce(changeHandler, 500);
  }, []);

  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [description, setDescription] = useState("");
  const [errorText, setErrorText] = useState("");
  const [failed, setFailed] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createdTeam, setCreatedTeam] = useState(null);

  const onSubmit = async () => {
    if (!(name.length > 1)) {
      setNameValid(false);
      setErrorText("*A team name is required");
      return;
    } else if (!nameValid) {
      return;
    } else {
      setCreating(true);
      const res = await axios.post("/api/teams", {
        name: name,
        description: description,
        colors: { primary: color, secondary: colorSecondary },
      });
      if (res.data.success) {
        setCreatedTeam(res.data.team);
        setCreatedTeam((curr) => ({ ...curr, link: res.data.link }));
        setCreating(false);
      } else {
        setFailed(true);
        setCreating(false);
      }
    }
  };
  const handleChange = (e) => {
    e.preventDefault;
    const text = e.target.value;

    const charExp = /^[a-zA-Z0-9]*$/;
    const hexExp = /^#([0-9a-f]{6})$/i;
    if (text.length >= 6) {
      setColorText(text.slice(0, 6));
      if (hexExp.test(`#${text}`)) {
        setColor(`#${colorText}`);
      }
    } else {
      setColorText(text);
      if (hexExp.test(`#${text}`)) {
        setColor(`#${colorText}`);
      }
    }
  };

  const handleSecChange = (e) => {
    e.preventDefault;
    const text = e.target.value;

    const charExp = /^[a-zA-Z0-9]*$/;
    const hexExp = /^#([0-9a-f]{6})$/i;
    if (text.length >= 6) {
      setColorSecondaryText(text.slice(0, 6));
      if (hexExp.test(`#${text}`)) {
        setColorSecondary(`#${colorSecondaryText}`);
      }
    } else {
      setColorSecondaryText(text);
      if (hexExp.test(`#${text}`)) {
        setColorSecondary(`#${colorSecondaryText}`);
      }
    }
  };
  useEffect(() => {
    const verifyNameAvailability = async (string) => {
      setVerifying(true);
      const res = await axios.post("/api/teams/test-name", { name: string });
      const success = res.data.success;
      if (!success) {
        setVerifying(false);
        setErrorText(res.data.message);
      } else {
        setNameValid(res.data.valid);
        setVerifying(false);
        if (!res.data.valid) {
          setErrorText(res.data.message);
        } else {
          setErrorText("");
        }
      }
    };

    if (name.length >= 3) {
      verifyNameAvailability(name);
    } else if (name.length > 1 && name.length < 3) {
      setVerifying(false);
      setNameValid(false);
      setErrorText("Name must be at least 3 characters");
    }
  }, [name]);
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);
  return (
    <GenericModal
      onAfterClose={() => {
        setName("");
        setCreatedTeam(null);
        setErrorText("");
        setDescription("");
        setVerifying(true);
        mutate();
      }}
      isOpen={isOpen}
      hide={hide}
    >
      <div className="flex w-full flex-col justify-between p-5 min-h-[600px]">
        {createdTeam ? (
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-green-400 text-xl">Success!</h2>
            <p className="text-center text-white/[0.7] my-10">
              Your team has been created:
            </p>
            <div className="flex flex-row items-center mb-10">
              <TeamColors colors={createdTeam.colors} />
              <p className="text-xl">{createdTeam.name}</p>
            </div>
            <div className="flex flex-col mb-10">
              <p className="text-left text-white/[0.7] my-2">
                Share this link with others to invite them to join your team
              </p>
              <div className="flex flex-row items-center bg-dark-200 p-1 rounded-md ring-2 ring-dark-400">
                <p className="mx-4 mr-8">{createdTeam.link}</p>
                <button
                  data-tip="tooltip"
                  onClick={() => {
                    navigator.clipboard.writeText(createdTeam.link);
                  }}
                  className="px-3 py-1 bg-dark-400 hover:bg-dark-500 rounded-md flex flex-row items-center"
                >
                  Copy <MdOutlineContentCopy className="ml-1" />
                </button>
              </div>
              <p className="text-left text-white/[0.5] my-2 text-sm ml-4">
                This link will expire after 7 days.
              </p>
            </div>
            <button>Manage Team</button>
            <p className="my-6">or</p>
            <button
              onClick={hide}
              className="flex flex-row w-fit bg-red-500 hover:bg-red-400 my-2 py-2 px-4 rounded items-center justify-self-end"
            >
              Return to dashboard
              <MdExitToApp className="inline text-xl ml-2" />
            </button>
          </div>
        ) : (
          <>
            {creating ? (
              <Loading text="Creating team" />
            ) : (
              <>
                {failed ? (
                  <p>Failed</p>
                ) : (
                  <>
                    <div className="flex flex-col justify-center items-center">
                      <h2>Create a Team</h2>
                      <label
                        htmlFor="name"
                        className="text-white/[0.4] align-left text-left w-full mb-1"
                      >
                        Team Name:
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Choose a name for you team"
                        className={`input-field ${
                          verifying
                            ? ""
                            : nameValid
                            ? "focus:ring-2 focus:ring-green-400"
                            : "ring-2 focus:ring-red-400 ring-red-400"
                        }`}
                        onChange={debouncedChangeHandler}
                      />
                      <p className="text-red-500 text-sm mt-[-10px] text-left w-full mb-4 px-4">
                        {errorText}
                      </p>

                      <label
                        htmlFor="description"
                        className="text-white/[0.4] align-left text-left w-full  mb-1"
                      >
                        Description:
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Description (optional)"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        value={description}
                        rows="4"
                        className={`py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white/[0.6] bg-dark-200 rounded-md mx-3 mb-3 w-[100%] text-white/[0.8]`}
                      />
                      <label
                        htmlFor="color"
                        className="text-white/[0.4] align-left text-left w-full  mb-1"
                      >
                        Team Colors:
                      </label>
                      <Popover className="relative w-full my-4">
                        <Popover.Button
                          className={"flex flex-row items-center"}
                        >
                          <div
                            style={{ backgroundColor: color }}
                            className={`w-8 h-8 p-4 mr-2 rounded-sm border-2 border-white/[0.2]`}
                          ></div>
                          <p className="text-white/[0.6]">Primary Color</p>
                        </Popover.Button>

                        <Popover.Panel className="absolute z-10 translate-y-[-100px] translate-x-[100px]">
                          <HexColorPicker
                            color={color}
                            onChange={(hex) => {
                              setColor(hex);
                              setColorText(hex.slice(1, 7));
                            }}
                          />
                          <div className="flex flex-row items-center p-2 bg-dark-400 rounded-b-md w-[200px] text-white/[0.8]">
                            <p>Hex:</p>
                            <div className="py-1 px-2 bg-dark-600 ml-2">#</div>
                            <input
                              className="py-1 px-2 focus:outline-none w-[80px]  bg-dark-500 text-white/[0.8]"
                              type="text"
                              value={colorText}
                              onChange={handleChange}
                            />
                          </div>
                        </Popover.Panel>
                      </Popover>
                      <Popover className="relative w-full my-4 ">
                        <Popover.Button
                          className={"flex flex-row items-center"}
                        >
                          <div
                            style={{ backgroundColor: colorSecondary }}
                            className={`w-8 h-8 p-4 mr-2 rounded-sm border-2 border-white/[0.2]`}
                          ></div>
                          <p className="text-white/[0.6]">Secondary Color</p>
                        </Popover.Button>

                        <Popover.Panel className="absolute z-10 translate-y-[-100px] translate-x-[100px]">
                          <HexColorPicker
                            color={colorSecondary}
                            onChange={(hex) => {
                              setColorSecondary(hex);
                              setColorSecondaryText(hex.slice(1, 7));
                            }}
                          />
                          <div className="flex flex-row items-center p-2 bg-dark-400 rounded-b-md w-[200px] text-white/[0.8]">
                            <p>Hex:</p>
                            <div className="py-1 px-2 bg-dark-600 ml-2">#</div>
                            <input
                              className="py-1 px-2 focus:outline-none w-[80px]  bg-dark-500 text-white/[0.8]"
                              type="text"
                              value={colorSecondaryText}
                              onChange={handleSecChange}
                            />
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>

                    <div className="flex flex-row justify-end">
                      <button
                        onClick={hide}
                        className="flex flex-row w-fit bg-red-500 hover:bg-red-400 my-2 py-2 px-4 rounded items-center justify-self-end"
                      >
                        <MdCancel className="inline text-xl mr-2" />
                        Cancel
                      </button>
                      <button
                        onClick={onSubmit}
                        className="flex flex-row justify-around ml-5 w-fit bg-dark-700 hover:bg-dark-800 my-2 py-2 px-4 rounded items-center justify-self-end"
                      >
                        Continue
                        <MdNavigateNext className="inline text-xl ml-2" />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </GenericModal>
  );
}

function TeamsSection({ teams, showModal, user, router }) {
  return (
    <section className="w-full bd-dark-200 p-8">
      <h2>My Teams</h2>
      {teams ? (
        <>
          <div className="my-6 bg-dark-400/[0.2] border-t border-white/[0.3]">
            {teams.map((team) => {
              return (
                <div
                  key={team._id}
                  className="flex flex-row justify-between py-4 px-4 border-b hover:bg-white/[0.2] border-white/[0.3]"
                >
                  <div className="flex flex-row items-center">
                    <TeamColors colors={team.colors} />
                    <p className="text-lg">{team.name}</p>
                    {team.owner === user._id && (
                      <MdAdminPanelSettings className="opacity-40 text-2xl ml-2" />
                    )}
                  </div>
                  <div className="flex flex-row items-center">
                    <Popover className="relative">
                      <Popover.Button className={"flex flex-row items-center"}>
                        <MdOutlineMoreVert className="text-2xl" />
                      </Popover.Button>

                      <Popover.Panel className="absolute z-10 translate-y-[-30px] translate-x-[-110px] bg-dark-400">
                        <p className="px-4 py-2">Dashboard</p>
                        <p className="px-4 py-2">Leave</p>
                        <p className="px-4 py-2">Delete</p>
                        <p className="px-4 py-2">Dashboard</p>
                      </Popover.Panel>
                    </Popover>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>{`You don't currently belong to any teams`}</p>
      )}
      <button
        onClick={showModal}
        className="flex flex-row w-fit bg-red-500 hover:bg-red-400 my-2 py-4 px-4 rounded items-center"
      >
        Create a Team <MdAdd className="inline text-xl ml-3" />
      </button>
    </section>
  );
}

export default function DriverProfile() {
  const [teamsModalShown, setTeamsModalShown] = useState(false);
  const { data, error, mutate, isValidating } = useProfile();
  const router = useRouter();

  const showAddTeam = () => {
    setTeamsModalShown(true);
  };
  const hideAddTeam = () => {
    setTeamsModalShown(false);
  };

  useEffect(() => {
    if (!data && !error) return;
    if (!data.user) {
      router.replace("/?auth=sign-in");
    }
  }, [router, data, error]);
  const user = data?.user;
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      {!data && !error ? (
        <Loading />
      ) : (
        <>
          <CreateTeamModal
            isOpen={teamsModalShown}
            hide={hideAddTeam}
            mutate={mutate}
          />
          <main className="container bg-dark-300 px-0">
            <section className="p-8">
              <div className="flex flex-row ">
                <img
                  className="mr-5 ml-1 inline"
                  src={`/icons/flags/${user?.country.toLowerCase()}.svg`}
                  width="25px"
                  height="auto"
                />
                <h2>{user?.name}</h2>
              </div>
              <p>
                <MdEmail className="inline text-xl mr-3" />
                {user?.email}
              </p>
              <p>OSWR Rating: {user?.rating || 1500}</p>
            </section>
            <section className="bg-dark-200">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="flex flex-col w-full p-8 items-center justify-center">
                  <FaMedal size={90} />
                  <h2>Wins: 0</h2>
                </div>
                <div className="flex flex-col w-full p-8 items-center justify-center">
                  <IoMdPodium size={100} />
                  <h2>Podiums: 0</h2>
                </div>
                <div className="flex flex-col w-full p-8 items-center justify-center">
                  <RiTimerFill size={90} />
                  <h2>Pole Positions: 0</h2>
                </div>
              </div>
            </section>
            <TeamsSection
              router={router}
              teams={user?.teams}
              showModal={showAddTeam}
              user={user}
            />
          </main>
        </>
      )}
    </div>
  );
}

DriverProfile.layout = "Dashboard";

function Header() {
  return (
    <div
      className="h-60 w-full bg-cover"
      style={{
        backgroundImage: "url(/images/profileheader.jpg)",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-dark-100/[0.7] w-full h-full flex flex-col items-center justify-center ">
        <h1 className="dashboard-header">Driver Profile</h1>
      </div>
    </div>
  );
}
