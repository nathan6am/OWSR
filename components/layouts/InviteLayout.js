import React, { useState, useEffect } from "react";

import AuthModal from "../AuthModal";

export default function InviteLayout({ children }) {
  return (
    <>
      <AuthModal />
      <div
        className="flex w-full min-h-screen"
        style={{ backgroundImage: "url(/images/bg.jpg)" }}
      >
        <main className="flex w-full min-h-screen bg-dark-100/[0.5] flex-col">
          <div className="w-full p-4">
            <img
              className="mx-auto my-4"
              src="/images/logo.png"
              width={200}
            ></img>
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
