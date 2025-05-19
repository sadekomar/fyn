import React from "react";
import { Rocket, Users, Banknote, Sparkles } from "lucide-react";

export function WhyJoinLoom(): React.JSX.Element {
  return (
    <section className="mx-4 md:mx-auto mb-10 max-w-[100ch]">
      <h2 className="mb-10 text-[39.06px] font-bold">Why Join Loom</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
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
            className="flex max-w-[200px] flex-col items-center gap-3"
          >
            <div>{icon}</div>
            <p className="font-medium">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
