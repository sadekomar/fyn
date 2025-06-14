import { CategoriesComponent } from "./categories-component";

export const metadata = {
  title: "All Categories - Loom",
  description:
    "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  robots:
    "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  keywords: "Loom Cairo, Local Brands, Fashion Brands, Egyptian Local Brands",
  openGraph: {
    title: "All Categories - Loom",
    description:
      "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "All Categories - Loom",
    description:
      "Find everything you need on Loom Cairo. Shop more than 17000 items in Cairo, Alexandria, Egypt. Shop now and explore the largest selection of local fashion brands.",
  },
};

export default async function AllCategoriesPage(props: { searchParams?: any }) {
  const searchParams = await props.searchParams;
  if (searchParams) {
    console.log(searchParams.gender);
  } else {
    console.log("not available");
  }

  function generateCategoryLink(categoryLink: string) {
    let genderParam;
    const noGenderSpecified = !searchParams.gender;
    if (noGenderSpecified) {
      return categoryLink;
    }
    if (categoryLink.includes("?")) {
      genderParam = `&genders=${searchParams.gender}`;
    } else {
      genderParam = `?genders=${searchParams.gender}`;
    }
    return categoryLink + genderParam;
  }

  function generateCategoryImage(category: {
    image: any;
    description?: string;
    term: any;
    link?: string;
    display_item?: string;
    display_item_link?: string;
    women_only?: boolean | undefined;
  }) {
    let genderParam;
    const noGenderSpecified = !searchParams.gender;
    if (noGenderSpecified) {
      return category.image;
    }
    if (searchParams.gender == "men,unisex") {
      return `/categories/${category.term}-men.webp`;
    }
    if (searchParams.gender === "women,unisex") {
      return `/categories/${category.term}-women.webp`;
    }
  }

  function isCategoryCompatibleWithGender(category: {
    image: string;
    description: string;
    term: string;
    link: string;
    display_item: string;
    display_item_link: string;
    women_only?: boolean;
  }) {
    const userInMenCategories = searchParams.genders == "men,unisex";

    if ("women_only" in category && userInMenCategories) {
      return false;
    }
    return true;
  }

  return (
    <>
      <CategoriesComponent
        isCategoryCompatibleWithGender={isCategoryCompatibleWithGender}
        generateCategoryLink={generateCategoryLink}
        generateCategoryImage={generateCategoryImage}
      />
    </>
  );
}
