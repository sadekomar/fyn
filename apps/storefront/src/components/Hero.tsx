import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] md:h-screen">
      <div className="absolute inset-0">
        {/* Background Image - using one of the assets as placeholder */}
        <Image
          src="/nagskin-assets/hero.webp"
          alt="Hero Campaign"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay gradient if needed, but design looks clean */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-20 md:pb-32 md:px-12">
        <h1 className="max-w-xl text-4xl md:text-6xl font-serif text-white leading-tight">
          Waist-ed, but <br />
          never wasted.
        </h1>
        <p className="mt-4 max-w-md text-sm md:text-base text-white/90">
          THE SEASON OF TRANSITION Our fall collection highlights rich Italian
          leathers, sculptural buckles, and versatile silhouettes.
        </p>
        <button className="mt-8 w-fit border-b border-white text-white hover:text-gray-200 pb-1 text-sm uppercase tracking-wider">
          Shop now
        </button>
      </div>
    </section>
  );
}
