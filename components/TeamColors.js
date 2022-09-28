import React from "react";

export default function TeamColors({ colors }) {
  return (
    <div className="flex flex-row">
      <div
        className="h-6 w-6 skew-x-[-15deg] mr-2"
        style={{ backgroundColor: colors.primary }}
      />
      <div
        className="h-6 w-3 skew-x-[-15deg] mr-4"
        style={{ backgroundColor: colors.secondary }}
      />
    </div>
  );
}
