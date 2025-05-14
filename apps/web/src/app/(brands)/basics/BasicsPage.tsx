import { BrandScroller } from "@/components/BrandScroller";

import { PageTitle } from "@/components/PageTitle/PageTitle";

export default function BackToBasics() {
  const backToBasics = ["the basic look", "organdy", "terre"];

  return (
    <>
      <PageTitle>Basics</PageTitle>

      {backToBasics.map((brand, index) => (
        <BrandScroller key={index} brand={brand} title={brand} />
      ))}
    </>
  );
}
