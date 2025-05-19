"use client";

import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimelineStep {
  id: number;
  title: string;
  completed: boolean;
}

export default function Timeline() {
  const [steps, setSteps] = useState<TimelineStep[]>([
    { id: 1, title: "Application", completed: false },
    { id: 2, title: "Online interview", completed: false },
    {
      id: 3,
      title: "In-person interview & skills assessment",
      completed: false,
    },
    { id: 4, title: "Offer", completed: false },
  ]);

  const [progress, setProgress] = useState(0);

  // Loop through the timeline steps continuously
  useEffect(() => {
    const timer = setTimeout(() => {
      // Increment progress or reset to 0 if we've reached the end
      const nextProgress = (progress + 1) % (steps.length + 1);
      setProgress(nextProgress);

      // Update completed status
      setSteps(
        steps.map((step, index) => {
          // If we're at 0, reset all steps to incomplete
          if (nextProgress === 0) {
            return { ...step, completed: false };
          }
          // Otherwise mark steps as completed based on progress
          return index < nextProgress
            ? { ...step, completed: true }
            : { ...step, completed: false };
        }),
      );
    }, 1000); // Slightly longer delay for better visibility

    return () => clearTimeout(timer);
  }, [progress, steps]);

  return (
    <section className="mx-4 md:mx-auto flex max-w-[100ch] items-center justify-between px-4 py-12">
      <div>
        <h2 className="mt-10 mb-4 text-[39.06px] font-bold">How we hire</h2>
        <p className="bg-gradient-to-r from-[#383838] to-[rgb(146,97,226)] bg-clip-text text-lg font-bold text-transparent">
          Loom's process
        </p>
      </div>

      <div className="relative">
        {/* Static background line */}
        <div className="absolute top-[24px] left-[9px] h-[calc(100%-48px)] w-[2px] bg-gray-200"></div>

        {/* Animated progress line */}
        <motion.div
          className="absolute top-[24px] left-[9px] w-[2px] bg-gray-500"
          initial={{ height: 0 }}
          animate={{
            height:
              progress === 0
                ? "0%"
                : `${(progress * 100) / (steps.length - 1)}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ maxHeight: "calc(100% - 48px)" }}
        ></motion.div>

        {/* Timeline steps */}
        <div className="flex flex-col space-y-16">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              <motion.div
                className={`h-5 w-5 rounded-full border-2 ${
                  step.completed
                    ? "border-gray-500 bg-gray-500"
                    : "border-gray-300 bg-white"
                } z-10`}
                initial={{ scale: 1 }}
                animate={{
                  scale: step.completed ? [1, 1.2, 1] : 1,
                  backgroundColor: step.completed ? "#6B7280" : "#FFFFFF",
                  borderColor: step.completed ? "#6B7280" : "#D1D5DB",
                }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              <div className="ml-6">
                <p className="text-base font-medium">{step.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
