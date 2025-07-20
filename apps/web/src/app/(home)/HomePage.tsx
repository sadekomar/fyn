"use client";

import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import { clientHttp } from "@/lib/queries/http.service";
import { ItemCardsI } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Brands } from "./(components)/brands";
import { CategoriesComponent } from "../categories/categories-component";
import { conifg } from "./utils";
import Link from "next/link";

export function ClientHomePage() {
  const { data: newItems = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["home-items"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(`/items?limit=20&sort_by=date-descending`),
  });
  const { data: pants = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["home-pants"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?categories=pants&limit=20&sort_by=date-descending`,
      ),
  });
  const { data: sets = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["home-sets"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?categories=sets&limit=20&sort_by=date-descending`,
      ),
  });
  const { data: jeans = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["home-jeans"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?categories=jeans&limit=20&sort_by=date-descending`,
      ),
  });
  const { data: brandOfTheDay = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["brand-of-the-day", conifg.brandOfTheDay.value],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=${conifg.brandOfTheDay.value}&limit=20&sort_by=date-descending`,
      ),
  });
  const { data: capsule = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["capsule"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=capsule&limit=20&sort_by=date-descending`,
      ),
  });
  const { data: locken = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["locken"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=locken&limit=20&sort_by=date-descending`,
      ),
  });
  const { data: niffty = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["niffty"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=niffty&limit=20&sort_by=date-descending`,
      ),
  });
  const { data: myMayz = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["mymayz"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=mymayz&limit=20&sort_by=date-descending`,
      ),
  });
  const { data: pulp = [] } = useQuery<ItemCardsI[]>({
    queryKey: ["pulp"],
    queryFn: () =>
      clientHttp.get<ItemCardsI[]>(
        `/items?brands=pulp&limit=20&sort_by=date-descending`,
      ),
  });

  return (
    <>
      <Brands />

      <section className="mt-10 flex flex-col">
        <div className="h-scroller-title">
          <h3>New on Loom</h3>
        </div>
        <HorizontalScroller items={newItems} />
      </section>

      <section>
        <div className="h-scroller-title">
          <h3>
            New from{" "}
            <Link href={`/brands/capsule`} className="brand-link">
              Capsule
            </Link>
          </h3>
        </div>
        <HorizontalScroller items={capsule} />
      </section>

      <section>
        <div className="h-scroller-title">
          <h3>
            New from{" "}
            <Link href={`/brands/locken`} className="brand-link">
              Locken
            </Link>
          </h3>
        </div>
        <HorizontalScroller items={locken} />
      </section>

      <section>
        <div className="h-scroller-title">
          <h3>
            New from{" "}
            <Link href={`/brands/niffty`} className="brand-link">
              Niffty
            </Link>
          </h3>
        </div>
        <HorizontalScroller items={niffty} />
      </section>

      <section>
        <div className="h-scroller-title">
          <h3>
            New from{" "}
            <Link href={`/brands/mymayz`} className="brand-link">
              myMayz
            </Link>
          </h3>
        </div>
        <HorizontalScroller items={myMayz} />
      </section>

      <section>
        <div className="h-scroller-title">
          <h3>
            New from{" "}
            <Link href={`/brands/pulp`} className="brand-link">
              Pulp
            </Link>
          </h3>
        </div>
        <HorizontalScroller items={pulp} />
      </section>

      <section className="flex flex-col">
        <div className="h-scroller-title">
          <h3>Pants</h3>
        </div>
        <HorizontalScroller items={pants} />
      </section>
      <section className="flex flex-col">
        <div className="h-scroller-title">
          <h3>Sets</h3>
        </div>
        <HorizontalScroller items={sets} />
      </section>
      <section className="flex flex-col">
        <div className="h-scroller-title">
          <h3>Jeans</h3>
        </div>
        <HorizontalScroller items={jeans} />
      </section>

      {brandOfTheDay.length > 0 && (
        <section className="flex flex-col">
          <div className="h-scroller-title">
            <h3>{conifg.brandOfTheDay.label}</h3>
          </div>
          <HorizontalScroller items={brandOfTheDay ?? []} />
        </section>
      )}

      <CategoriesComponent />
    </>
  );
}
