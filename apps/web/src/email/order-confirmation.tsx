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

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  size?: string;
}

interface OrderConfirmationProps {
  name: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  estimatedDelivery: string;
}

export default function OrderConfirmation({
  name = "Omar",
  orderNumber = "#12345",
  items = [],
  total = 0,
  shippingAddress = "123 Fashion St., Cairo",
  estimatedDelivery = "2-3 business days",
}: OrderConfirmationProps) {
  const mainColor = "#A6A2DE";
  const secondaryColor = "#F4F3FF";
  const bodyTextStyle = "text-base text-gray-700";

  return (
    <Html>
      <Preview>Loom - Order Confirmation #{orderNumber}</Preview>
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
        <Body className="font-sans bg-secondary m-0 p-0">
          <Container className="max-w-[600px] mx-auto">
            {/* Header */}
            <Section className="mt-8 mb-12 text-center">
              <Img
                src="https://res.cloudinary.com/dffgye7z3/image/upload/v1747755019/loom-black_bywezj.png"
                alt="Loom Logo"
                height={36}
                className="mx-auto mb-4"
              />
            </Section>

            {/* Main Content */}
            <Section className="bg-white rounded-lg p-8 shadow-lg">
              <Heading className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Thank you for your order!
              </Heading>

              <Text className={`${bodyTextStyle} mb-4`}>Hi {name},</Text>

              <Text className={`${bodyTextStyle} mb-4`}>
                Your order has been confirmed and is being prepared. Here's a
                summary of your purchase:
              </Text>

              {/* Order Details */}
              <Section className="bg-brand/5 rounded-lg p-6 mb-6">
                <Text className={`${bodyTextStyle} font-semibold mb-4`}>
                  Order Number: {orderNumber}
                </Text>

                {/* Order Items */}
                {items.map((item, index) => (
                  <div key={index} className="mb-3">
                    <Text className={`${bodyTextStyle} mb-1`}>
                      {item.quantity}x {item.name}{" "}
                      {item.size && `(${item.size})`}
                    </Text>
                    <Text className={`${bodyTextStyle} text-right`}>
                      EGP {(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </div>
                ))}

                <Hr className="border border-gray-200 my-4" />

                <Text className={`${bodyTextStyle} font-semibold text-right`}>
                  Total: EGP {total.toFixed(2)}
                </Text>
              </Section>

              {/* Shipping Details */}
              <Section className="mb-6">
                <Text className={`${bodyTextStyle} font-semibold mb-2`}>
                  Shipping Details:
                </Text>
                <Text className={`${bodyTextStyle} mb-1`}>
                  Delivery Address:
                </Text>
                <Text className={`${bodyTextStyle} mb-4`}>
                  {shippingAddress}
                </Text>
                <Text className={`${bodyTextStyle}`}>
                  Estimated Delivery: {estimatedDelivery}
                </Text>
              </Section>

              <Hr className="border border-gray-200 my-6" />

              {/* Next Steps */}
              <Section className="mb-6">
                <Text className={`${bodyTextStyle} font-semibold mb-2`}>
                  What's Next?
                </Text>
                <ul className="list-disc pl-4 space-y-2">
                  <li className={bodyTextStyle}>
                    You'll receive another confirmation email from the brand
                    once we place your order
                  </li>
                  <li className={bodyTextStyle}>
                    We'll update your order status to "Ordered" after we
                    complete the purchase from the brand
                  </li>
                  <li className={bodyTextStyle}>
                    Once shipped, we'll send you a shipping confirmation email
                    with tracking details
                  </li>
                  <li className={bodyTextStyle}>
                    You can track your order status anytime in your Loom account
                  </li>
                  <li className={bodyTextStyle}>
                    For any questions about your order, contact us at{" "}
                    <Link
                      href="mailto:contact@loomcairo.com"
                      className="text-brand"
                    >
                      contact@loomcairo.com
                    </Link>
                  </li>
                </ul>
              </Section>

              <Text className={`${bodyTextStyle} mb-1`}>
                Thank you for shopping with Loom!
              </Text>
              <Text className={`${bodyTextStyle} font-semibold`}>
                The Loom Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="text-center mt-8 mb-8">
              <Text className="text-sm text-gray-500">
                © 2025 Loom. All rights reserved.
              </Text>
              <Text className="text-sm text-gray-500">Cairo, Egypt</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
