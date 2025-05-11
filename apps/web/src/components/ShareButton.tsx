"use client";

import { IconButton } from "@radix-ui/themes";
// import { Share2Icon } from "@radix-ui/react-icons";

export function ShareButton({
  id,
  name,
  description,
  className,
}: {
  id: string;
  name: string;
  description: string;
  className: string;
}) {
  const shareProduct = () => {
    try {
      if (navigator.share) {
        navigator.share({
          title: `${name} - Loom`,
          url: `https://loomcairo.com/item/${id}`,
        });
      } else {
        navigator.clipboard.writeText(`https://loomcairo.com/item/${id}`);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  return (
    <IconButton variant="soft" onClick={shareProduct} className={className}>
      {/* <Share2Icon /> */}
      <div>share</div>
    </IconButton>
  );
}
