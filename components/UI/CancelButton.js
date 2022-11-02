import React from "react";
import { MdClose } from "react-icons/md";
export default function CancelButton({ onClick, className, ...props }) {
  return (
    <button className={className} onClick={onClick} {...props}>
      <div className="flex-row flex text-red-400 hover:text-red-300 items-center">
        <MdClose className="text-xl ml-4 mr-1" />
        Cancel
      </div>
    </button>
  );
}
