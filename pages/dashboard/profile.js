import React, { useEffect } from "react";

//components
import Loading from "@/components/Loading";

//hooks
import { useProfile } from "hooks/useProfile";
import { useRouter } from "next/router";

export default function DriverProfile() {
  const { data, error, mutate, isValidating } = useProfile();
  const router = useRouter();
  useEffect(() => {
    if (!data && !error) return;
    if (!data.user) {
      router.replace("/?auth=sign-in");
    }
  }, [router, data, error]);
  const user = data?.user;
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      {isValidating ? (
        <Loading />
      ) : (
        <main className="container bg-dark-300">
          <section className="p-8">
            <div className="flex flex-row ">
              <img
                className="mr-5 ml-1 inline"
                src={`/icons/flags/${user?.country.toLowerCase()}.svg`}
                width="25px"
                height="auto"
              />
              <h2>{user?.name}</h2>
            </div>
            <p>{user?.email}</p>
          </section>
        </main>
      )}
    </div>
  );
}

DriverProfile.layout = "Dashboard";

function Header() {
  return (
    <div
      className="h-60 w-full bg-cover"
      style={{
        backgroundImage: "url(/images/profileheader.jpg)",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-dark-100/[0.7] w-full h-full flex flex-col items-center justify-center ">
        <h1 className="dashboard-header">Driver Profile</h1>
      </div>
    </div>
  );
}
