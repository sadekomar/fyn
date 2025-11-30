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

export default function ClyoAcceptance({ name = "Omar" }: { name: string }) {
  const mainColor = "#A6A2DE";
  const secondaryColor = "#F4F3FF";

  return (
    <Html>
      <Preview>Univyr - Meetup Invitation!</Preview>
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
                Meetup Invitation! 🎉
              </Heading>

              <Text className="mb-4 text-gray-700">Dear {name},</Text>

              <Text className="mb-4 text-gray-700">
                It was a real pleasure speaking with you during the online
                interview. Your energy, enthusiasm, and presence left a strong
                impression on our team.
              </Text>

              <Text className="mb-4 text-gray-700">
                We’re excited to move forward and invite you to an in-person
                meet-up, where we’ll have the opportunity to get to know each
                other better and dive deeper into what we’re building at Univyr.
                We’re looking forward to continuing the conversation and
                learning more about you.
              </Text>

              <Hr className="my-6 border border-gray-200" />

              {/* Social Media Section */}
              <Section className="mb-6 text-center">
                <Text className="mb-4 text-gray-700">
                  Connect with our community on social media:
                </Text>
                <Row className="text-center">
                  <Column align="center">
                    <Link
                      href="https://instagram.com/loomcairo"
                      className="text-brand hover:text-brand-dark mx-2"
                    >
                      Instagram
                    </Link>
                    <Text className="mx-2 inline text-gray-400">•</Text>
                    <Link
                      href="https://tiktok.com/@clyocairo"
                      className="text-brand hover:text-brand-dark mx-2"
                    >
                      TikTok
                    </Link>
                    <Text className="mx-2 inline text-gray-400">•</Text>
                    <Link
                      href="https://linkedin.com/company/clyo-cairo"
                      className="text-brand hover:text-brand-dark mx-2"
                    >
                      LinkedIn
                    </Link>
                  </Column>
                </Row>
              </Section>

              <Text className="mb-4 text-gray-700">
                If you have any questions about your onboarding process, please
                reach out to us at{" "}
                <Link
                  href="mailto:contact@clyocairo.com"
                  className="text-brand"
                >
                  contact@clyocairo.com
                </Link>
              </Text>

              <Text className="mb-1 text-gray-700">Warm regards,</Text>
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
