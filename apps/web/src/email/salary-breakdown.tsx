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

export default function SalaryBreakdown({
  name = "Jana Yasser",
  julyWeekSalary = 1000,
  augustMonthSalary = 4000,
  videoBonus = 3000,
  currency = "EGP",
}: {
  name: string;
  julyWeekSalary: number;
  augustMonthSalary: number;
  videoBonus: number;
  currency: string;
}) {
  const mainColor = "#A6A2DE";
  const secondaryColor = "#F4F3FF";
  const bodyTextStyle = "text-base text-gray-700";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Html>
      <Preview>
        Univyr - Salary Breakdown for July Week & August + Video Bonus
      </Preview>
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
                Salary Breakdown
              </Heading>

              <Text className={`${bodyTextStyle} mb-4`}>Dear {name},</Text>

              <Text className={`${bodyTextStyle} mb-6`}>
                Please find below your detailed salary breakdown for the month
                of August. This document serves as your official payslip and
                should be kept for your records.
              </Text>

              {/* Employee Information */}
              <Section className="mb-6 rounded-lg bg-gray-50 p-4">
                <Text className="mb-2 text-sm font-medium text-gray-600">
                  Information
                </Text>
                <Text className="text-sm text-gray-700">Name: {name}</Text>
                <Text className="text-sm text-gray-700">
                  Period: August 2025
                </Text>
              </Section>

              {/* Salary Breakdown */}
              <Section className="mb-6">
                <Text className="mb-4 text-lg font-semibold text-gray-800">
                  Salary Components
                </Text>

                {/* Three Components */}
                <Section className="mb-4">
                  <Row className="mb-3">
                    <Column>
                      <Text className="text-sm text-gray-600">
                        Last week of July 2025 Salary
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-right text-sm font-medium text-gray-800">
                        {formatCurrency(julyWeekSalary)}
                      </Text>
                    </Column>
                  </Row>
                  <Row className="mb-3">
                    <Column>
                      <Text className="text-sm text-gray-600">
                        August 2025 Salary
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-right text-sm font-medium text-gray-800">
                        {formatCurrency(augustMonthSalary)}
                      </Text>
                    </Column>
                  </Row>
                  <Row className="mb-3">
                    <Column>
                      <Text className="text-sm text-gray-600">
                        Video Performance Bonus (100K views)
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-brand text-right text-sm font-medium">
                        {formatCurrency(videoBonus)}
                      </Text>
                    </Column>
                  </Row>
                  <Hr className="my-3 border border-gray-200" />
                  <Row>
                    <Column>
                      <Text className="font-medium text-gray-700">
                        Total Payment
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-right font-semibold text-gray-800">
                        {formatCurrency(
                          julyWeekSalary + augustMonthSalary + videoBonus,
                        )}
                      </Text>
                    </Column>
                  </Row>
                </Section>
              </Section>

              {/* Video Bonus Table */}
              <Section className="mb-6">
                <Text className="mb-4 text-lg font-semibold text-gray-800">
                  Video Performance Bonus Structure
                </Text>
                <Section className="rounded-lg bg-gray-50 p-4">
                  <Row className="mb-2">
                    <Column>
                      <Text className="text-sm font-medium text-gray-700">
                        100K views
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-brand text-right text-sm font-medium">
                        +3,000 EGP
                      </Text>
                    </Column>
                  </Row>
                  <Row className="mb-2">
                    <Column>
                      <Text className="text-sm font-medium text-gray-700">
                        200K views
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-brand text-right text-sm font-medium">
                        +3,000 EGP
                      </Text>
                    </Column>
                  </Row>
                  <Row className="mb-2">
                    <Column>
                      <Text className="text-sm font-medium text-gray-700">
                        300K views
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-brand text-right text-sm font-medium">
                        +3,000 EGP
                      </Text>
                    </Column>
                  </Row>
                  <Row className="mb-2">
                    <Column>
                      <Text className="text-sm font-medium text-gray-700">
                        600K views
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-brand text-right text-sm font-medium">
                        +3,000 EGP
                      </Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <Text className="text-sm font-medium text-gray-700">
                        1M views
                      </Text>
                    </Column>
                    <Column>
                      <Text className="text-brand text-right text-sm font-medium">
                        +3,000 EGP
                      </Text>
                    </Column>
                  </Row>
                </Section>
              </Section>

              <Hr className="my-6 border border-gray-200" />

              {/* Additional Information */}
              <Section className="mb-6">
                <Text className={`${bodyTextStyle} mb-4 font-medium`}>
                  Important Notes:
                </Text>
                <ul className="list-disc space-y-2 pl-4">
                  <li className="text-sm text-gray-600">
                    This payment will be transferred to your Instapay account
                  </li>
                  <li className="text-sm text-gray-600">
                    Please keep this document for your tax and financial records
                  </li>
                  <li className="text-sm text-gray-600">
                    For any discrepancies, please contact us within 7 days
                  </li>
                </ul>
              </Section>

              <Text className={`${bodyTextStyle} mb-4`}>
                Congratulations on the success of your video! Your creativity
                and hard work continue to drive Univyr's growth. If you have any
                questions about this payment, please don't hesitate to contact
                us at{" "}
                <Link href="mailto:contact@univyr.com" className="text-brand">
                  contact@univyr.com
                </Link>
              </Text>

              <Text className={`${bodyTextStyle} mb-1`}>
                Keep up the amazing work!
              </Text>
              <Text className={`${bodyTextStyle} font-semibold`}>
                Omar Sadek
              </Text>
              <Text className={`${bodyTextStyle} text-sm text-gray-600`}>
                CEO, Univyr
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-8 mb-8 text-center">
              <Text className="text-sm text-gray-500">
                © 2025 Univyr. All rights reserved.
              </Text>
              <Text className="text-sm text-gray-500">Cairo, Egypt</Text>
              <Text className="mt-2 text-xs text-gray-400">
                This is a confidential document. Please handle with care.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
