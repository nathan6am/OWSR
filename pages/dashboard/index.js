import React, { useEffect } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";

//Auto redirect
export default function Dashboard() {
  const { data, error, mutate } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (!data && !error) return;
    if (!data.user) {
      router.replace("/?auth=sign-in");
    } else {
      router.replace("/dashboard/my-races");
    }
  }, [router, data, error]);
  return <Loading />;
}

Dashboard.layout = "Dashboard";
