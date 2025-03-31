import React from "react";
import { Text, Heading, Container } from "@radix-ui/themes";

export function HowItWorks() {
  return (
    <div style={{ marginLeft: "15px" }}>
      <Heading size={"8"}>How it works</Heading>
      <Heading>Keep track of local fashion like never before.</Heading>
      <Text>
        Loom uses a technology similar to search engines like Google and Bing to
        monitor the latest releases. If a new brand emerges, it's added to Loom.
        If a brand on loom updates its items or stock or images of existing
        items, these changes are shown on Loom.
      </Text>
      <br />
      <Text>
        These brands are well on their way to the global stage and loom will
        help propel them there.
      </Text>
    </div>
  );
}
