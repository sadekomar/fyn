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

export default function ClyoApplication({ name = "Omar" }: { name: string }) {
  const mainColor = "#A6A2DE";
  const secondaryColor = "#F4F3FF";

  return (
    <Html>
      <Preview>Welcome to Univyr - Application Received!</Preview>
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
        <Body className="bg-secondary m-0 p-0 font-sans">
          <Container className="mx-auto max-w-[600px]">
            {/* Header */}
            <Section className="mt-8 mb-12 text-center">
              <Img
                src="https://res.cloudinary.com/dffgye7z3/image/upload/v1747755019/loom-black_bywezj.png"
                alt="Univyr Logo"
                height={36}
                className="mx-auto mb-4"
              />
            </Section>

            {/* Main Content */}
            <Section className="rounded-lg bg-white p-8 shadow-lg">
              <Heading className="mb-6 text-center text-2xl font-semibold text-gray-800">
                Univyr application confirmation!
              </Heading>

              <Text className="mb-4 text-gray-700">Hi {name},</Text>

              <Text className="mb-4 text-gray-700">
                Thank you for taking the first step towards joining Univyr!
                We're excited to review your application and learn more about
                how you can contribute to making Cairo the fifth fashion capital
                of the world! 🎉
              </Text>

              <Text className="mb-4 text-gray-700">
                Here's what happens next:
              </Text>

              <Section className="mb-6 pl-4">
                <Text className="mb-2 text-gray-700">
                  1. Our team will review your application (1-2 business days)
                </Text>
                <Text className="mb-2 text-gray-700">
                  2. If your profile matches our requirements, we'll schedule an
                  interview
                </Text>
                <Text className="mb-2 text-gray-700">
                  3. You'll receive detailed feedback after the interview
                  process
                </Text>
              </Section>

              <Hr className="my-6 border border-gray-200" />

              {/* Social Media Section */}
              <Section className="mb-6 text-center">
                <Text className="mb-4 text-gray-700">
                  While you wait, connect with us on social media:
                </Text>
                <Row className="text-center">
                  <Column align="center">
                    <Link
                      href="https://instagram.com/univyr"
                      className="text-brand hover:text-brand-dark mx-2"
                    >
                      Instagram
                    </Link>
                    <Text className="mx-2 inline text-gray-400">•</Text>
                    <Link
                      href="https://tiktok.com/@univyr"
                      className="text-brand hover:text-brand-dark mx-2"
                    >
                      TikTok
                    </Link>
                    <Text className="mx-2 inline text-gray-400">•</Text>
                    <Link
                      href="https://linkedin.com/company/univyr"
                      className="text-brand hover:text-brand-dark mx-2"
                    >
                      LinkedIn
                    </Link>
                  </Column>
                </Row>
              </Section>

              <Text className="mb-4 text-gray-700">
                If you have any questions, don't hesitate to reach out to us at{" "}
                <Link href="mailto:contact@univyr.com" className="text-brand">
                  contact@univyr.com
                </Link>
              </Text>

              <Text className="mb-1 text-gray-700">Best regards,</Text>
              <Text className="font-semibold text-gray-700">
                The Univyr Team
              </Text>
            </Section>

            {/* Footer */}
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
