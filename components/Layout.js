import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const modalOpen = useSelector((state) => state.authModal.isOpen);
  return (
    <div className="flex w-full min-h-screen">
      <header className="fixed fixed-top w-full z-10">
        <Navbar />
      </header>
      <main className="flex w-full bg-dark-200">{children}</main>
    </div>
  );
}
