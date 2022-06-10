import React from "react";
import { MdClose, MdOutlineExpandMore } from "react-icons/md";
export default function EventFilters() {
  return (
    <div className="py-5 border-b flex flex-row justify-between items-center">
      <h2 className="text-2xl">Event Search</h2>
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center">
        <button className="text-red-500 hover:text-red-400 ">
          Show Filters <MdOutlineExpandMore className="inline " />
        </button>
        <button className="text-white bg-white/[0.1] hover:bg-white/[0.2] rounded p-2 px-4 ml-4 flex flex-row items-center mb-2 sm:mb-0">
          Clear Search <MdClose className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}
