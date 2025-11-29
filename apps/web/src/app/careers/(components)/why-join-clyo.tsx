import React from "react";
import { Rocket, Users, Banknote, Sparkles } from "lucide-react";

export function WhyJoinClyo(): React.JSX.Element {
  return (
    <section className="mx-4 mb-10 max-w-[100ch] md:mx-auto">
      <h2 className="mb-10 text-[39.06px] font-bold">Why Join Clyo</h2>
      <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 sm:gap-2 md:grid-cols-4">
        {[
          {
            icon: <Rocket className="h-12 w-12" />,
            text: "Join a fast-growing startup",
          },
          {
            icon: <Users className="h-12 w-12" />,
            text: "Be part of the core team",
          },
          {
            icon: <Banknote className="h-12 w-12" />,
            text: "Stipend, paid at the end of each month",
          },
          {
            icon: <Sparkles className="h-12 w-12" />,
            text: "Creative freedom, we encourage out-of-the box thinking",
          },
        ].map(({ icon, text }, i) => (
          <div
            key={i}
            className="flex max-w-[200px] flex-col items-center gap-3 text-center"
          >
            <div className="flex justify-center">{icon}</div>
            <p className="text-center font-medium">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
