import React, { useEffect, useState, useCallback, createContext } from "react";
import Sidebar from "../Sidebar";
import { useRouter } from "next/router";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { fetcher } from "@/lib/fetcher";
import { GiHamburgerMenu } from "react-icons/gi";
import Loading from "../Loading";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "@react-hook/media-query";

export const UserContext = createContext();
export default function DashboardLayout({ children }) {
  const [verifying, setVerifying] = useState(true);
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
  const isMobile = useMediaQuery("only screen and (max-width: 640px)");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isMobile);

  const router = useRouter();
  useEffect(() => {
    if (isValidating) return;
    if (!user) {
      router.replace("/?auth=sign-in");
    } else if (user && !user.registered) {
      router.replace("/?auth=complete-profile");
    } else if (user && user.registered && !user.linked) {
      router.replace("/?auth=link-steam");
    } else if (user && user.registered && user.linked) {
      setVerifying(false);
    }
  }, [user, router, isValidating]);
  useEffect(() => {
    console.log(isMobile);
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [router.asPath]);
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
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
        <>
          <UserContext.Provider value={user}>
            <Toaster position="top-right" />
            <button
              className={`text-white z-[90] hover:opacity-75 fixed top-4 left-6 p-2 bg-white/[0.3] rounded-xl sm:hidden ${
                sidebarCollapsed ? "sm:hidden" : "hidden"
              }`}
              onClick={toggleSidebar}
            >
              <GiHamburgerMenu size={25} />
            </button>

            <Sidebar
              signOut={onSignOut}
              collapse={sidebarCollapsed}
              toggle={toggleSidebar}
            />
            <main
              className={`w-full bg-dark-150 trasition ease-in-out duration-500 ${
                sidebarCollapsed
                  ? "pl-0 sm:pl-[70px]"
                  : "sm:pl-[70px] lg:pl-[300px]"
              } min-h-screen`}
            >
              {children}
            </main>
          </UserContext.Provider>
        </>
      )}
    </>
  );
}
