"use client";

import { UnivyrImage } from "@/components/univyr-image";
import { Dialog, IconButton } from "@radix-ui/themes";
// import { Cross1Icon } from "@radix-ui/react-icons";

export function DesktopImages({
  data,
}: {
  data: { images: string[]; name: string };
}) {
  return (
    <div className="ItemImage ItemImageComputerDisplay">
      <Dialog.Root>
        {data &&
          data["images"].map((image, index) => (
            <Dialog.Trigger key={index}>
              <UnivyrImage
                alt={data.name}
                key={index}
                style={{ width: "100%" }}
                src={image}
                sizes="410px"
              />
            </Dialog.Trigger>
          ))}
        <Dialog.Title style={{ display: "none" }}>{data.name}</Dialog.Title>
        <Dialog.Description></Dialog.Description>
        <Dialog.Content
          style={{
            width: "100lvw",
            maxWidth: "100lvw",
            height: "100lvh",
            maxHeight: "100lvh",
            padding: "0px",
            marginInline: "0px",
            paddingInline: "120px",
            position: "relative",
          }}
        >
          <Dialog.Close>
            <IconButton
              variant="soft"
              radius="full"
              style={{ right: "25px", top: "25px", position: "fixed" }}
            >
              {/* <Cross1Icon /> */}
              <div>close</div>
            </IconButton>
          </Dialog.Close>
          {data &&
            data["images"].map((image, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                style={{ width: "100%" }}
                src={image}
                srcSet={image}
                sizes="1080px"
                alt=""
              />
            ))}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
