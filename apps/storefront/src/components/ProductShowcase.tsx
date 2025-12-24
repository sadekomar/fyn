import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "SAVI",
    price: "LE 1,800.00",
    image: "/nagskin-assets/savi.jpg",
  },
  {
    id: 2,
    name: "MAGNOLIA",
    price: "LE 1,900.00",
    image: "/nagskin-assets/magnolia.jpg",
  },
  {
    id: 3,
    name: "LIRI",
    price: "LE 2,800.00",
    image: "/nagskin-assets/liri.jpg",
  },
  {
    id: 4,
    name: "ZALA",
    price: "LE 2,700.00",
    image: "/nagskin-assets/zala.jpg",
  },
];

export function ProductShowcase() {
  return (
    <>
      <section className="py-12 px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl">
            Hot Right Now
          </h2>
          <a href="#" className="text-sm hover:text-maroon transition-colors">
            Discover
          </a>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {products.map((product) => (
            <a
              key={product.name}
              href="#"
              className="group flex-shrink-0 gap-0"
            >
              <div className="relative h-[294px] w-[235px] mb-4 bg-beige overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-medium mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.price}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
