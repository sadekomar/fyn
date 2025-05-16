import React from "react";
import { PositionSidebar } from "./PositionSidebar";

export function PositionDetails({
  setShowForm,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <section className="mb-10 bg-[#f1f1f1]" id="fashion-marketing-intern">
      <div className="mx-auto flex max-w-[100ch] flex-col justify-between py-10 sm:flex-row">
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-[31.25px] font-bold">Fashion Marketing Intern</h3>

          <div className="flex flex-wrap gap-2">
            {["Cairo, EG", "Part-time", "Posted 1 day ago"].map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-[#E9E9F6] px-3 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium">Stipend provided (paid)</p>
            <p className="font-medium">
              Working hours: 3-4 days a week / 20 hours a week.
            </p>
            <p className="font-medium">Duration: 3 months</p>
          </div>

          <div>
            <h4 className="font-semibold">Responsibilities</h4>
            <ul className="ml-6 list-inside list-disc text-[#3F3F3F]">
              <li>Assist in partnership outreach with local fashion brands.</li>
              <li>
                Help in content creation (social media posts, videos, blogs).
              </li>
              <li>Assist in activations and campaigns execution.</li>
              <li>Willing to model for content when needed.</li>
              <li>Manage basic team coordination and administrative tasks.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Requirements</h4>
            <ul className="ml-6 list-inside list-disc text-[#3F3F3F]">
              <li>Passion for fashion & digital marketing</li>
              <li>Strong communication & creative skills</li>
              <li>Comfortable with being in front of the camera</li>
              <li>Graphic design background is a plus</li>
            </ul>
          </div>
        </div>

        <PositionSidebar setShowForm={setShowForm} />
      </div>
    </section>
  );
}
