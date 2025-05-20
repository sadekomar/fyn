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
  Row,
  Column,
  Hr,
} from "@react-email/components";

export default function LoomApplication({ name = "Omar" }: { name: string }) {
  const mainColor = "#A6A2DE";
  const secondaryColor = "#F4F3FF";

  return (
    <Html>
      <Preview>Welcome to Loom - Application Received!</Preview>
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
                Loom Application Confirmation!
              </Heading>

              <Text className="text-gray-700 mb-4">Hi {name},</Text>

              <Text className="text-gray-700 mb-4">
                Thank you for taking the first step towards joining Loom! We're
                excited to review your application and learn more about how you
                can contribute to making Cairo the fifth fashion capital of the
                world! 🎉
              </Text>

              <Text className="text-gray-700 mb-4">
                Here's what happens next:
              </Text>

              <Section className="pl-4 mb-6">
                <Text className="text-gray-700 mb-2">
                  1. Our team will review your application (1-2 business days)
                </Text>
                <Text className="text-gray-700 mb-2">
                  2. If your profile matches our requirements, we'll schedule an
                  interview
                </Text>
                <Text className="text-gray-700 mb-2">
                  3. You'll receive detailed feedback after the interview
                  process
                </Text>
              </Section>

              <Hr className="border border-gray-200 my-6" />

              {/* Social Media Section */}
              <Section className="text-center mb-6">
                <Text className="text-gray-700 mb-4">
                  While you wait, connect with us on social media:
                </Text>
                <Row className="text-center">
                  <Column align="center">
                    <Link
                      href="https://instagram.com/loomcairo"
                      className="text-brand hover:text-brand-dark mx-2"
                    >
                      Instagram
                    </Link>
                    <Text className="text-gray-400 mx-2 inline">•</Text>
                    <Link
                      href="https://tiktok.com/@loomcairo"
                      className="text-brand hover:text-brand-dark mx-2"
                    >
                      TikTok
                    </Link>
                    <Text className="text-gray-400 mx-2 inline">•</Text>
                    <Link
                      href="https://linkedin.com/company/loom-cairo"
                      className="text-brand hover:text-brand-dark mx-2"
                    >
                      LinkedIn
                    </Link>
                  </Column>
                </Row>
              </Section>

              <Text className="text-gray-700 mb-4">
                If you have any questions, don't hesitate to reach out to us at{" "}
                <Link
                  href="mailto:contact@loomcairo.com"
                  className="text-brand"
                >
                  contact@loomcairo.com
                </Link>
              </Text>

              <Text className="text-gray-700 mb-1">Best regards,</Text>
              <Text className="text-gray-700 font-semibold">The Loom Team</Text>
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
