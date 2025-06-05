import { LoomImage } from "@/components/LoomImage";
import { extendedCategories } from "@/data/extendedCategories";
import Link from "next/link";
import "./AllCategories.css";

export function CategoriesComponent({
  isCategoryCompatibleWithGender,
  generateCategoryLink,
  generateCategoryImage,
}: {
  isCategoryCompatibleWithGender?: (category: {
    image: string;
    description: string;
    term: string;
    link: string;
    display_item: string;
    display_item_link: string;
    women_only?: boolean;
  }) => boolean;
  generateCategoryLink?: (categoryLink: string) => string;
  generateCategoryImage?: (category: {
    image: any;
    description?: string;
    term: any;
    link?: string;
    display_item?: string;
    display_item_link?: string;
    women_only?: boolean | undefined;
  }) => any;
}) {
  return (
    <div>
      {Object.keys(extendedCategories).map((parentCategory, index) => (
        <div key={index}>
          <h1 className="parent-category-title">{parentCategory}</h1>
          <div className="parent-category-slider">
            {Object.keys(extendedCategories[parentCategory]).map(
              (categoryKey, indexTwo) => {
                const category =
                  extendedCategories[parentCategory][categoryKey];
                return isCategoryCompatibleWithGender ? (
                  isCategoryCompatibleWithGender(category) ? (
                    <Link
                      key={indexTwo}
                      href={
                        generateCategoryLink
                          ? generateCategoryLink(category.link)
                          : category.link
                      }
                    >
                      <LoomImage
                        src={
                          generateCategoryImage
                            ? generateCategoryImage(category)
                            : category.image
                        }
                        alt=""
                      />
                      <button className="category-slider-label">
                        {category.term}
                        <ArrowIcon />
                      </button>
                    </Link>
                  ) : null
                ) : (
                  <Link key={indexTwo} href={category.link}>
                    <LoomImage src={category.image} alt="" />
                    <button className="category-slider-label">
                      {category.term}
                      <ArrowIcon />
                    </button>
                  </Link>
                );
              },
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
