import { Flex, Card, Badge, Box } from "@radix-ui/themes";

import "./ItemCard.css";

export function ItemCardPlaceholder() {
  return (
    <>
      <div className="ItemCard">
        <Flex direction="column" gap="1">
          <div className="itemPlaceholder__img" />

          {/* Name placeholder */}
          <span
            style={{
              height: "12px",
              background: "#f0f0f0",
              width: "130px",
              display: "inline-block",
            }}
          ></span>

          <div style={{ fontSize: "0" }}>
            <span
              style={{
                height: "12px",
                background: "#f0f0f0",
                width: "60px",
                display: "inline-block",
                margin: "0px",
                padding: "0px",
              }}
            ></span>
            <span
              style={{
                height: "12px",
                background: "#f0f0f0",
                width: "40px",
                marginLeft: "5px",
                display: "inline-block",
              }}
            ></span>
          </div>

          {/* Price placeholder */}
          <span
            style={{
              height: "16px",
              width: "50%",
              background: "#f0f0f0",
              marginTop: "5px",
            }}
          ></span>

          <div
            style={{
              margin: "5px 0px 0px 0px",
            }}
          >
            <Box
              style={{
                width: "80px",
              }}
            >
              <Flex direction={"row"} gap={"1"}>
                <Badge
                  variant="soft"
                  radius="full"
                  style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: "#E9E7F8",
                  }}
                ></Badge>
                <Badge
                  variant="soft"
                  radius="full"
                  style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: "#E9E7F8",
                  }}
                ></Badge>
                <Badge
                  variant="soft"
                  radius="full"
                  style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: "#E9E7F8",
                  }}
                ></Badge>
              </Flex>
            </Box>
          </div>
        </Flex>
      </div>
    </>
  );
}
