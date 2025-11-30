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

export default function EmailConfirmation({ name = "Omar" }: { name: string }) {
  const mainColor = "#A6A2DE";
  const secondaryColor = "#F4F3FF";
  const bodyTextStyle = "text-base text-gray-700";

  return (
    <Html>
      <Preview>Welcome to Univyr - Please Confirm Your Email!</Preview>
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
                Confirm your email
              </Heading>

              <Text className={`${bodyTextStyle} mb-4`}>Hi {name},</Text>

              <Text className={`${bodyTextStyle} mb-4`}>
                Welcome to Univyr! We're excited for you to discover the world
                of fashion in Cairo. To get started, please confirm your email
                by clicking the button below:
              </Text>

              <Section className="mb-8 text-center">
                <Link
                  href="{{verificationLink}}"
                  className="bg-brand hover:bg-brand/90 inline-block rounded-full px-8 py-3 text-base font-semibold text-white"
                >
                  Confirm your email
                </Link>
              </Section>

              <Text className={`${bodyTextStyle} mb-4`}>
                This link will expire in 1 hour. After confirmation, you'll have
                full access to your Univyr account.
              </Text>

              <Hr className="my-6 border border-gray-200" />

              <Text className={`${bodyTextStyle} mb-4`}>
                If you didn't create an account with Univyr, please ignore this
                email or contact us at{" "}
                <Link
                  href="mailto:contact@clyocairo.com"
                  className="text-brand"
                >
                  contact@clyocairo.com
                </Link>
              </Text>

              <Text className={`${bodyTextStyle} mb-1`}>Best regards,</Text>
              <Text className={`${bodyTextStyle} font-semibold`}>
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
