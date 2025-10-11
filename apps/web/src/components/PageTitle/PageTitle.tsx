import React, { JSX } from "react";

import "./PageTitle.css";

export function PageTitle({ children }: { children: string | JSX.Element }) {
  return <h1 className="page-title">{children}</h1>;
}
