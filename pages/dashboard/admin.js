import React, { useState } from "react";
import AddCarForm from "@/components/forms/AddCarForm";
import AddTrackForm from "@/components/forms/AddTrackForm";

export default function AdminPortal() {
  return (
    <div className="container">
      <AddCarForm />
      <AddTrackForm />
    </div>
  );
}

AdminPortal.layout = "Dashboard";
