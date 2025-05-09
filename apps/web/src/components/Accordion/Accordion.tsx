"use client";

import { useState } from "react";
// import { CaretDownIcon } from "@radix-ui/react-icons";

import "./Accordion.css";

export function Accordion({ trigger, children }) {
  let [accordionOpened, setAccordionOpened] = useState(false);

  function toggleAccordion() {
    setAccordionOpened((currentAccordionState) => !currentAccordionState);
  }

  return (
    <div className="accordion">
      <div onClick={toggleAccordion} className="accordion-trigger">
        {trigger}
        {/* <CaretDownIcon
          className={`accordion-caret ${accordionOpened ? "accordion-caret-open" : ""}`}
        /> */}
        <div>caret</div>
      </div>
      <div
        className={`accordion-content ${accordionOpened ? "accordion-opened" : ""}`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
