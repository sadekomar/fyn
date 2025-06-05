"use client";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { clientHttp } from "@/lib/queries/http.service";
import { ItemCardsI } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Brands } from "./(components)/brands";
import { CategoriesComponent } from "../categories/categories-component";
import { conifg } from "./utils";

export function ClientHomePage() {
  const { data: newItems } = useQuery({
    queryKey: ["home-items"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?limit=20&sort_by=popularity-descending`,
      ),
  });
  const { data: brand } = useQuery({
    queryKey: ["home-daddys-girl"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=daddysgirl&sort_by=date-descending&limit=20`,
      ),
  });
  const { data: pants } = useQuery({
    queryKey: ["home-pants"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(`/items?categories=pants&limit=20`),
  });
  const { data: sets } = useQuery({
    queryKey: ["home-sets"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(`/items?categories=sets&limit=20`),
  });
  const { data: jeans } = useQuery({
    queryKey: ["home-jeans"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(`/items?categories=jeans&limit=20`),
  });
  const { data: brandOfTheDay } = useQuery({
    queryKey: ["brand-of-the-day", conifg.brandOfTheDay.value],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=${conifg.brandOfTheDay.value}&limit=20&sort_by=date-descending`,
      ),
  });

  return (
    <>
      <Brands />

      <section className="flex flex-col gap-4 mt-10">
        <h1 className="text-2xl font-bold md:mx-20 mx-4">New on loom</h1>
        <HorizontalScroller items={newItems ?? []} />
      </section>

      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold md:mx-20 mx-4">
          New from Daddy's Girl{" "}
        </h1>
        <HorizontalScroller items={brand ?? []} />
      </section>

      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold md:mx-20 mx-4">Pants</h1>
        <HorizontalScroller items={pants ?? []} />
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold md:mx-20 mx-4">Sets</h1>
        <HorizontalScroller items={sets ?? []} />
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold md:mx-20 mx-4">Jeans</h1>
        <HorizontalScroller items={jeans ?? []} />
      </section>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold md:mx-20 mx-4">
          {conifg.brandOfTheDay.label}
        </h1>
        <HorizontalScroller items={brandOfTheDay ?? []} />
      </section>

      <CategoriesComponent />
    </>
  );
}
