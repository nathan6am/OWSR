import React, { useCallback } from "react";

//components
import Link from "next/link";
import { FaSteam } from "react-icons/fa";

//hooks
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

//util
import { fetcher } from "@/lib/fetcher";
import { showSignIn, showCompleteProfile } from "@/lib/util/navigateModal";

export default function LinkFailedContent() {
  // Handle Redirects if user profile is incomplete or user is already logged in
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
  const router = useRouter();
  // useEffect(() => {
  //   if (isValidating) return;
  //   if (!user) {
  //     showSignIn(router);
  //   } else if (user && !user.registered) {
  //     showCompleteProfile(router);
  //   } else if (user && user.registered && user.linked) {
  //     router.replace("/dashboard");
  //   }
  // }, [user, router, isValidating]);
  const onCancel = useCallback(async () => {
    try {
      await fetcher("/api/users/me", {
        method: "DELETE",
      });
      mutate({ user: null });
      showSignIn(router);
    } catch (e) {
      console.error(e.message);
    }
  }, [mutate]);
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
        <p className="text-center my-10 text-red-700">
          This Steam profile has already been linked to another account. Please
          use a different Steam account or{" "}
          <div
            onClick={onCancel}
            className="text-center text-white font-underline text-lg underline hover:text-red-400 cursor-pointer "
          >
            Sign In
          </div>
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
