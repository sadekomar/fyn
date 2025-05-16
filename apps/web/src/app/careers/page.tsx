"use client";

import { useState } from "react";
import Timeline from "./timeline";
import React from "react";

import { PositionDetails } from "./PositionDetails";
import { WhyJoinLoom } from "./WhyJoinLoom";
import { CareersHero } from "./CareersHero";
import { OurValues } from "./OurValues";
import { ApplicationForm } from "./ApplicationForm";

export default function Careers() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="careers-page">
      <CareersHero />
      <OurValues />
      <WhyJoinLoom />
      <PositionDetails setShowForm={setShowForm} />

      {showForm && <ApplicationForm />}

      <Timeline />
    </div>
  );
}
