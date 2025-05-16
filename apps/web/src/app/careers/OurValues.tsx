import { motion } from "framer-motion";
import React from "react";

export function OurValues() {
  return (
    <section className="mx-auto mb-20 max-w-[100ch]">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="max-w-[420px]">
          <h2 className="mt-10 mb-4 text-[39.06px] font-bold">Our values</h2>
          <h3 className="text-[20px] font-semibold">Detail oriented</h3>
          <div className="mb-4 leading-6 font-medium text-[#4E4E4E]">
            We pay attention to the small things that make a big difference,
            ensuring quality in everything we do.
          </div>
          <h3 className="text-[20px] font-semibold">
            Obsession with intuitiveness
          </h3>
          <div className="mb-4 leading-6 font-medium text-[#4E4E4E]">
            We obsess over making our product easy to use, intuitive, and
            delightful.
          </div>
          <h3 className="text-[20px] font-semibold">
            Fast execution & innovation
          </h3>
          <div className="mb-4 leading-6 font-medium text-[#4E4E4E]">
            We move fast and break things, but always with a clear purpose and
            direction.
          </div>
        </div>

        <motion.div
          className="flex flex-1 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative h-[300px] w-[300px]">
            <motion.div
              className="absolute inset-0 rounded-full bg-[#E9E8F6]"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-4 rounded-full bg-[#A6A2DE] opacity-40"
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [360, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-8 rounded-full bg-[#8B86D9] opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-4xl font-bold text-white"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
