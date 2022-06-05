import React, { useCallback, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaFlagCheckered, FaTrophy } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import Helmet from "../public/icons/helmet.svg";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar({ user, signOut }) {
  const router = useRouter();
  const pathname = router.pathname;
  const [activeTab, setActiveTab] = useState("my-races");
  useEffect(() => {
    if (pathname.startsWith("/dashboard/my-races")) {
      setActiveTab("my-races");
    } else if (pathname.startsWith("/dashboard/events")) {
      setActiveTab("events");
    } else if (pathname.startsWith("/dashboard/championships")) {
      setActiveTab("championships");
    } else if (pathname.startsWith("/dashboard/profile")) {
      setActiveTab("profile");
    } else {
      return;
    }
  }, [pathname]);
  return (
    <div className="min-h-screen w-[320px] bg-dark-300 flex flex-col h-full">
      <nav className="flex flex-col">
        <div className="flex flex-row py-5 px-10 border-b justify-between">
          <img src="/images/logo.png" width="120px" height="auto" />
          <button
            className="text-white hover:opacity-75"
            onClick={() => {
              console.log("collapse");
            }}
          >
            <GiHamburgerMenu size={20} />
          </button>
        </div>
        <ul className="">
          <li className="py-5 px-8 hover:bg-white/[0.1] flex flex-row items-center">
            <FaFlagCheckered size={19} className="inline mr-6 text-white" />
            My Races
          </li>
          <li className="py-5 px-8 hover:bg-white/[0.1] flex flex-row items-center">
            <BsFillCalendar2WeekFill
              size={19}
              className="inline mr-6 text-white"
            />
            Events
          </li>
          <li className="py-5 px-8 hover:bg-white/[0.1] flex flex-row items-center">
            <FaTrophy size={24} className="inline mr-5 text-white" />{" "}
            Championships
          </li>
          <li className="py-5 px-8 hover:bg-white/[0.1]">
            <MdNotifications size={24} className="inline mr-5 text-white" />
            Notifications
          </li>
          <Link href="/dashboard/profile">
            <li
              className={` cursor-pointer py-5 px-8 flex flex-row ${
                activeTab === "profile"
                  ? "bg-white/[0.2] "
                  : "hover:bg-white/[0.1] "
              }`}
            >
              <Helmet
                className={`${
                  activeTab === "profile"
                    ? "fill-red-500 "
                    : "fill-white text-white "
                } mr-5`}
              />
              Driver Profile
            </li>
          </Link>
        </ul>
      </nav>
      <div className="justify-self-end py-10 px-8">
        <p>{`Signed in as ${user?.name}`}</p>
      </div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
