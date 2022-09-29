import React, { useContext, useEffect, useState } from "react";

//icons
import Helmet from "../public/icons/helmet.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaFlagCheckered, FaTrophy } from "react-icons/fa";
import {
  MdNotifications,
  MdLogout,
  MdOutlineFormatListNumbered,
} from "react-icons/md";

//componenets
import Link from "next/link";
import ReactTooltip from "react-tooltip";

//hooks
import { useRouter } from "next/router";

//context
import { UserContext } from "./layouts/DashboardLayout";

export default function Sidebar({ signOut, toggle, collapse }) {
  const user = useContext(UserContext);

  //Set active tab based on router path
  const router = useRouter();
  const pathname = router.pathname;
  const [activeTab, setActiveTab] = useState("my-races");

  useEffect(() => {
    if (pathname.startsWith("/dashboard/my-races")) {
      setActiveTab("my-races");
    } else if (pathname.startsWith("/dashboard/events")) {
      setActiveTab("events");
    } else if (pathname.startsWith("/dashboard/results")) {
      setActiveTab("results");
    } else if (pathname.startsWith("/dashboard/leagues")) {
      setActiveTab("leagues");
    } else if (pathname.startsWith("/dashboard/profile")) {
      setActiveTab("profile");
    } else {
      return;
    }
  }, [pathname]);
  return (
    <div
      className={` z-[100] min-h-screen  w-[300px] bg-dark-200 flex flex-col justify-between h-full border-r border-dark-400 fixed trasition ease-in-out duration-500 ${
        collapse
          ? "translate-x-[-300px] sm:translate-x-[-230px]"
          : "translate-x-0 "
      }`}
    >
      <nav className="flex flex-col">
        <div className="flex flex-row py-5 pl-10 pr-7 border-b justify-between">
          <img src="/images/logo.png" width="120px" height="auto" />
          <button className="text-white hover:opacity-75" onClick={toggle}>
            <GiHamburgerMenu size={20} />
          </button>
        </div>
        <ul className="">
          <SidebarNavItem
            icon={FaFlagCheckered}
            activeTab={activeTab}
            collapse={collapse}
            activeKey="my-races"
            href="/dashboard/my-races"
            label="My Races"
          />
          <SidebarNavItem
            icon={BsFillCalendar2WeekFill}
            activeTab={activeTab}
            activeKey="events"
            href="/dashboard/events"
            label="Events"
            collapse={collapse}
          />
          <SidebarNavItem
            icon={FaTrophy}
            activeTab={activeTab}
            activeKey="leagues"
            href="/dashboard/leagues"
            label="Leagues"
            collapse={collapse}
          />
          <SidebarNavItem
            icon={MdOutlineFormatListNumbered}
            activeTab={activeTab}
            activeKey="results"
            href="/dashboard/results"
            label="Results"
            collapse={collapse}
          />
          <SidebarNavItem
            icon={Helmet}
            activeTab={activeTab}
            activeKey="profile"
            href="/dashboard/profile"
            label="Driver Profile"
            collapse={collapse}
          />
        </ul>
      </nav>
      <div className="flex flex-row items-center justify-between bg-dark-300 py-6 px-4 border-t">
        <div className="flex flex-row ">
          <img
            className="mr-5 ml-1 inline"
            src={`/icons/flags/${user?.country.toLowerCase()}.svg`}
            width="25px"
            height="auto"
          />
          <p>{user?.name}</p>
        </div>
        <ReactTooltip effect="solid" place="right" />
        <button data-tip="Logout" onClick={signOut}>
          <MdLogout className="hover:opacity-75" size="30px" />
        </button>
      </div>
    </div>
  );
}

const SidebarNavItem = ({
  icon: Icon,
  activeTab,
  activeKey,
  label,
  href,
  collapse,
  iconSize,
}) => {
  const active = activeTab === activeKey;
  return (
    <Link href={href}>
      <li
        className={` cursor-pointer py-5 px-8 flex flex-row ${
          active ? "bg-white/[0.2] " : "hover:bg-white/[0.1] "
        }`}
      >
        <Icon
          className={`inline ${
            active ? "fill-red-500 text-red-500" : "fill-white text-white "
          } ${collapse ? "sm:translate-x-[223px] sm:mr-0 mr-6" : "mr-6"}`}
          size={iconSize || 20}
        />
        {label}
      </li>
    </Link>
  );
};
