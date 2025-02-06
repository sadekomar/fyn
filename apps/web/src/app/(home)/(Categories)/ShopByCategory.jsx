import Link from "next/link";
import "./Categories.css";

export function ShopByCategory() {
  const categories = [
    {
      name: "Jeans",
      href: "/categories/jeans",
      imageBase: "https://res.cloudinary.com/dffgye7z3/image/upload/w_",
      imageName: "/v1725840213/jeans_mibzae",
    },
    {
      name: "T-Shirts",
      href: "/categories/t-shirts",
      imageBase: "https://res.cloudinary.com/dffgye7z3/image/upload/w_",
      imageName: "/v1725840213/t-shirts_dj1gu1",
    },
    {
      name: "Cargos",
      href: "/categories/cargos",
      imageBase: "https://res.cloudinary.com/dffgye7z3/image/upload/w_",
      imageName: "/v1725840213/cargos_dp32eh",
    },
    {
      name: "Shirts",
      href: "/categories/shirts",
      imageBase: "https://res.cloudinary.com/dffgye7z3/image/upload/w_",
      imageName: "/v1725840213/shirts_lgr5qn",
    },
  ];

  return (
    <div className="categories-wrapper">
      {categories.map(({ name, href, imageBase, imageName }) => (
        <Link key={name} href={href}>
          <div className="category">
            <picture>
              {/* AVIF format (best compression & quality) */}
              <source
                srcSet={`
                  ${imageBase}480/${imageName}.avif 480w,
                  ${imageBase}720/${imageName}.avif 720w,
                  ${imageBase}1080/${imageName}.avif 1080w
                `}
                type="image/avif"
              />
              {/* WebP format (modern support) */}
              <source
                srcSet={`
                  ${imageBase}480/${imageName}.webp 480w,
                  ${imageBase}720/${imageName}.webp 720w,
                  ${imageBase}1080/${imageName}.webp 1080w
                `}
                type="image/webp"
              />
              {/* Fallback JPEG/PNG */}
              <img
                src={`${imageBase}1080/${imageName}.jpg`}
                srcSet={`
                  ${imageBase}480/${imageName}.jpg 480w,
                  ${imageBase}720/${imageName}.jpg 720w,
                  ${imageBase}1080/${imageName}.jpg 1080w
                `}
                alt={`${name} category`}
                loading="lazy"
                sizes="(max-width: 600px) 480px, (max-width: 1024px) 720px, 1080px"
              />
            </picture>
            <div className="category-title-wrapper">
              <h3 className="category-title">{name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
