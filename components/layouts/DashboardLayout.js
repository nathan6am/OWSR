import React from "react";
import Sidebar from "../Sidebar";
export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex-grow bg-dark-200">{children}</div>
      </div>
    </>
  );
}
