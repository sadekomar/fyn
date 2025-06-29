import { ImgHTMLAttributes } from "react";

// very very cool to be honest
// i now get all the props and type safety from the ImgHTMLAttributes with my custom component
export function LoomImage({ ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const imagePattern = "loom-image-dimensions";
  enum ImageSizes {
    "6XL" = "2048",
    "5XL" = "1728",
    "4XL" = "1512",
    "3XL" = "1296",
    "XXL" = "1080",
    "XL" = "900",
    "L" = "720",
    "M" = "590",
    "S" = "360",
    "XS" = "180",
    "BLUR" = "20",
  }

  const generateSrcset = (src: string | Blob | undefined): string => {
    if (!src || typeof src !== "string") return "";
    return Object.values(ImageSizes)
      .map((size) => {
        return `${src.replaceAll(imagePattern, size)} ${size}w`;
      })
      .join(", ");
  };

  const generateSrc = (src: string | Blob | undefined): string => {
    if (!src || typeof src !== "string") return "";
    return src.replaceAll(imagePattern, ImageSizes.L);
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt}
      src={generateSrc(props.src)}
      srcSet={generateSrcset(props.src)}
    />
  );
}
