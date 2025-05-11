"use client";

import { JSX, ReactElement, useState } from "react";
// import { CaretDownIcon } from "@radix-ui/react-icons";

import "./Accordion.css";
import { ChevronDown } from "lucide-react";

export function Accordion({
  trigger,
  children,
}: {
  trigger: string;
  children: string | ReactElement;
}) {
  let [accordionOpened, setAccordionOpened] = useState(false);

  function toggleAccordion() {
    setAccordionOpened((currentAccordionState) => !currentAccordionState);
  }

  return (
    <div className="accordion">
      <div onClick={toggleAccordion} className="accordion-trigger">
        {trigger}
        <ChevronDown
          className={`accordion-caret ${accordionOpened ? "accordion-caret-open" : ""}`}
        />
      </div>
      <div
        className={`accordion-content ${accordionOpened ? "accordion-opened" : ""}`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
