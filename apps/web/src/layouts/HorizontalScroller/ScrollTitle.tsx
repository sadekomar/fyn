import React from "react";
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import Link from "next/link";

export function ScrollTitle({
  title,
  BrandInfo,
  children,
  link,
  linkTitle,
  scrollAreaRef,
}: {
  title: string;
  BrandInfo: string;
  children: React.ReactNode;
  link: string;
  linkTitle: string;
  scrollAreaRef: React.RefObject<HTMLDivElement>;
}) {
  function scrollLeft() {
    scrollAreaRef.current.scrollLeft -= 250;
  }
  function scrollRight() {
    scrollAreaRef.current.scrollLeft += 250;
  }

  return (
    <>
      <Flex justify={"between"} align={"center"} pt={"1"} pb={"0"}>
        {title && (
          <Text as="div" size={"7"} weight={"bold"}>
            {title}
            {BrandInfo}
          </Text>
        )}
        {link && (
          <Text as="div" size={"7"} weight={"bold"}>
            <Link href={`${link}`}>{linkTitle}</Link>
          </Text>
        )}
        <Flex gap={"3"}>
          <IconButton
            size={{
              initial: "2",
              sm: "4",
            }}
            variant="soft"
            radius="full"
            onClick={scrollLeft}
          >
            <ChevronLeftIcon width="25px" height="25px" />
          </IconButton>
          <IconButton
            size={{
              initial: "2",
              sm: "4",
            }}
            variant="soft"
            radius="full"
            onClick={scrollRight}
          >
            <ChevronRightIcon width="25px" height="25px" />
          </IconButton>
        </Flex>
      </Flex>
      <Text>{children}</Text>
    </>
  );
}
