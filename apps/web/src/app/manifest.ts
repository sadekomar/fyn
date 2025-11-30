import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Univyr",
    short_name: "Univyr",
    description: "Univyr is a platform for buying and selling products online.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#a6a2de",
    icons: [
      {
        src: "/icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      // {
      //   src: "/icons/golden-loom.jpeg",
      //   sizes: "512x512",
      //   type: "image/jpeg",
      // },
      // {
      //   src: "/icons/golden-loom.jpeg",
      //   sizes: "192x192",
      //   type: "image/jpeg",
      // },
    ],
  };
}
