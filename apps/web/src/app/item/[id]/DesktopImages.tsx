"use client";

import { Dialog, IconButton } from "@radix-ui/themes";
// import { Cross1Icon } from "@radix-ui/react-icons";

export function DesktopImages({ data }) {
  return (
    <div className="ItemImage ItemImageComputerDisplay">
      <Dialog.Root>
        {data &&
          data["images"].map((image, index) => (
            <Dialog.Trigger key={index}>
              <img
                key={index}
                style={{ width: "100%" }}
                src={image}
                srcSet={image}
                sizes="410px"
                alt=""
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
