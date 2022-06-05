import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";

import AuthModal from "../AuthModal";

export default function Layout({ children }) {
  return (
    <>
      <AuthModal />
      <div className="flex w-full min-h-screen">
        <header className="fixed fixed-top w-full z-10">
          <Navbar />
        </header>
        <main className="flex w-full bg-dark-200">{children}</main>
      </div>
    </>
  );
}
