import { BrandInfo } from "@/components/BrandInfo";
import { BrandScroller } from "@/components/BrandScroller";

export function BrandOfTheDay({ brand }: { brand: string }) {
  return (
    <div className="brand-of-day-wrapper">
      <h3 className="section-large">Brand of The Day</h3>
      <BrandScroller title={brand} brand={brand} />
    </div>
  );
}
