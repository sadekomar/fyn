import React from "react";
import Link from "next/link";

export function CareersHero() {
  return (
    <section className="mx-4 mb-12 md:mx-auto max-w-[100ch]">
      <h1 className="my-10 text-[40px] md:text-[61.04px] font-bold">Careers</h1>
      <div className="mb-6 md:mb-10 flex flex-col gap-4 md:gap-8 text-[#4E4E4E] px-4 md:px-0">
        <p className="text-center text-xl md:text-[25px] font-medium">
          Join us
        </p>
        <p className="text-center text-xl md:text-[25px] font-medium leading-tight md:leading-normal">
          Help reshape{" "}
          <span className="font-bold text-black">fashion discovery</span>
        </p>
        <p className="text-center text-xl md:text-[25px] font-medium leading-tight md:leading-normal">
          & Turn <span className="font-bold text-black">Cairo</span> into the
          fifth <span className="font-bold text-black">fashion capital</span> of
          the world.
        </p>
      </div>
      <div className="my-4 flex items-center justify-center gap-2">
        <Link
          href="/about"
          className="flex h-[40px] items-center justify-center rounded-[26px] border-2 border-solid border-[#000000] bg-[#ffffff] px-4 font-bold text-black"
        >
          About Loom
        </Link>
        <button
          onClick={() => {
            document
              .querySelector("#fashion-marketing-intern")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex h-[40px] items-center justify-center rounded-[26px] bg-[#A6A2DE] px-4 font-bold text-white"
        >
          View Open Roles
        </button>
      </div>
    </section>
  );
}
