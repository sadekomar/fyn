import React from "react";
import { Button, AspectRatio } from "@radix-ui/themes";

import "./Jeans.css";
import { LoomImage } from "@/components/LoomImage";

export function Jeans() {
  return (
    <AspectRatio ratio={18 / 5} className="AspectRatio">
      <LoomImage
        src="juvenile.webp"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "var(--radius-2)",
          opacity: "0.7",
        }}
      />
      <div className="JeansContainer">
        <Button variant="solid" size={"4"} className="JeansButton">
          Shop Jeans
        </Button>
      </div>
    </AspectRatio>
  );
}
