import "./About.css";

export const metadata = {
  title: "About Univyr",
  description:
    "Find everything you need on Univyr Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  robots:
    "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  keywords: "Univyr Cairo, Local Brands, Fashion Brands, Egyptian Local Brands",
  openGraph: {
    title: "About Univyr",
    description:
      "Find everything you need on Univyr Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Univyr",
    description:
      "Find everything you need on Univyr Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  },
  alternates: {
    canonical: "https://univyr.com/",
  },
};

export default function About() {
  return (
    <>
      <div className="about-page-wrapper">
        <h1 className="about-title">About Univyr</h1>
        <div className="about-section-wrapper">
          <h2 className="about-section-title">Univyr in 30s</h2>
          <p>
            Univyr is a platform that combines 300+ Local Brands, helping you
            explore new items, brands, and collections. Items on Univyr are
            always up to date, reflecting exactly what's on the original brands'
            websites.
          </p>
        </div>
        <div className="about-section-wrapper">
          <h2 className="about-section-title">Things You Can Do With Univyr</h2>
          <ul>
            <li>Discover new, unique brands</li>
            <li>Explore a wide range of categories</li>
            <li>Search for a specific item</li>
            <li>Find the best prices</li>
            <li>Filter by gender, category, brand, and material</li>
            <li>Like items to refer to them later</li>
            <li>Refer back to items you saw with History</li>
            <li>
              Keep up with the latest from your favorite brands by Following
              them
            </li>
            <li>Scroll endlessly with our infinite scroll</li>
          </ul>
        </div>
      </div>
      <div className="about-page-wrapper">
        <div className="about-section-wrapper">
          <h2 className="about-section-title">Behind The Name</h2>
          <p>
            Our name, inspired by the loom machine, reflects our mission: just
            as a loom weaves threads into a single yarn, Univyr seamlessly
            combines various clothing brands into a single, cohesive platform.
          </p>
          <p>
            This ecosystem brands will achieve more together than they could
            alone. We envision Cairo becoming the fifth fashion capital of the
            world, with these brands and their creativity driving that future.
          </p>
        </div>
        <div className="about-section-wrapper">
          <h2 className="about-section-title">Why Univyr</h2>
          <p>
            We love Local Brands, and were tired of having to mentally remember
            the names of brands or take screenshots of their websites, of having
            to go on Instagram to search for them first so we could eventually
            get to their website. We didn't like the experience of having to
            visit 20 different websites before finding the right T-shirt or pair
            of Jeans. We wanted to easily compare items in terms of style,
            material, sizes, and price.
          </p>
        </div>
        <div className="about-section-wrapper">
          <h2 className="about-section-title">A Storyteller of Local Brands</h2>
          <p>
            We celebrate the diverse and rich ecosystem of local brands – their
            stories, styles, and origins. Here, users embark on a journey to
            connect intimately with their favorite brands, fostering a
            continuous exploration rather than a one-time discovery. We believe
            that the beauty of brand exploration should be an ongoing, evolving
            process, and Univyr is your dedicated companion in this sartorial
            adventure.
          </p>
          <p>
            Not enough people know these brands, and we plan on changing that!
          </p>
        </div>
        <div className="about-section-wrapper">
          <h2 className="about-section-title">Curation Strategy</h2>
          <p>
            There's a dichotomy between product-driven and story-driven brands.
            Egypt has always had local brands, but this new wave of rich,
            story-driven brands was unheard of at this scale before. Univyr
            leans towards the narrative-rich, trend-setting nature of
            story-driven brands rather than the conventional product-driven ones
            that primarily focus on commodities. The allure of new-wave brands
            also lies in their brand-centric approach, wherein the emphasis
            shifts from individual products to the overarching narrative and
            philosophy behind the brand.
          </p>
        </div>
      </div>
    </>
  );
}
