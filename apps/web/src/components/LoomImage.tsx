import { ImgHTMLAttributes } from "react";

// very very cool to be honest
// i now get all the props and type safety from the ImgHTMLAttributes with my custom component
export function LoomImage({
  alt = "Image",
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { alt?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} {...props} />;
}
