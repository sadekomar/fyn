"use client";

import { ReactElement } from "react";
import { BrandsAPI } from "./page";

export function LetterNavigator({ brands }: { brands: BrandsAPI }) {
  let scrollToLetter = (letterClicked: string) => {
    let section = document.querySelector(`a[href='#${letterClicked}'`);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "start",
      });
    }
  };

  return (
    <div className="alpha-index-container">
      {Object.keys(brands).map((letter, index) => (
        <p
          className="alpha-index"
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => {
            scrollToLetter(letter);
          }}
        >
          {letter}
        </p>
      ))}
    </div>
  );
}
