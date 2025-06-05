import Image from "next/image";
import Link from "next/link";

export default function HeroByV0() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Featured seasonal outfit"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Eyebrow text */}
            <div className="mb-4 sm:mb-6">
              <span className="inline-block border border-white/30 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
                New Collection
              </span>
            </div>

            {/* Main headline */}
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl xl:text-8xl">
              Define Your
              <br />
              <span className="italic font-light">Identity</span>
            </h1>

            {/* Subtext */}
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/90 sm:mb-12 sm:text-xl lg:text-2xl">
              Where confidence meets craftsmanship. Discover pieces that speak
              to who you are and who you're becoming.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center overflow-hidden bg-white px-8 py-4 text-base font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-white/90 sm:px-12 sm:py-5 sm:text-lg"
              >
                <span className="relative z-10">Shop the Drop</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white to-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>

              <Link
                href="/lookbook"
                className="group inline-flex items-center text-white/90 transition-colors duration-300 hover:text-white"
              >
                <span className="border-b border-white/30 pb-1 text-sm font-medium uppercase tracking-wider transition-colors duration-300 group-hover:border-white sm:text-base">
                  View Lookbook
                </span>
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
        <div className="flex flex-col items-center text-white/60">
          <span className="mb-2 text-xs font-medium uppercase tracking-widest">
            Scroll
          </span>
          <div className="h-8 w-px bg-white/30">
            <div className="h-2 w-px animate-pulse bg-white" />
          </div>
        </div>
      </div>

      {/* Navigation hint */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 transform sm:right-8">
        <div className="flex flex-col gap-2">
          <div className="h-2 w-2 rounded-full bg-white" />
          <div className="h-2 w-2 rounded-full bg-white/30" />
          <div className="h-2 w-2 rounded-full bg-white/30" />
        </div>
      </div>
    </section>
  );
}
