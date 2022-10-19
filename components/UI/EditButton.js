import React from "react";
import { MdEdit } from "react-icons/md";
export default function EditButton({ onClick, className, ...props }) {
  return (
    <button className={className} onClick={onClick} {...props}>
      <div className="flex-row flex opacity-50 hover:opacity-75">
        <MdEdit className="text-2xl ml-4 mr-1" />
        Edit
      </div>
    </button>
  );
}
