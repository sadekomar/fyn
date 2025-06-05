// Suggestion: Consider a library like 'framer-motion' for more complex animations and scroll effects.
// Or use Intersection Observer API for simple scroll-triggered animations.

export default function HeroExperimentPage() {
  // TODO:
  // 1. Replace placeholder divs in cards with actual <Image /> components from Next.js for optimized images.
  //    Example: <Image src="/path/to/brand-image.jpg" alt="Brand A" layout="fill" objectFit="cover" className="rounded-md" />
  // 2. Implement scroll-based parallax for the cards using JavaScript if desired.
  //    - Listen to scroll events or use Intersection Observer.
  //    - Update the `transform` style of the cards based on scroll position.
  //    - For example, cards with negative translateZ could move slower than the scroll,
  //      and cards with positive translateZ could move slightly faster or in a different direction.

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-neutral-900 text-center text-white p-4 md:p-0">
      {/* Background Visuals - More dynamic and textured */}
      <div className="absolute inset-0 z-0 opacity-60">
        {/* Subtle animated gradient for a 'magical realism' feel */}
        <div className="absolute inset-0 hero-gradient-animation"></div>
        {/* Placeholder for rich textures or abstract visual elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 mix-blend-soft-light">
          {/* Example: Could use an SVG feTurbulence filter for subtle noise texture if not using an image */}
          {/* <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id='noiseFilter'>
              <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/>
            </filter>
            <rect width='100%' height='100%' filter='url(#noiseFilter)'/>
          </svg> */}
        </div>
      </div>

      {/* Floating Cards - representing products/brands. Add JS for scroll parallax. */}
      <div className="absolute inset-0 z-10 perspective-1200px overflow-hidden">
        {" "}
        {/* Added overflow-hidden here for safety */}
        {/* Card 1 - Replace with actual brand/product image and link */}
        <div
          className="absolute w-44 h-60 md:w-52 md:h-72 bg-neutral-800/60 backdrop-blur-md shadow-2xl rounded-xl p-3 md:p-4 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-purple-500/40 parallax-card"
          style={{
            top: "12%",
            left: "8%",
            transform: "rotate(-8deg) translateZ(-80px)",
          }}
          // data-parallax-factor="-0.1" // Example for JS
        >
          <div className="w-full h-3/4 bg-neutral-700 rounded-md mb-2 animate-pulse"></div>{" "}
          {/* Image Placeholder */}
          <p className="text-xs md:text-sm font-semibold text-neutral-200">
            Local Brand A
          </p>
          <p className="text-xs text-neutral-400">Unique Designs</p>
        </div>
        {/* Card 2 - Replace with actual brand/product image and link */}
        <div
          className="absolute w-36 h-52 md:w-44 md:h-60 bg-neutral-800/60 backdrop-blur-md shadow-2xl rounded-xl p-3 md:p-4 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-pink-500/40 parallax-card"
          style={{
            bottom: "15%",
            right: "10%",
            transform: "rotate(6deg) translateZ(-40px)",
          }}
          // data-parallax-factor="0.05" // Example for JS
        >
          <div className="w-full h-3/4 bg-neutral-700 rounded-md mb-2 animate-pulse"></div>{" "}
          {/* Image Placeholder */}
          <p className="text-xs md:text-sm font-semibold text-neutral-200">
            Product X
          </p>
          <p className="text-xs text-neutral-400">Fashion Forward</p>
        </div>
        {/* Card 3 - Deeper in Z-axis for parallax, more subtle */}
        <div
          className="absolute w-32 h-44 md:w-36 md:h-52 bg-neutral-800/40 backdrop-blur-sm shadow-xl rounded-lg p-2 md:p-3 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-teal-500/30 parallax-card"
          style={{
            top: "50%",
            left: "20%",
            transform: "translateY(-50%) rotate(3deg) translateZ(-200px)",
          }}
          // data-parallax-factor="-0.2" // Example for JS
        >
          <div className="w-full h-2/3 bg-neutral-700 rounded-md mb-1 md:mb-2 animate-pulse"></div>{" "}
          {/* Image Placeholder */}
          <p className="text-xs font-semibold text-neutral-300">
            Creator Spotlight
          </p>
        </div>
        {/* Card 4 - Another card for balance and richness */}
        <div
          className="absolute w-32 h-44 md:w-36 md:h-52 bg-neutral-800/50 backdrop-blur-sm shadow-xl rounded-lg p-2 md:p-3 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-yellow-500/30 parallax-card"
          style={{
            top: "25%",
            right: "18%",
            transform: "rotate(-5deg) translateZ(-120px)",
          }}
          // data-parallax-factor="0.1" // Example for JS
        >
          <div className="w-full h-2/3 bg-neutral-700 rounded-md mb-1 md:mb-2 animate-pulse"></div>{" "}
          {/* Image Placeholder */}
          <p className="text-xs font-semibold text-neutral-300">New Arrivals</p>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center p-6 max-w-xl md:max-w-2xl">
        {" "}
        {/* Reduced max-width for better focus */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tight hero-headline-text">
          Step into something new.
        </h1>
        <p className="text-md sm:text-lg md:text-xl text-neutral-200 mb-10 max-w-lg md:max-w-xl">
          {" "}
          {/* Slightly increased text size and constrained width */}
          The best local brands, all in one place. Your journey into local
          creativity and culture starts here.
        </p>
        <button className="px-8 py-3 md:px-10 md:py-4 bg-white text-neutral-900 text-base md:text-lg font-semibold rounded-full shadow-lg hover:bg-neutral-200 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50">
          Start Exploring
        </button>
      </div>

      {/* Optional: Scrolling Marquee - Refined */}
      <div className="absolute bottom-0 left-0 w-full z-20 py-3 md:py-5 bg-neutral-900/60 backdrop-blur-md overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-neutral-400 text-xs sm:text-sm md:text-base">
          <span className="mx-3 md:mx-4">✨ Discover Local Gems</span>
          <span className="mx-3 md:mx-4"> Curated Collections </span>
          <span className="mx-3 md:mx-4"> Fashion-Forward Finds </span>
          <span className="mx-3 md:mx-4"> Support Small Brands </span>
          <span className="mx-3 md:mx-4"> Unique Styles Daily </span>
          <span className="mx-3 md:mx-4">Handcrafted Quality</span>
          {/* Repeated for smooth loop */}
          <span className="mx-3 md:mx-4">✨ Discover Local Gems</span>
          <span className="mx-3 md:mx-4"> Curated Collections </span>
          <span className="mx-3 md:mx-4"> Fashion-Forward Finds </span>
          <span className="mx-3 md:mx-4"> Support Small Brands </span>
          <span className="mx-3 md:mx-4"> Unique Styles Daily </span>
          <span className="mx-3 md:mx-4">Handcrafted Quality</span>
        </div>
      </div>

      <style jsx global>{`
        /*
          Consider importing a font that fits the "futuristic yet warm" and "editorial" feel.
          Example: @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
          body {
            font-family: 'Outfit', sans-serif; // For general UI
          }
          .hero-headline-text, .some-editorial-element {
            font-family: 'Playfair Display', serif; // For headlines or specific editorial text
          }
        */
        body {
          margin: 0;
          font-family:
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            "Helvetica Neue",
            Arial,
            "Noto Sans",
            sans-serif,
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
            "Noto Color Emoji";
          background-color: #171717; /* Match section bg for seamlessness if page is only this section */
        }
        .hero-gradient-animation {
          background: linear-gradient(
            270deg,
            #4a00e0,
            #8e2de2,
            #c968d0,
            #ff9a8b,
            #8e2de2,
            #4a00e0
          );
          background-size: 1200% 1200%; /* Increased size for slower, more subtle animation */
          animation: gradientShift 35s ease infinite;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .hero-headline-text {
          color: #fcfcfc; /* A very bright, clean white/off-white */
          /* Optional: A very subtle text shadow for depth if needed on complex backgrounds */
          /* text-shadow: 0px 1px 3px rgba(0,0,0,0.2); */
        }
        .animate-marquee {
          animation: marquee 60s linear infinite; /* Slower marquee for a calmer feel */
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .perspective-1200px {
          perspective: 1200px; /* Slightly increased perspective for a more subtle 3D effect */
        }

        /* Base class for cards if JS parallax is added */
        .parallax-card {
          /* Transition for JS-driven transform changes */
          /* transition: transform 0.1s linear; */
        }

        /* Styling for focus state on button */
        button:focus-visible {
          outline: 2px solid transparent;
          outline-offset: 2px;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.5); /* Example focus ring, Tailwind's ring-purple-500/50 */
        }
      `}</style>
    </section>
  );
}
