import React from "react";

export default function LeagueDashboard() {
  return <div></div>;
}

LeagueDashboard.layout = "Dashboard";

LeagueDashboard.getInitialProps = async ({ query }) => {
  const { leagueid } = query;
  return {
    teamid,
  };
};
