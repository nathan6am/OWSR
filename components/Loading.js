import React from "react";
import { BeatLoader } from "react-spinners";

//Generic loading componenet
export default function Loading({ text }) {
  return (
    <div className="flex w-full h-full min-h-[400px] justify-center items-center">
      {text || "Loading"}{" "}
      <BeatLoader size={10} color={"#e5494c"} className="ml-4" />
    </div>
  );
}
