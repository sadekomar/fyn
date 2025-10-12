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

export default function BookInterview({
  name = "Omar",
  calendlyLink = "https://calendly.com/contact-loomcairo/loom-chat",
}: {
  name: string;
  calendlyLink: string;
}) {
  const mainColor = "#A6A2DE";
  const secondaryColor = "#F4F3FF";
  const bodyTextStyle = "text-base text-gray-700";

  return (
    <Html>
      <Preview>Loom - Schedule Your Interview!</Preview>
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
                alt="Loom Logo"
                height={36}
                className="mx-auto mb-4"
              />
            </Section>

            {/* Main Content */}
            <Section className="rounded-lg bg-white p-8 shadow-lg">
              <Heading className="mb-6 text-center text-2xl font-semibold text-gray-800">
                Time to meet! 🎉
              </Heading>

              <Text className={`${bodyTextStyle} mb-4`}>Hi {name},</Text>

              <Text className={`${bodyTextStyle} mb-4`}>
                Congratulations! We're thrilled to inform you that your
                application has been selected for the next stage, and we're
                excited to meet you. The next step is to schedule an interview
                where we can discuss your potential role at Loom.
              </Text>

              <Section className="bg-brand/10 mb-6 rounded-lg p-6">
                <Text className={`${bodyTextStyle} mb-4 font-medium`}>
                  What to expect in the interview:
                </Text>
                <ul className="list-disc space-y-2 pl-4">
                  <li className={bodyTextStyle}>
                    Discussion about your background and experience
                  </li>
                  <li className={bodyTextStyle}>
                    Understanding your vision for fashion in Cairo
                  </li>
                  <li className={bodyTextStyle}>
                    Q&A session about Loom and the role
                  </li>
                  <li className={bodyTextStyle}>Duration: 15-30 minutes</li>
                </ul>
              </Section>

              <Section className="mb-8 text-center">
                <Link
                  href={calendlyLink}
                  className="bg-brand hover:bg-brand/90 inline-block rounded-full px-8 py-3 text-base font-semibold text-white"
                >
                  Schedule Your Interview
                </Link>
              </Section>

              <Text className={`${bodyTextStyle} mb-4`}>
                Please choose a time that works best for you using the button
                above. If none of the available times work for you, please reply
                to this email and we'll find an alternative.
              </Text>

              <Hr className="my-6 border border-gray-200" />

              <Text className={`${bodyTextStyle} mb-4`}>
                To prepare for the interview, you might want to:
              </Text>
              <ul className="mb-6 list-disc space-y-2 pl-4">
                <li className={bodyTextStyle}>
                  Review our social media presence to understand our brand
                  better
                </li>
                <li className={bodyTextStyle}>
                  Think about your vision for fashion in Cairo
                </li>
                <li className={bodyTextStyle}>
                  Prepare any questions you have about the role or Loom
                </li>
              </ul>

              <Text className={`${bodyTextStyle} mb-4`}>
                If you need to reschedule or have any questions, please contact
                us at{" "}
                <Link
                  href="mailto:contact@loomcairo.com"
                  className="text-brand"
                >
                  contact@loomcairo.com
                </Link>
              </Text>

              <Text className={`${bodyTextStyle} mb-1`}>
                Looking forward to meeting you!
              </Text>
              <Text className={`${bodyTextStyle} font-semibold`}>
                The Loom Team
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-8 mb-8 text-center">
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
