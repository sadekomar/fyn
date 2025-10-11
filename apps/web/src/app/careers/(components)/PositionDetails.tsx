import React from "react";
import { PositionSidebar } from "./PositionSidebar";

export interface PositionData {
  title: string;
  tags: string[];
  details: {
    stipend: string;
    workingHours: string;
    duration: string;
  };
  responsibilities: string[];
  requirements: string[];
}

export function PositionDetails({
  setShowForm,
  positionData,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  positionData: PositionData;
}) {
  return (
    <section className="mb-10 bg-[#f1f1f1]" id="fashion-marketing-intern">
      <div className="mx-4 md:mx-auto flex max-w-[100ch] flex-col justify-between py-10 sm:flex-row">
        <div className="space-y-4 md:col-span-2 mb-10">
          <h3 className="text-[31.25px] font-bold">
            Content Creator / Marketeer Internship
          </h3>

          <div className="flex flex-wrap gap-2">
            {positionData.tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-[#E9E9F6] px-3 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium">{positionData.details.stipend}</p>
            <p className="font-medium">{positionData.details.workingHours}</p>
            <p className="font-medium">{positionData.details.duration}</p>
          </div>

          <div>
            <h4 className="font-semibold">Responsibilities</h4>
            <ul className="ml-6 list-inside list-disc text-[#3F3F3F]">
              {positionData.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Requirements</h4>
            <ul className="ml-6 list-inside list-disc text-[#3F3F3F]">
              {positionData.requirements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <PositionSidebar setShowForm={setShowForm} />
      </div>
    </section>
  );
}
