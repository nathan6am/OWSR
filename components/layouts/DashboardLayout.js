import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../Sidebar";
import { useRouter } from "next/router";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { fetcher } from "../../lib/fetcher";
import Loading from "../Loading";
export default function DashboardLayout({ children }) {
  const [verifying, setVerifying] = useState(true);
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (isValidating) return;
    if (!user) {
      router.replace("/?auth=sign-in");
    } else if (user && !user.registered) {
      router.replace("/?auth=complete-profile");
    } else if (user && user.registered && !user.linked) {
      //router.replace("/?auth=link-steam");
    } else if (user && user.registered && user.linked) {
      setVerifying(false);
    }
  }, [user, router, isValidating]);
  const onSignOut = useCallback(async () => {
    try {
      await fetcher("/api/auth", {
        method: "DELETE",
      });
      setVerifying(true);
      mutate({ user: null });
      router.replace("/");
    } catch (e) {
      console.error(e.message);
    }
  }, [mutate]);
  return (
    <>
      {verifying ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-row">
          <Sidebar user={user} signOut={onSignOut} />
          <div className="flex-grow bg-dark-200">{children}</div>
        </div>
      )}
    </>
  );
}
