import { View, Text } from "react-native";
import React from "react";

export default function TeamDashboard({ teamid }) {
  return (
    <View>
      <Text>{teamid}</Text>
    </View>
  );
}

TeamDashboard.layout = "Dashboard";

TeamDashboard.getInitialProps = async ({ query }) => {
  const { teamid } = query;
  return {
    teamid,
  };
};
