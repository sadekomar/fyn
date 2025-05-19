"use client";

import { useState } from "react";
import Timeline from "./timeline";
import React from "react";

import { PositionData, PositionDetails } from "./PositionDetails";
import { WhyJoinLoom } from "./WhyJoinLoom";
import { CareersHero } from "./CareersHero";
import { OurValues } from "./OurValues";
import { ApplicationForm } from "./ApplicationForm";

enum Position {
  SoftwareEngineer = "SoftwareEngineer",
  CharacterDesigner = "CharacterDesigner",
  ContentCreator = "ContentCreator",
}

const contentCreator: PositionData = {
  title: "Content Creator",
  tags: ["Cairo, EG", "Part-time", "Posted 1 day ago"],
  details: {
    stipend: "Stipend provided (paid)",
    workingHours: "Working hours: 3-4 days a week / 20 hours a week.",
    duration: "Duration: 3 months",
  },
  responsibilities: [
    "Create engaging fashion content and help build our brand presence across social platforms.",
    "Assist in activations and campaigns execution.",
    "Willing to model for content when needed.",
    "Manage basic team coordination and administrative tasks.",
  ],
  requirements: [
    "Passion for fashion & digital marketing",
    "Strong communication & creative skills",
    "Comfortable with being in front of the camera",
    "Graphic design background is a plus",
  ],
};

const softwareEngineer: PositionData = {
  title: "Software Engineer",
  tags: ["Cairo, EG", "Part-time", "Posted 1 day ago"],
  details: {
    stipend: "Stipend provided (paid)",
    workingHours: "Working hours: 3-4 days a week / 20 hours a week.",
    duration: "Duration: 3 months",
  },
  responsibilities: [
    "Build and maintain our fashion discovery platform",
    "Develop responsive and user-friendly web interfaces",
    "Implement new features and optimize existing codebase",
    "Collaborate with design team to translate UI/UX designs into code",
    "Participate in code reviews and technical discussions",
  ],
  requirements: [
    "Experience with React, Next.js, and TypeScript",
    "Strong understanding of web development fundamentals",
    "Knowledge of modern CSS practices and responsive design",
    "Problem-solving skills and attention to detail",
    "Interest in fashion tech is a plus",
  ],
};

const characterDesigner: PositionData = {
  title: "Character Designer",
  tags: ["Cairo, EG", "Part-time", "Posted 1 day ago"],
  details: {
    stipend: "Stipend provided (paid)",
    workingHours: "Working hours: 3-4 days a week / 20 hours a week.",
    duration: "Duration: 3 months",
  },
  responsibilities: [
    "Create unique and engaging character designs for our brand",
    "Develop character concepts from initial sketches to final designs",
    "Design characters that align with our fashion-forward brand identity",
    "Collaborate with marketing team to implement characters in campaigns",
    "Maintain consistency in character style across different platforms",
  ],
  requirements: [
    "Strong portfolio demonstrating character design skills",
    "Proficiency in digital illustration tools (Photoshop, Illustrator, etc.)",
    "Understanding of fashion aesthetics and trends",
    "Ability to adapt style to brand guidelines",
    "Creative thinking and innovative approach to design",
  ],
};

export default function Careers() {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [showDetails, setShowDetails] = useState<Record<Position, boolean>>({
    [Position.SoftwareEngineer]: false,
    [Position.CharacterDesigner]: false,
    [Position.ContentCreator]: false,
  });

  return (
    <div className="careers-page">
      <CareersHero />
      <OurValues />
      <WhyJoinLoom />
      <section className="mx-4 md:mx-auto grid grid-cols-1 gap-4 max-w-[100ch] mb-10 md:grid-cols-3">
        <div className="flex flex-col gap-4 justify-between rounded-[26px] border border-[#0000001a] bg-gradient-to-b from-[#ffffff] to-[#ffffff] px-9 py-6 text-center shadow-[93px_75px_48px_rgba(166,162,222,0.02),52px_42px_40px_rgba(166,162,222,0.06),23px_19px_30px_rgba(166,162,222,0.1),6px_5px_16px_rgba(166,162,222,0.11)]">
          <div className="flex flex-col gap-1">
            <h5 className="text-[25px] font-semibold">Software Engineer</h5>
            <p className="text-gray-600">
              Build and maintain our fashion platform.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() =>
                setShowDetails((prev) => ({
                  [Position.SoftwareEngineer]: !prev[Position.SoftwareEngineer],
                  [Position.CharacterDesigner]: false,
                  [Position.ContentCreator]: false,
                }))
              }
              className="w-full rounded-full bg-[#A6A2DE] py-2 font-semibold text-white"
            >
              Apply Now
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-between rounded-[26px] border border-[#0000001a] bg-gradient-to-b from-[#fff] to-[#fff] px-9 py-6 text-center shadow-[93px_75px_48px_rgba(166,162,222,0.02),52px_42px_40px_rgba(166,162,222,0.06),23px_19px_30px_rgba(166,162,222,0.1),6px_5px_16px_rgba(166,162,222,0.11)]">
          <div className="flex flex-col gap-1">
            <h5 className="text-[25px] font-semibold">Character Designer</h5>
            <p className="text-gray-600">
              Design and develop characters for Loom.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() =>
                setShowDetails((prev) => ({
                  [Position.CharacterDesigner]:
                    !prev[Position.CharacterDesigner],
                  [Position.SoftwareEngineer]: false,
                  [Position.ContentCreator]: false,
                }))
              }
              className="w-full rounded-full bg-[#A6A2DE] py-2 font-semibold text-white"
            >
              Apply Now
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-between rounded-[26px] border border-[#0000001a] bg-gradient-to-b from-[#fff] to-[#fff] px-9 py-6 text-center shadow-[93px_75px_48px_rgba(166,162,222,0.02),52px_42px_40px_rgba(166,162,222,0.06),23px_19px_30px_rgba(166,162,222,0.1),6px_5px_16px_rgba(166,162,222,0.11)]">
          <div className="flex flex-col gap-1">
            <h5 className="text-[25px] font-semibold">Content Creator</h5>
            <p className="text-gray-600">
              Create engaging fashion content and help build our brand presence
              across social platforms.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() =>
                setShowDetails((prev) => ({
                  [Position.ContentCreator]: !prev[Position.ContentCreator],
                  [Position.SoftwareEngineer]: false,
                  [Position.CharacterDesigner]: false,
                }))
              }
              className="w-full rounded-full bg-[#A6A2DE] py-2 font-semibold text-white"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>
      {(showDetails[Position.SoftwareEngineer] ||
        showDetails[Position.CharacterDesigner] ||
        showDetails[Position.ContentCreator]) && (
        <PositionDetails
          setShowForm={setShowForm}
          positionData={
            showDetails[Position.SoftwareEngineer]
              ? softwareEngineer
              : showDetails[Position.CharacterDesigner]
                ? characterDesigner
                : showDetails[Position.ContentCreator]
                  ? contentCreator
                  : softwareEngineer // Default fallback
          }
        />
      )}

      {showForm && <ApplicationForm />}

      <Timeline />
    </div>
  );
}
