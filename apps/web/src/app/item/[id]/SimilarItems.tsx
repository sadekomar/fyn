import { HorizontalScroller } from "@/layouts/HorizontalScroller/HorizontalScroller";
import Link from "next/link";
import { ItemCardsI } from "@/lib/types";
import { serverHttp } from "@/lib/queries/http.service";

export async function SimilarItems({
  category,
  color,
  gender,
}: {
  category: string;
  color: string;
  gender: string;
}) {
  console.log(category, color, gender);
  const data: ItemCardsI[] = await serverHttp.get(
    `/items?categories=${category}&colors=${color}&limit=20&gender=${gender}`,
  );
  if (data.length === 0) {
    return null;
  }

  return (
    <div className="gray-section-wrapper">
      <div className="h-scroller-title">
        <h2 className="scroller-text">
          More from{" "}
          <Link
            className="brand-link"
            href={`/categories/${category}?colors=${color}`}
          >
            {color} {category}
          </Link>
        </h2>
      </div>
      <HorizontalScroller items={data}></HorizontalScroller>
    </div>
  );
}
