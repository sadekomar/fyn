/* eslint-disable @next/next/no-img-element */
"use client";

import { ImgHTMLAttributes, useState, useEffect, useRef } from "react";

export function CardImage({
  alt = "Image",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { alt?: string }) {
  const imagePattern = "loom-image-dimensions";
  // enum ImageSizes {
  //   "6XL" = 2048,
  //   "5XL" = 1728,
  //   "4XL" = 1512,
  //   "3XL" = 1296,
  //   "XXL" = 1080,
  //   "XL" = 900,
  //   "L" = 720,
  //   "M" = 590,
  //   "S" = 360,
  //   "XS" = 180,
  //   "BLUR" = 20,
  // }
  const ImageSizes = {
    "6XL": "2048",
    "5XL": "1728",
    "4XL": "1512",
    "3XL": "1296",
    XXL: "1080",
    XL: "900",
    L: "720",
    M: "590",
    S: "360",
    XS: "180",
    BLUR: "20",
  } as const;

  const generateSrc = (src: string | Blob | undefined) => {
    if (!src || typeof src !== "string") return undefined;
    return src.replaceAll(imagePattern, ImageSizes.L);
  };

  const generateSrcset = (src: string | Blob | undefined) => {
    if (!src || typeof src !== "string") return undefined;
    return Object.values(ImageSizes)
      .map((size) => {
        return `${src.replaceAll(imagePattern, size)} ${size}w`;
      })
      .join(", ");
  };

  const generateBlur = (src: string | Blob | undefined) => {
    if (!src) return "";
    return src.toString().replaceAll(imagePattern, ImageSizes.BLUR);
  };

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) {
      setIsLoaded(true);
    }
    img?.addEventListener("load", () => {
      setIsLoaded(true);
    });
    return () => {
      img?.removeEventListener("load", () => {
        setIsLoaded(true);
      });
    };
  }, [imgRef]);

  return (
    <div className={`relative ${props.className ?? ""}`}>
      {/* okay so the div fetches very low on the priority list that's why i guess i should use another image instead of the wrapping div */}
      <img
        {...props}
        src={generateBlur(props.src)}
        alt={alt}
        className={`${props.className ?? ""} absolute inset-0 h-full w-full rounded-[8px] transition-opacity duration-150 ease-in-out ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
        fetchPriority="high"
        loading="eager"
      />
      <div
        className={`absolute inset-0 h-full w-full rounded-[8px] bg-transparent backdrop-blur-sm ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <img
        {...props}
        ref={imgRef}
        alt={alt}
        srcSet={generateSrcset(props.src)}
        src={generateSrc(props.src)}
        className={`${props.className ?? ""}`}
      />
    </div>
  );
}
