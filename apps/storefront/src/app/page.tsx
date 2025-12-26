import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ProductShowcase />
      <Hero />
      <CategoryGrid />

      <section className="py-6 overflow-hidden border-y border-gray-200">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center text-sm mx-4">
              <span className="font-[family-name:var(--font-playfair)] font-semibold mr-4">
                NAGSKIN
              </span>
              <span className="text-gray-600">
                The first cut into a world that recognizes power and
                individuality
              </span>
            </span>
          ))}
        </div>
      </section>
      {/* Two-Column Feature Section */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Image */}
        <div className="relative h-[500px] md:h-[600px]">
          <Image
            src="/nagskin-assets/cta-top.jpg"
            alt="Models at the beach"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Image with Text */}
        <div className="relative h-[500px] md:h-[600px]">
          <Image
            src="/nagskin-assets/cta-bottom.jpg"
            alt="Fashion lifestyle"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-8 left-6 right-6 md:bottom-12 md:left-10 md:right-10 text-white">
            <p className="text-sm md:text-base mb-4 leading-relaxed max-w-md">
              NAGSKIN creates timeless pieces that outlast fleeting trends with
              consistency and durability. Proudly made in Egypt, sourced in
              Italy.
            </p>
            <a
              href="#"
              className="inline-block text-sm underline underline-offset-4 hover:text-white/80 transition-colors"
            >
              Shop now
            </a>
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </main>
  );
}
