import { BrandScroller } from "@/components/BrandScroller";
import { PageTitle } from "@/components/PageTitle/PageTitle";

export default function NamesToKnow() {
  let namesToKnow = [
    "aesthete",
    "almah",
    "ausetia",
    "baggy collective",
    "baynoire",
    "brown toast",
    "cielo",
    "cocan",
    "daddysgirl",
    "totelly",
    "horra",
    "juvenile",
    "kika",
    "kncpt",
    "fsociety",
    "locken",
    "najlah",
    "notfound",
    "quwa",
    "richa",
    "warped",
  ];

  return (
    <>
      <PageTitle>Names to Know</PageTitle>
      {namesToKnow.map((brand, index) => (
        <BrandScroller key={index} brand={brand} title={brand} />
      ))}
    </>
  );
}
