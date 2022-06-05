import React from "react";
import { RingLoader } from "react-spinners";
export default function Loading() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <RingLoader size={60} color={"#e5494c"} />
    </div>
  );
}
