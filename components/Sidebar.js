import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillCalendar2WeekFill } from "react-icons/bs"
import { FaFlagCheckered, FaTrophy } from "react-icons/fa"
import Helmet from "../public/icons/helmet.svg"
export default function Sidebar() {
  return (
    <div className="min-h-screen w-[320px] bg-dark-300 flex flex-col h-full">
      <nav className="flex flex-col">
        <div className="flex flex-row p-5 border-b justify-between">
            <img src="/images/logo.png" width="120px" height="auto"/>
          <button
            className="text-white hover:opacity-75"
            onClick={() => {
              console.log("collapse");
            }}
          >
            <GiHamburgerMenu size={30} />
          </button>
        </div>
        <ul className="">
          <li className="py-5 px-5 hover:bg-white/[0.1] flex flex-row items-center"><FaFlagCheckered size={16} className="inline mr-3 text-white"/>My Races</li>
          <li className="py-5 px-5 hover:bg-white/[0.1] flex flex-row items-center"><BsFillCalendar2WeekFill size={16} className="inline mr-3 text-white"/>Events</li>
          <li className="py-5 px-5 hover:bg-white/[0.1] flex flex-row items-center"><FaTrophy size={16} className="inline mr-3 text-white"/> Championships</li>
          <li className="py-5 px-5 hover:bg-white/[0.1]">Notifications</li>
          <li className="py-5 px-5 hover:bg-white/[0.1] flex flex-row"><Helmet className="text-white fill-white mr-3"/>Driver Profile</li>
        </ul>
      </nav>
      <div className="justify-self-end py-10 px-5">
          <p>hello</p>
      </div>
    </div>
  );
}
