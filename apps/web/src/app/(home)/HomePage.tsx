"use client";

import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { clientHttp } from "@/lib/queries/http.service";
import { ItemCardsI } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Brands } from "./(components)/brands";
import { CategoriesComponent } from "../categories/categories-component";
import { config } from "./utils";
import Link from "next/link";
import { LoomImage } from "@/components/LoomImage";
import { Endpoints } from "@/api/endpoints";
import { ReadCategoriesResponse } from "../categories/[category]/(utils)/category-types";
// import { OnSaleCard } from "../item/[id]/item";
import { getIdQuery } from "../(utils)/utils";
import { getCurrentUser } from "@/lib/auth";
import { HScrollerPlaceholder } from "@/layouts/HorizontalScroller/HScrollerPlaceholder";

export function ClientHomePage() {
  // miscellaneous
  const { data: newItems = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["home-items"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?limit=20&sort_by=date-descending&in-stock=true`,
      ),
  });
  const { data: brandOfTheDay = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["brand-of-the-day", config.brandOfTheDay.value],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=${config.brandOfTheDay.value}&limit=20&sort_by=date-descending&in_stock=true`,
      ),
    enabled: !!config.brandOfTheDay.value,
  });
  const { data: popularCategories } = useQuery({
    queryKey: ["popular-categories"],
    queryFn: () =>
      clientHttp.get<ReadCategoriesResponse>(Endpoints.PopularCategories),
  });
  const { data: moreCategories } = useQuery({
    queryKey: ["more-categories"],
    queryFn: () =>
      clientHttp.get<ReadCategoriesResponse>(Endpoints.MoreCategories),
  });
  // const { data: onSaleItems } = useQuery({
  //   queryKey: ["on-sale-items"],
  //   queryFn: () => clientHttp.get<OnSaleCard[]>(Endpoints.ItemsOnSale),
  // });
  const { data: recentlyViewedItems, isLoading } = useQuery({
    queryKey: ["recently-viewed-items"],
    queryFn: async () => {
      const { id, type } = await getCurrentUser();
      if (!id || !type) {
        return [];
      }
      return clientHttp.get<ItemCardsI[]>(
        `${Endpoints.ItemViews}?type=${type}&${getIdQuery(id, type)}&limit=10`,
      );
    },
  });

  // categories
  const { data: tops } = useQuery<ItemCardsI[]>({
    queryKey: ["home-tops"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?categories=tops&limit=20&sort_by=date-descending&in_stock=true`,
      ),
  });
  const { data: sets = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["home-sets"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?categories=sets&limit=20&sort_by=date-descending&in_stock=true`,
      ),
  });

  // materials
  const { data: linens } = useQuery<ItemCardsI[]>({
    queryKey: ["linens"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?materials=linen&limit=20&sort_by=date-descending&in_stock=true`,
      ),
  });

  // colors
  const { data: yellow = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["home-yellow"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?colors=yellow&limit=20&sort_by=date-descending&in_stock=true`,
      ),
  });

  // brands
  const { data: kloth = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["kloth"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=kloth&limit=20&sort_by=date-descending&in_stock=true`,
      ),
  });
  const { data: locken = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["locken"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=locken&limit=20&sort_by=date-descending&in_stock=true`,
      ),
  });
  const { data: secret = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["secret"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=secret&limit=20&sort_by=date-descending&in_stock=true`,
      ),
  });

  // how many sections do i need to have
  // 14 sections
  /**
   * 14 sections
   *
   * recommendations
   * brand
   * stories weekly
   * recently viewed
   *
   * on-sale
   * get the look
   * outfit inspiration (different styles)
   * brand
   *
   * boards
   * brand
   * category: tops
   * collections and new styles
   * material: linen
   *
   */

  /**
   * 14 sections
   * loom sections
   *
   * new on loom
   * popular categories
   * on sale
   * brand
   *
   * recently viewed
   * brand
   * category: tops
   * material: linen
   *
   * category: sets
   * brand
   * color: butter yellow
   * more categories
   *
   */

  return (
    <>
      <Brands />

      <section className="mb-10 flex flex-col gap-4 bg-gray-200 py-8">
        <div className="rounded-b-[20px] px-4">
          <h2 className="text-2xl font-bold">New on Loom</h2>
          <p>Hundreds of new items added every day.</p>
        </div>
        <HorizontalScroller items={newItems} />
      </section>

      <PopularCategories categories={popularCategories ?? []} />

      {/* <section className="flex flex-col gap-4 bg-gray-200 py-8">
        <div className="rounded-b-[20px] px-4">
          <h2 className="text-2xl font-bold">On Sale</h2>
          <p>Snag them up before they're gone.</p>
        </div>
        <HorizontalScroller items={onSaleItems ?? []} />
      </section> */}

      <BrandSection
        cover={"/secret-cover.jpg"}
        logo={"/secret-logo.png"}
        description="Since 2015, Secret has blended elegance with simplicity, offering timeless, high-quality pieces."
        theme="dark"
        primaryColor="#515151"
        secondaryColor="#343434"
        brand="secret"
        items={secret}
      />

      {recentlyViewedItems && recentlyViewedItems.length > 0 && (
        <section className="flex flex-col gap-4 bg-gray-200 py-8">
          <div className="rounded-b-[20px] px-4">
            <h2 className="text-2xl font-bold">Pick up where you left off</h2>
            <p>Recently viewed items.</p>
          </div>
          {isLoading ? (
            <HScrollerPlaceholder />
          ) : (
            <HorizontalScroller items={recentlyViewedItems} />
          )}
        </section>
      )}

      <PopularCategories categories={moreCategories ?? []} />

      <BrandSection
        cover={"/locken-cover.png"}
        logo={"/locken-logo.png"}
        description="Curly, Straight, Wavy, Long, Short, <br />
        whichever it is, LOCKEN IS FOR YOU!"
        theme="dark"
        primaryColor="#B1B7FF"
        secondaryColor="#5E65BA"
        brand="locken"
        items={locken}
      />

      <div className="h-10" />

      <CategorySection
        cover={"/tops-cover.webp"}
        description="Light, breezy, and effortlessly chic—tops made for warm days and cool nights"
        theme="dark"
        primaryColor="#2173A6"
        secondaryColor="#16435E"
        category="Tops"
        items={tops ?? []}
      />

      <div className="h-10" />

      <CategorySection
        cover={"/linens-cover.webp"}
        description="Stay cool with breezy linen essentials for effortless style."
        theme="light"
        primaryColor="#F5F3EA"
        secondaryColor="#C8D1C2"
        category="Linens"
        items={linens ?? []}
      />

      <div className="h-10" />

      <CategorySection
        cover={"/categories/sets.webp"}
        description="Complete outfits that make a statement"
        theme="light"
        primaryColor="#fff"
        secondaryColor="#f0f0f0"
        category="Sets"
        items={sets ?? []}
      />

      <div className="h-10" />

      {brandOfTheDay && brandOfTheDay.length > 0 && (
        <>
          <section className="flex flex-col gap-4 bg-gray-200 py-8">
            <div className="rounded-b-[20px] px-4">
              <Link href={`/brands/${config.brandOfTheDay.value}`}>
                <h2 className="text-2xl font-bold">
                  {config.brandOfTheDay.label}
                </h2>
              </Link>
              <p>New arrivals from {config.brandOfTheDay.label}.</p>
            </div>
            <HorizontalScroller items={brandOfTheDay} />
          </section>
          <div className="h-10" />
        </>
      )}

      <CategorySection
        cover={"/yellow-cover.webp"}
        description="Step into sunshine with our Butter Yellow picks"
        theme="light"
        primaryColor="#FFF8E1"
        secondaryColor="#FFE082"
        category="Butter Yellow"
        items={yellow ?? []}
      />

      <div className="h-10" />

      <BrandSection
        cover={"/kloth-cover.webp"}
        logo={"/kloth-logo.png"}
        description="Experience exceptional craftsmanship, luxurious fabrics with KLOTH."
        theme="light"
        primaryColor="#e6e6e6"
        secondaryColor="#cccccc"
        brand="kloth"
        items={kloth}
      />
    </>
  );
}
function PopularCategories({
  categories,
}: {
  categories: ReadCategoriesResponse;
}) {
  return (
    <section className="mx-4 my-10 grid grid-cols-4 gap-2">
      {categories?.map((category) => (
        <Link
          href={`/categories/${category.slug}`}
          key={category.id}
          className="flex flex-col items-center gap-2"
        >
          <div className="aspect-square w-full rounded-lg bg-gray-200 transition-all duration-300 active:scale-90">
            <LoomImage
              key={category.id}
              src={category.womenImage || category.kidsImage || ""}
              alt={category.name}
              className="aspect-square h-full w-full rounded-lg object-cover"
            />
          </div>
          <p>{category.label ?? category.name}</p>
        </Link>
      ))}
    </section>
  );
}

function BrandSection({
  cover,
  logo,
  brand,
  description,
  theme,
  primaryColor,
  secondaryColor,
  items,
}: {
  cover: string;
  logo: string;
  brand: string;
  description: string;
  theme: "dark" | "light";
  primaryColor: string;
  secondaryColor: string;
  items: ItemCardsI[];
}) {
  return (
    <section
      className={`flex flex-col gap-8 pb-8`}
      style={{ backgroundColor: secondaryColor }}
    >
      <div
        className={`flex flex-col gap-6 rounded-b-[32px] p-7 pb-8`}
        style={{ backgroundColor: primaryColor }}
      >
        <LoomImage
          src={cover}
          className="h-[150px] w-full rounded-[28px]"
          alt={logo}
        />
        <div className="flex flex-col items-center gap-4">
          <Link href={`/brands/${brand}`}>
            <LoomImage
              src={logo}
              alt={logo}
              className="min-h-[30px]"
              width={198}
            />
          </Link>
          <p
            className={`text-center tracking-[-0.02em] ${theme === "dark" ? "text-white" : "text-black"}`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
      <HorizontalScroller items={items} theme={theme} />
    </section>
  );
}

function CategorySection({
  cover,
  category,
  description,
  theme,
  primaryColor,
  secondaryColor,
  items,
}: {
  cover: string;
  category: string;
  description: string;
  theme: "dark" | "light";
  primaryColor: string;
  secondaryColor: string;
  items: ItemCardsI[];
}) {
  return (
    <section
      className={`flex flex-col gap-8 pb-8`}
      style={{ backgroundColor: secondaryColor }}
    >
      <div
        className={`flex flex-col gap-6 rounded-b-[32px] p-7 pb-8`}
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex flex-col gap-2">
          <h2
            className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            {category}
          </h2>
          <p
            className={`tracking-[-0.02em] ${theme === "dark" ? "text-white" : "text-black"}`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        <LoomImage
          src={cover}
          className="h-[150px] w-full rounded-[28px]"
          alt={category}
        />
      </div>
      <HorizontalScroller items={items} theme={theme} />
    </section>
  );
}
