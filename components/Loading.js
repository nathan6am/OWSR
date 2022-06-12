import React from "react";
import { RingLoader, BeatLoader } from "react-spinners";
export default function Loading() {
  return (
    <div className="flex w-full h-full min-h-[400px] justify-center items-center">
      Loading <BeatLoader size={10} color={"#e5494c"} />
    </div>
  );
}
