import React, { useEffect } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data, error, mutate } = useCurrentUser();
  const router = useRouter();
  useEffect(() => {
    if (!data && !error) return;
    if (!data.user) {
      router.replace("/?auth=sign-in");
    }
  }, [router, data, error]);
  return <div>{data?.user?._id}</div>;
}

Dashboard.layout = "Dashboard";
