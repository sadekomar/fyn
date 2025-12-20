import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Tailwind,
  Img,
  Section,
  Hr,
} from "@react-email/components";

export default function OmarSignature() {
  const mainColor = "#A6A2DE";

  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: mainColor,
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
        <Body className="m-0 bg-white p-0 font-sans">
          <Container className="mx-auto max-w-[600px]">
            <Section className="border-brand border-l-4 py-3 pl-4">
              <Section className="mb-2">
                <Text className="mb-0 text-lg font-semibold text-gray-800">
                  Omar Sadek
                </Text>
                <Text className="text-brand text-sm font-medium">
                  Chief Executive Officer
                </Text>
              </Section>

              <Section className="mb-2">
                <Text className="text-sm text-gray-600">
                  📧{" "}
                  <Link
                    href="mailto:omar@univyr.com"
                    className="text-brand hover:text-brand/80"
                  >
                    omar@univyr.com
                  </Link>
                </Text>
                <Text className="text-sm text-gray-600">
                  🌐{" "}
                  <Link
                    href="https://univyr.com"
                    className="text-brand hover:text-brand/80"
                  >
                    univyr.com
                  </Link>
                </Text>
              </Section>

              <Img
                src="https://res.cloudinary.com/dffgye7z3/image/upload/v1747755019/loom-black_bywezj.png"
                alt="Univyr"
                height={18}
              />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
