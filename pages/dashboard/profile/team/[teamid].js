import React from "react";

export default function TeamDashboard({ teamid }) {
  return (
    <div>
      <p>{teamid}</p>
    </div>
  );
}

TeamDashboard.layout = "Dashboard";

TeamDashboard.getInitialProps = async ({ query }) => {
  const { teamid } = query;
  return {
    teamid,
  };
};
