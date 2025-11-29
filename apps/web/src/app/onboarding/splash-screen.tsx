"use client";

import Link from "next/link";

export function SplashScreen() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="animate-fade-in mb-8 text-center sm:mb-12">
          <h1 className="animate-slide-up mb-4 text-3xl font-bold text-gray-900 sm:mb-6 sm:text-4xl md:text-5xl">
            Welcome to{" "}
            <span className="animate-pulse text-purple-600">Clyo</span>
          </h1>
          <p className="animate-slide-up-delay mx-auto max-w-xl text-lg text-gray-600 sm:text-xl">
            Discover the world of fashion at your fingertips. Shop, explore, and
            connect with the latest trends and brands.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {/* Shop Categories */}
          <div className="animate-card-1 transform rounded-lg bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:p-6">
            <div className="mb-3 flex h-10 w-10 animate-bounce items-center justify-center rounded-lg bg-purple-100 sm:mb-4 sm:h-12 sm:w-12">
              <svg
                className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
              Shop by Category
            </h3>
            <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
              Explore thousands of products across fashion, accessories, and
              lifestyle categories.
            </p>
            <Link
              href="/categories"
              className="text-sm font-medium text-purple-600 transition-colors duration-200 hover:text-purple-700 sm:text-base"
            >
              Browse Categories →
            </Link>
          </div>

          {/* Discover Brands */}
          <div className="animate-card-2 transform rounded-lg bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:p-6">
            <div className="mb-3 flex h-10 w-10 animate-bounce items-center justify-center rounded-lg bg-purple-100 sm:mb-4 sm:h-12 sm:w-12">
              <svg
                className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
              Discover Brands
            </h3>
            <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
              Follow your favorite brands and discover new ones with our curated
              selection.
            </p>
            <Link
              href="/brands"
              className="text-sm font-medium text-purple-600 transition-colors duration-200 hover:text-purple-700 sm:text-base"
            >
              Explore Brands →
            </Link>
          </div>

          {/* Personalized Experience */}
          <div className="animate-card-3 transform rounded-lg bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:p-6">
            <div className="mb-3 flex h-10 w-10 animate-bounce items-center justify-center rounded-lg bg-purple-100 sm:mb-4 sm:h-12 sm:w-12">
              <svg
                className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
              Personalized Experience
            </h3>
            <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
              Get recommendations tailored to your style and preferences.
            </p>
            <Link
              href="/account"
              className="text-sm font-medium text-purple-600 transition-colors duration-200 hover:text-purple-700 sm:text-base"
            >
              Create Account →
            </Link>
          </div>

          {/* Easy Shopping */}
          <div className="animate-card-4 transform rounded-lg bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:p-6">
            <div className="mb-3 flex h-10 w-10 animate-bounce items-center justify-center rounded-lg bg-purple-100 sm:mb-4 sm:h-12 sm:w-12">
              <svg
                className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
              Easy Shopping
            </h3>
            <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
              Add items to cart, save favorites, and checkout seamlessly.
            </p>
            <Link
              href="/cart"
              className="text-sm font-medium text-purple-600 transition-colors duration-200 hover:text-purple-700 sm:text-base"
            >
              View Cart →
            </Link>
          </div>

          {/* Track Orders */}
          <div className="animate-card-5 transform rounded-lg bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:p-6">
            <div className="mb-3 flex h-10 w-10 animate-bounce items-center justify-center rounded-lg bg-purple-100 sm:mb-4 sm:h-12 sm:w-12">
              <svg
                className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
              Track Orders
            </h3>
            <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
              Monitor your orders and get updates on delivery status.
            </p>
            <Link
              href="/orders"
              className="text-sm font-medium text-purple-600 transition-colors duration-200 hover:text-purple-700 sm:text-base"
            >
              View Orders →
            </Link>
          </div>

          {/* Stay Updated */}
          <div className="animate-card-6 transform rounded-lg bg-white p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:p-6">
            <div className="mb-3 flex h-10 w-10 animate-bounce items-center justify-center rounded-lg bg-purple-100 sm:mb-4 sm:h-12 sm:w-12">
              <svg
                className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h10v-2H4v2zM4 11h14v-2H4v2zM4 7h18v-2H4v2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
              Stay Updated
            </h3>
            <p className="mb-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
              Follow brands and get notified about new arrivals and sales.
            </p>
            <Link
              href="/following"
              className="text-sm font-medium text-purple-600 transition-colors duration-200 hover:text-purple-700 sm:text-base"
            >
              Manage Following →
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="animate-fade-in-up text-center">
          <div className="mx-auto max-w-lg transform rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105 sm:p-8">
            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl">
              Ready to Start Shopping?
            </h2>
            <p className="mb-4 text-sm text-gray-600 sm:mb-6 sm:text-base">
              Join thousands of fashion enthusiasts who trust Clyo for their
              shopping needs.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/"
                className="transform rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-purple-700 sm:px-8 sm:py-3"
              >
                Start Shopping
              </Link>
              <Link
                href="/about"
                className="transform rounded-lg border border-purple-600 px-6 py-2 font-semibold text-purple-600 transition-all duration-200 hover:scale-105 hover:bg-purple-50 sm:px-8 sm:py-3"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up-delay {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.4s both;
        }

        .animate-card-1 {
          animation: slide-up 0.6s ease-out 0.1s both;
        }

        .animate-card-2 {
          animation: slide-up 0.6s ease-out 0.2s both;
        }

        .animate-card-3 {
          animation: slide-up 0.6s ease-out 0.3s both;
        }

        .animate-card-4 {
          animation: slide-up 0.6s ease-out 0.4s both;
        }

        .animate-card-5 {
          animation: slide-up 0.6s ease-out 0.5s both;
        }

        .animate-card-6 {
          animation: slide-up 0.6s ease-out 0.6s both;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}
