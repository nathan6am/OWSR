import React, { useEffect, useState } from "react";

//components
import Loading from "@/components/Loading";
import { MdEmail, MdAdd, MdCancel } from "react-icons/md";
import { IoMdPodium } from "react-icons/io";
import { FaMedal } from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
import GenericModal from "@/components/GenericModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ChromePicker } from "react-color";
import { HexColorPicker } from "react-colorful";
import { Popover } from "@headlessui/react";
import NonSSRWrapper from "@/components/no-ssr-wrapper";
//hooks
import { useProfile } from "hooks/useProfile";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function CreateTeamModal({ isOpen, hide }) {
  const [color, setColor] = useState("#ffffff");

  const [colorText, setColorText] = useState(color.slice(1, 7));

  const [colorSecondary, setColorSecondary] = useState("#ffffff");

  const [colorSecondaryText, setColorSecondaryText] = useState(
    colorSecondary.slice(1, 7)
  );

  const handleChange = (e) => {
    e.preventDefault;
    const text = e.target.value;
    console.log(text.length);
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
    console.log(text.length);
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

  return (
    <GenericModal isOpen={isOpen} hide={hide}>
      <div className="flex w-full flex-col justify-between p-5 min-h-[600px]">
        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <div className="flex flex-col justify-center items-center">
              <h2>Create a Team</h2>
              <label
                htmlFor="name"
                className="text-white/[0.4] align-left text-left w-full mb-1"
              >
                Team Name:
              </label>
              <Field
                id="name"
                name="name"
                type="name"
                placeholder="Choose a name for you team"
                className={`input-field`}
              />

              <label
                htmlFor="description"
                className="text-white/[0.4] align-left text-left w-full  mb-1"
              >
                Description:
              </label>
              <Field
                id="description"
                name="description"
                type="description"
                placeholder="Description (optional)"
                component="textarea"
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
                <Popover.Button className={"flex flex-row items-center"}>
                  <div
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 p-4 mr-2 rounded-sm border-2 border-white/[0.2]`}
                  ></div>
                  <p>Primary Color</p>
                </Popover.Button>

                <Popover.Panel className="absolute z-10 translate-y-[-100px] translate-x-[200px]">
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
                <Popover.Button className={"flex flex-row items-center"}>
                  <div
                    style={{ backgroundColor: colorSecondary }}
                    className={`w-8 h-8 p-4 mr-2 rounded-sm border-2 border-white/[0.2]`}
                  ></div>
                  <p>Secondary Color</p>
                </Popover.Button>

                <Popover.Panel className="absolute z-10 translate-y-[-100px] translate-x-[200px]">
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
          </Form>
        </Formik>
        <button
          onClick={hide}
          className="flex flex-row w-fit bg-red-500 hover:bg-red-400 my-2 py-2 px-4 rounded items-center justify-self-end"
        >
          Cancel <MdCancel className="inline text-xl ml-3" />
        </button>
      </div>
    </GenericModal>
  );
}

function TeamsSection({ teams, showModal, hideModal }) {
  return (
    <section className="w-full bd-dark-200 p-8">
      <h2>My Teams</h2>
      {teams ? <></> : <p>You don't currently belong to any teams</p>}
      <button
        onClick={showModal}
        className="flex flex-row w-fit bg-red-500 hover:bg-red-400 my-2 py-2 px-4 rounded items-center"
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
    if (data) {
      console.log(data);
    }
  }, [router, data, error]);
  const user = data?.user;
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      {isValidating ? (
        <Loading />
      ) : (
        <>
          <CreateTeamModal isOpen={teamsModalShown} hide={hideAddTeam} />
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
            <TeamsSection teams={user?.teams} showModal={showAddTeam} />
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
