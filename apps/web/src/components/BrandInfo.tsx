import { Flex, Text, Heading, HoverCard, Box, Avatar } from "@radix-ui/themes";
import Link from "next/link";

import { descriptionsAndLogos } from "../data/descriptionsAndLogos";
import { brandKey } from "@/app/(brands)/brands/[brand]/(components)/BrandDescription";

export function BrandInfo({ brand }: { brand: brandKey }) {
  return (
    <>
      <Text>
        <HoverCard.Root>
          <HoverCard.Trigger>
            <Link href={`/brands/${brand}`}>{brand}</Link>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <Flex gap="4">
              {
                <Avatar
                  size="3"
                  radius="full"
                  src={descriptionsAndLogos[brand]["logo"]}
                  fallback={""}
                />
              }
              <Box>
                <Heading
                  size="3"
                  as="h3"
                  style={{ textTransform: "capitalize" }}
                >
                  {brand}
                </Heading>
                <Text
                  as="div"
                  size="2"
                  color="gray"
                  style={{ textTransform: "capitalize" }}
                >
                  @{brand}
                </Text>

                <Text as="div" size="2" style={{ maxWidth: 300 }} mt="3">
                  {descriptionsAndLogos[brand]["description"]}
                </Text>
              </Box>
            </Flex>
          </HoverCard.Content>
        </HoverCard.Root>
      </Text>
    </>
  );
}
