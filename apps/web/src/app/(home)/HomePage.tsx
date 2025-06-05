"use client";
import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { clientHttp } from "@/lib/queries/http.service";
import { ItemCardsI } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Brands } from "./(components)/brands";
import { CategoriesComponent } from "../categories/categories-component";

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
        `/items?brands=daddysgirl&sort_by=date-descending`,
      ),
  });
  const { data: pants } = useQuery({
    queryKey: ["home-pants"],
    queryFn: () => clientHttp.get<ItemCardsI[]>(`/items?categories=pants`),
  });
  const { data: sets } = useQuery({
    queryKey: ["home-sets"],
    queryFn: () => clientHttp.get<ItemCardsI[]>(`/items?categories=sets`),
  });
  const { data: jeans } = useQuery({
    queryKey: ["home-jeans"],
    queryFn: () => clientHttp.get<ItemCardsI[]>(`/items?categories=jeans`),
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

      <CategoriesComponent />
    </>
  );
}
