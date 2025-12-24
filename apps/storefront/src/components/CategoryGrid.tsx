import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Women",
    src: "/nagskin-assets/women-gender.jpg",
    href: "/women",
  },
  {
    name: "Genderless",
    src: "/nagskin-assets/genderless-gender.jpg",
    href: "/genderless",
  },
  {
    name: "Exclusive Release",
    src: "/nagskin-assets/exclusive-release.jpg",
    href: "/exclusive",
  },
];

export function CategoryGrid() {
  return (
    <section className="flex flex-col md:flex-row gap-8 py-8 md:py-16 md:gap-4">
      {categories.map((category) => (
        <Link
          href={category.href}
          key={category.name}
          className="flex flex-col items-center gap-3 w-full group"
        >
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <Image
              src={category.src}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <span className="font-serif text-lg md:text-xl text-black">
            {category.name}
          </span>
        </Link>
      ))}
    </section>
  );
}
