import {
  Address,
  AddressType,
  ItemOrder,
  OrderStatus,
  User,
  ShippingEstimate,
  Brand,
} from "@/api/types/base-types";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Tailwind,
  Heading,
  Img,
  Section,
  Hr,
} from "@react-email/components";
import React from "react";

export interface OrderConfirmationEmail {
  orderNumber: string;
  orderTotal: number;
  items: {
    name: string;
    quantity: number;
    brand: string;
    price: number;
    size: string;
    image: string;
  }[];
  shippingEstimates: {
    cost: number;
    brand: {
      id: string;
      name: string;
    };
  }[];
  status: OrderStatus;
  address: {
    addressType: AddressType;
    firstName: string;
    lastName: string;
    address: string;
    apartment: string;
    city: string;
    governorate: string;
    country: string;
    postalCode: string;
    company: string;
    createdAt: Date;
  };
}

function formatEmailNotification(
  items: OrderConfirmationEmail["items"],
): string {
  const brands = [...new Set(items.map((item) => item.brand))];

  if (brands.length === 0) return "";
  if (brands.length === 1)
    return `You'll receive another email from ${brands[0]} once we place your order.`;
  if (brands.length === 2)
    return `You'll receive emails from ${brands[0]} and ${brands[1]} once we place your order.`;

  const lastBrand = brands[brands.length - 1];
  const otherBrands = brands.slice(0, -1);
  return `You'll receive emails from ${otherBrands.join(", ")}, and ${lastBrand} once we place your order.`;
}

const dummyOrder: OrderConfirmationEmail = {
  orderNumber: "CLYO-547521",
  shippingEstimates: [
    {
      brand: {
        id: "1",
        name: "Organdy",
      },
      cost: 70,
    },
    {
      brand: {
        id: "2",
        name: "Daddysgirl",
      },
      cost: 70,
    },
  ],
  items: [
    {
      name: "WOMEN LINEN-LOOK PANTS",
      brand: "Organdy",
      quantity: 1,
      price: 750,
      size: "S/White",
      image:
        "https://res.cloudinary.com/dffgye7z3/image/upload/v1749728666/DSC07933_zozyii.webp",
    },
    {
      name: "Linen Pants in Blue",
      brand: "Daddysgirl",
      quantity: 1,
      price: 100,
      size: "M",
      image:
        "https://res.cloudinary.com/dffgye7z3/image/upload/v1749728478/DSC02802-1_e93868e6-c9e3-42d5-b81e-e7d44625e838_yx3u0u.webp",
    },
  ],
  orderTotal: 1100,
  status: OrderStatus.PENDING,
  address: {
    addressType: AddressType.NORMAL,
    firstName: "Omar",
    lastName: "Sadek",
    address: "Rehab City, Group 124, Building 8",
    apartment: "Apartment 51",
    city: "New Cairo",
    governorate: "Cairo",
    country: "Egypt",
    postalCode: "11841",
    company: "",
    createdAt: new Date(),
  },
};

