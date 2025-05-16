import React from "react";
import { TiktokIcon, InstagramIcon } from "../../components/Icons/CustomIcons";
import { NotTheRightFit } from "./NotTheRightFit";

export function PositionSidebar({
  setShowForm,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleApplyClick = () => {
    setShowForm(true);
    setTimeout(() => {
      document
        .querySelector(".application-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="space-y-3 md:max-w-[340px]">
      <div className="space-y-4 rounded-[26px] border border-[#0000001a] bg-gradient-to-b from-[#E9E8F6] to-[#F3F2FB] px-9 py-6 text-center shadow-[93px_75px_48px_rgba(166,162,222,0.02),52px_42px_40px_rgba(166,162,222,0.06),23px_19px_30px_rgba(166,162,222,0.1),6px_5px_16px_rgba(166,162,222,0.11)]">
        <div className="flex flex-col gap-1">
          <h5 className="text-[25px] font-semibold">Apply for position</h5>
          <p className="text-gray-600">
            Ready to join Loom? Submit your application below.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleApplyClick}
            className="w-full rounded-full bg-[#A6A2DE] py-2 font-semibold text-white"
          >
            Apply Now
          </button>
        </div>
      </div>

      <div className="rounded-[26px] border border-[#0000001a] bg-gradient-to-b from-[#E9E8F6] to-[#F3F2FB] p-4 text-center shadow-[93px_75px_48px_rgba(166,162,222,0.02),52px_42px_40px_rgba(166,162,222,0.06),23px_19px_30px_rgba(166,162,222,0.1),6px_5px_16px_rgba(166,162,222,0.11)]">
        <h5 className="text-lg font-semibold">Share this job</h5>
        <div className="mt-2 flex justify-center gap-4 text-sm text-gray-600">
          <a href="#" className="font-bold">
            <TiktokIcon />
          </a>
          <a href="#" className="font-bold">
            <InstagramIcon />
          </a>
        </div>
      </div>

      <NotTheRightFit />
    </div>
  );
}
