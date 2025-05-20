"use client";

import { useState } from "react";
import Timeline from "./(components)/timeline";
import React from "react";

import { PositionData, PositionDetails } from "./(components)/PositionDetails";
import { WhyJoinLoom } from "./(components)/WhyJoinLoom";
import { CareersHero } from "./(components)/CareersHero";
import { OurValues } from "./(components)/OurValues";
import { ApplicationForm } from "./(components)/ApplicationForm";

export default function Careers() {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [showDetails, setShowDetails] = useState<Record<Position, boolean>>({
    [Position.SoftwareEngineer]: false,
    [Position.CharacterDesigner]: false,
    [Position.ContentCreator]: true,
  });

  return (
    <div className="careers-page">
      <CareersHero />
      <OurValues />
      <WhyJoinLoom />
      <PositionDetails
        setShowForm={setShowForm}
        positionData={contentCreatorData}
      />
      {showForm && <ApplicationForm />}

      <Timeline />
    </div>
  );
}

enum Position {
  SoftwareEngineer = "SoftwareEngineer",
  CharacterDesigner = "CharacterDesigner",
  ContentCreator = "ContentCreator",
}

const positionCardsData = [
  {
    title: Position.SoftwareEngineer,
    description: "Build and maintain our fashion platform.",
  },
  {
    title: Position.CharacterDesigner,
    description: "Design characters for Loom.",
  },
  {
    title: Position.ContentCreator,
    description:
      "Create engaging fashion content and help build our brand presence across social platforms.",
  },
];

const contentCreatorData: PositionData = {
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

const softwareEngineerData: PositionData = {
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

const characterDesignerData: PositionData = {
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

function Positions(
  setShowDetails: React.Dispatch<
    React.SetStateAction<Record<Position, boolean>>
  >,
) {
  return (
    <section className="mx-4 md:mx-auto grid grid-cols-1 gap-4 max-w-[100ch] mb-10 md:grid-cols-3">
      {positionCardsData.map((position) => (
        <PositionCard
          key={position.title}
          setShowDetails={setShowDetails}
          position={position}
        />
      ))}
    </section>
  );
}

function PositionCard({
  setShowDetails,
  position,
}: {
  setShowDetails: React.Dispatch<
    React.SetStateAction<Record<Position, boolean>>
  >;
  position: {
    title: Position;
    description: string;
  };
}) {
  return (
    <div className="flex flex-col gap-4 justify-between rounded-[26px] border border-[#0000001a] bg-gradient-to-b from-[#ffffff] to-[#ffffff] px-9 py-6 text-center shadow-[93px_75px_48px_rgba(166,162,222,0.02),52px_42px_40px_rgba(166,162,222,0.06),23px_19px_30px_rgba(166,162,222,0.1),6px_5px_16px_rgba(166,162,222,0.11)]">
      <div className="flex flex-col gap-1">
        <h5 className="text-[25px] font-semibold">
          {position.title.replace(/([a-z])([A-Z])/g, "$1 $2")}
        </h5>
        <p className="text-gray-600 text-left">{position.description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={() =>
            setShowDetails((prev) => {
              const newState = Object.values(Position).reduce(
                (acc, pos) => ({ ...acc, [pos]: false }),
                {} as Record<Position, boolean>,
              );
              newState[position.title] = !prev[position.title];
              return newState;
            })
          }
          className="w-full rounded-full bg-[#A6A2DE] py-2 font-semibold text-white"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
