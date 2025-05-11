"use client";

import { ReactElement } from "react";

export function LetterNavigator({ brands }: { brands: Record<string, any> }) {
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
      {Object.keys(brands).map((initialLetter, index) => (
        <p
          className="alpha-index"
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => {
            scrollToLetter(initialLetter);
          }}
        >
          {initialLetter}
        </p>
      ))}
    </div>
  );
}