export default function OrderConfirmation({
  order = dummyOrder,
}: {
  order: OrderConfirmationEmail;
}) {
  const mainColor = "#A6A2DE";
  const secondaryColor = "#F4F3FF";
  const bodyTextStyle = "text-base text-gray-700";
  const emailNotification = formatEmailNotification(order.items);

  // Collect unique brands
  const uniqueBrands = [...new Set(order.items.map((item) => item.brand))];
  const shippingFee = uniqueBrands.length * 70;

  const brandFirstIndex: Record<string, number> = {};
  order.items.forEach((item, idx) => {
    if (!(item.brand in brandFirstIndex)) {
      brandFirstIndex[item.brand] = idx;
    }
  });

  return (
    <Html>
      <Preview>Univyr - Order Confirmation #{order.orderNumber}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: mainColor,
                secondary: secondaryColor,
              },
            },
          },
        }}
      >
        <Head>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
          `}</style>
        </Head>
        <Body className="m-0 bg-[#F4F3FF] p-0 font-sans">
          <Container className="mx-auto flex min-h-screen max-w-[600px] items-center justify-center">
            <Section className="my-12 rounded-2xl bg-white p-8 shadow-lg">
              <Section className="mt-8 mb-12 text-center">
                <Img
                  src="https://res.cloudinary.com/dffgye7z3/image/upload/v1747755019/loom-black_bywezj.png"
                  alt="Univyr Logo"
                  height={36}
                  className="mx-auto mb-4"
                />
              </Section>
              <Section className="rounded-lg bg-white p-8 shadow-none">
                <Heading className="mb-6 text-center text-2xl font-semibold text-gray-800">
                  Thank you for your order!
                </Heading>
                <Text className={`${bodyTextStyle} mb-4`}>
                  Hi {order.address.firstName} {order.address.lastName},
                </Text>
                <Text className={`${bodyTextStyle} mb-4`}>
                  Your order is now pending. {emailNotification}
                </Text>
                <Link
                  href={`https://univyr.com/orders/${order.orderNumber}`}
                  className="bg-brand hover:bg-brand/90 inline-block rounded-full px-8 py-3 text-base font-semibold text-white"
                >
                  View order
                </Link>
              </Section>

              <Section className="mt-4 rounded-lg bg-white p-6 shadow-none">
                <Heading className="mb-4 text-lg font-semibold text-gray-800">
                  Order summary
                </Heading>
                <table
                  className="w-full"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ borderCollapse: "collapse" }}
                >
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            padding: "4px 0",
                            verticalAlign: "top",
                            width: 60,
                          }}
                        >
                          <Img
                            src={item.image}
                            alt={item.name}
                            width={56}
                            height={56}
                            className="rounded-md border object-cover"
                          />
                        </td>
                        <td style={{ padding: "4px 0", verticalAlign: "top" }}>
                          <Text className="font-medium text-gray-800">
                            {item.name} × {item.quantity}
                          </Text>
                          <Text className="text-xs text-gray-500">
                            {item.size} - {item.brand}
                          </Text>
                        </td>
                        <td
                          style={{
                            padding: "4px 0",
                            verticalAlign: "top",
                            textAlign: "right",
                            minWidth: 80,
                          }}
                        >
                          <Text className="font-semibold text-gray-800">
                            EGP {item.price}
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Hr className="my-3 border border-gray-200" />
                <table
                  className="w-full text-sm"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ borderCollapse: "collapse" }}
                >
                  <tbody>
                    <tr>
                      <td className="text-gray-600">Subtotal</td>
                      <td
                        style={{ textAlign: "right" }}
                        className="font-medium text-gray-800"
                      >
                        EGP{" "}
                        {order.items.reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0,
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-600">Shipping</td>
                      <td
                        style={{ textAlign: "right" }}
                        className="font-medium text-gray-800"
                      >
                        EGP{" "}
                        {order.shippingEstimates.reduce(
                          (sum, est) => sum + est.cost,
                          0,
                        )}
                      </td>
                    </tr>
                    {order.shippingEstimates.map((estimate, idx) => (
                      <tr key={idx}>
                        <td className="pl-4 text-xs text-gray-500">
                          Shipping - {estimate.brand.name}
                        </td>
                        <td
                          style={{ textAlign: "right" }}
                          className="text-xs text-gray-500"
                        >
                          EGP {estimate.cost}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={2}>
                        <div className="my-2 border-t border-gray-200" />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-base font-semibold text-gray-800">
                        Total
                      </td>
                      <td
                        style={{ textAlign: "right" }}
                        className="text-base font-bold text-gray-900"
                      >
                        EGP {order.orderTotal}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Section>

              <Hr className="my-4 border border-gray-200" />

              <Section className="rounded-lg bg-white p-6 shadow-none">
                <Heading className="mb-4 text-lg font-semibold text-gray-800">
                  Customer information
                </Heading>
                <table
                  className="w-full"
                  cellPadding="0"
                  cellSpacing="0"
                  style={{ borderCollapse: "collapse" }}
                >
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top", width: "50%" }}>
                        <Text className="mb-1 font-semibold text-gray-800">
                          Shipping address
                        </Text>
                        <div className="text-sm text-gray-700">
                          <div>
                            {order.address.firstName} {order.address.lastName}
                          </div>
                          {order.address.company && (
                            <div>{order.address.company}</div>
                          )}
                          <div>{order.address.address}</div>
                          {order.address.apartment && (
                            <div>{order.address.apartment}</div>
                          )}
                          <div>{order.address.city}</div>
                          <div>{order.address.postalCode}</div>
                          <div>{order.address.country}</div>
                        </div>
                      </td>
                      <td style={{ verticalAlign: "top", width: "50%" }}></td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-6">
                  <Text className="mb-1 font-semibold text-gray-800">
                    Shipping method
                  </Text>
                  <div className="text-sm text-gray-700">
                    {order.address.governorate}
                  </div>
                </div>
              </Section>

              <Hr className="my-4 border border-gray-200" />

              <Text className={bodyTextStyle}>
                If you have any questions, contact us at{" "}
                <Link href="mailto:contact@univyr.com" className="text-brand">
                  contact@univyr.com
                </Link>
              </Text>
              <div className="mt-4 flex flex-col gap-2">
                <div className={`${bodyTextStyle}`}>
                  Thank you for shopping with Univyr,
                </div>
                <div className={`${bodyTextStyle} font-semibold`}>
                  The Univyr Team
                </div>
              </div>
            </Section>
            <Section className="mt-8 mb-8 text-center">
              <Text className="text-sm text-gray-500">
                © 2025 Univyr. All rights reserved.
              </Text>
              <Text className="text-sm text-gray-500">Cairo, Egypt</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
