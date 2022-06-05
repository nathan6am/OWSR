import React, { useEffect } from "react";
import { useProfile } from "hooks/useProfile";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data, error, mutate } = useProfile();
  const router = useRouter();
  useEffect(() => {
    if (!data && !error) return;
    if (!data.user) {
      router.replace("/?auth=sign-in");
    }
  }, [router, data, error]);
  return <div>{JSON.stringify(data?.user)}</div>;
}

Dashboard.layout = "Dashboard";
