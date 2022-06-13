import React, { useState, useCallback, useRef, useEffect } from "react";

//components
import Link from "next/link";
import { FaSteam } from "react-icons/fa";

//hooks
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

//util
import { showSignIn, showCompleteProfile } from "@/lib/util/navigateModal";

export default function LinkSteamContent() {
  const router = useRouter();
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();

  // Handle Redirects if user profile is incomplete or user is already logged in
  useEffect(() => {
    if (isValidating) return;
    if (!user) {
      //show[page] functions take router as arg to append query to url for contextual routing of modal
      showSignIn(router);
    } else if (user && !user.registered) {
      showCompleteProfile(router);
    } else if (user && user.registered && user.linked) {
      router.replace("/dashboard");
    }
  }, [user, router, isValidating]);

  return (
    <>
      <img
        className="mx-auto my-4 sm:my-8"
        src="/images/logo.png"
        width={200}
      ></img>
      <div className="flex flex-col justify-center min-h-[300px]">
        <h1 className="text-red-700 text-center text-xl mb-3">
          Link Your Steam Profile
        </h1>
        <p className="text-center my-10">
          Connect your steam profile to complete your account setup!
        </p>
        <Link href="/api/auth/steam/connect">
          <button className="btn-social bg-white/[0.2] hover:bg-white/[0.3] mb-10">
            <FaSteam size="20px" className="mr-2" />
            Connect With Steam
          </button>
        </Link>
      </div>
    </>
  );
}
