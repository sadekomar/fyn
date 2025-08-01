import React from "react";

export default function PolicyPage() {
  // Policy data arrays
  const orderPolicies = [
    "All orders are processed within 24 hours of the order being placed.",
    "You will receive an order confirmation email from the brand itself once the order is processed.",
    "Orders can be cancelled within 1 hour of placement by contacting our customer service.",
  ];

  const deliveryPolicies = [
    "Standard delivery across Egypt usually takes 2-4 business days, but in rare cases it may take up to 14 business days.",
  ];

  const discountPolicies = [
    "Discount codes cannot be combined with other promotions or offers.",
    "Promotional discounts apply to the subtotal before shipping and taxes (if applicable).",
    "Sale items may have additional restrictions and cannot be returned.",
    "We reserve the right to modify or cancel promotions at any time.",
  ];

  const verifiedBrandBenefits = [
    "Hassle-free return processing",
    "Direct communication with the brand for resolution",
    "Full refund or replacement guarantee",
    "Support throughout the entire return process",
    "Sale items, undergarments, and personalized items are non-returnable.",
    "Returns are accepted within 14 days of delivery for unused items in original packaging.",
    "Return shipping costs are the responsibility of the customer unless the item is defective.",
    "Refunds are processed within 5-7 business days after receiving the returned item.",
  ];

  const unverifiedBrandResponsibilities = [
    "Contact the brand directly for returns and refunds",
    "Follow the brand's specific return policies",
    "Handle shipping and return costs independently",
    "Resolve disputes directly with the brand",
  ];

  const brandVerificationNotes = [
    "Brand verification status is clearly indicated next to each brand",
    "We recommend purchasing from verified brands for the best customer experience and return protection.",
    "For questions about brand verification status, please contact our customer service team.",
  ];

  const contactInfo = {
    customerService: {
      title: "Customer Service",
      details: ["Email: contact@loom.com", "Hours: Everyday, 9 AM - 6 PM"],
    },
    liveChat: {
      title: "Live Chat",
      details: [
        "Contact us via instagram DMs",
        "Get instant help with your questions",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Loom Policies
          </h1>
          <p className="text-lg text-gray-600">
            Important information about our orders, deliveries, and promotions
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {/* Orders Policy */}
          <section className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
              <svg
                className="mr-3 h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Order Policies
            </h2>
            <div className="space-y-4 text-gray-700">
              {orderPolicies.map((policy, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <p>{policy}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Delivery Policy */}
          <section className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
              <svg
                className="mr-3 h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Delivery Information
            </h2>
            <div className="space-y-4 text-gray-700">
              {deliveryPolicies.map((policy, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <p>{policy}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Discount Policy */}
          <section className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
              <svg
                className="mr-3 h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
              Discount & Promotion Policies
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="mb-6 border-l-4 border-blue-400 bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-700">
                      <strong>Important:</strong> All 10% discounts are capped
                      at 200EGP per order.
                    </p>
                  </div>
                </div>
              </div>
              {discountPolicies.map((policy, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <p>{policy}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Brand Verification & Return Responsibility */}
          {/* {BrandVerificationPolicy(
            verifiedBrandBenefits,
            unverifiedBrandResponsibilities,
            brandVerificationNotes,
          )} */}

          {/* Contact Information */}
          <section className="rounded-lg bg-blue-50 p-8">
            <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
              <svg
                className="mr-3 h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Need Help?
            </h2>
            <div className="grid gap-6 text-gray-700 md:grid-cols-2">
              {Object.entries(contactInfo).map(([key, info]) => (
                <div key={key}>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    {info.title}
                  </h3>
                  {info.details.map((detail, index) => (
                    <p key={index}>{detail}</p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mt-2">
            These policies are subject to change. Please check back regularly
            for updates.
          </p>
        </div>
      </div>
    </div>
  );
}

function BrandVerificationPolicy(
  verifiedBrandBenefits: string[],
  unverifiedBrandResponsibilities: string[],
  brandVerificationNotes: string[],
) {
  return (
    <section className="rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
        <svg
          className="mr-3 h-6 w-6 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Brand Verification & Return Responsibility
      </h2>
      <div className="space-y-6">
        {/* Verified Brands */}
        <div className="border-l-4 border-green-400 bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Verified Brands
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  For verified brands on our platform, Loom takes full
                  responsibility for ensuring smooth return processes. We
                  guarantee:
                </p>
                <ul className="mt-2 space-y-1">
                  {verifiedBrandBenefits.map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Unverified Brands */}
        <div className="border-l-4 border-red-400 bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Unverified Brands
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  <strong>Important:</strong> For orders from unverified brands,
                  Loom is not responsible for return processing or refunds.
                  Customers should:
                </p>
                <ul className="mt-2 space-y-1">
                  {unverifiedBrandResponsibilities.map(
                    (responsibility, index) => (
                      <li key={index}>• {responsibility}</li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-gray-700">
          {brandVerificationNotes.map((note, index) => (
            <div key={index} className="flex items-start">
              <div className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
