"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

// Mock product data - can be replaced with API fetch later
const products: Record<
  string,
  {
    id: string;
    name: string;
    price: string;
    images: string[];
    sizes: string[];
    colors: { name: string; hex: string }[];
    description: string;
    returnPolicy: string;
  }
> = {
  savi: {
    id: "savi",
    name: "savi",
    price: "LE 1,800.00",
    images: [
      "/nagskin-assets/savi.jpg",
      "/nagskin-assets/savi.jpg",
      "/nagskin-assets/savi.jpg",
      "/nagskin-assets/savi.jpg",
      "/nagskin-assets/savi.jpg",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Black", hex: "#000000" }],
    description:
      "Crafted from premium Italian leather, the Savi belt features a timeless design with a signature NAGSKIN buckle. Hand-finished in Egypt with meticulous attention to detail.",
    returnPolicy:
      "We accept returns within 14 days of delivery. Items must be unworn and in original packaging. Contact us at returns@nagskin.com to initiate a return.",
  },
  magnolia: {
    id: "magnolia",
    name: "magnolia",
    price: "LE 1,900.00",
    images: [
      "/nagskin-assets/magnolia.jpg",
      "/nagskin-assets/magnolia.jpg",
      "/nagskin-assets/magnolia.jpg",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Brown", hex: "#8B4513" }],
    description:
      "The Magnolia belt combines rustic charm with modern elegance. Features an ornate buckle design and supple leather that ages beautifully over time.",
    returnPolicy:
      "We accept returns within 14 days of delivery. Items must be unworn and in original packaging. Contact us at returns@nagskin.com to initiate a return.",
  },
  liri: {
    id: "liri",
    name: "liri",
    price: "LE 2,800.00",
    images: [
      "/nagskin-assets/liri.jpg",
      "/nagskin-assets/liri.jpg",
      "/nagskin-assets/liri.jpg",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Brown", hex: "#654321" }],
    description:
      "A statement piece featuring a unique golden buckle. The Liri belt embodies understated luxury with its rich leather tone and artisan craftsmanship.",
    returnPolicy:
      "We accept returns within 14 days of delivery. Items must be unworn and in original packaging. Contact us at returns@nagskin.com to initiate a return.",
  },
  zala: {
    id: "zala",
    name: "zala",
    price: "LE 2,700.00",
    images: [
      "/nagskin-assets/zala.jpg",
      "/nagskin-assets/zala.jpg",
      "/nagskin-assets/zala.jpg",
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "Gray", hex: "#808080" }],
    description:
      "The Zala belt features a distinctive oval buckle design. Crafted for those who appreciate subtle sophistication and quality materials.",
    returnPolicy:
      "We accept returns within 14 days of delivery. Items must be unworn and in original packaging. Contact us at returns@nagskin.com to initiate a return.",
  },
};

const recommendedProducts = [
  {
    id: "tazin",
    name: "TAZIN",
    price: "LE 2,400.00",
    image: "/nagskin-assets/magnolia.jpg",
    href: "/products/magnolia",
  },
  {
    id: "liri",
    name: "LIRI",
    price: "LE 2,800.00",
    image: "/nagskin-assets/liri.jpg",
    href: "/products/liri",
  },
  {
    id: "sadeen",
    name: "SADEEN",
    price: "LE 3,200.00",
    image: "/nagskin-assets/zala.jpg",
    href: "/products/zala",
  },
  {
    id: "sinn",
    name: "SINN",
    price: "LE 3,200.00",
    image: "/nagskin-assets/savi.jpg",
    href: "/products/savi",
  },
];

// Image Gallery Component
function ImageGallery({
  images,
  productId,
}: {
  images: string[];
  productId: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <motion.div
      layoutId={`product-image-${productId}`}
      className="relative w-full bg-[#f5f1ec]"
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="relative aspect-square md:aspect-[4/5]">
        <Image
          src={images[currentIndex]}
          alt="Product image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Carousel Indicator */}
      {images.length > 1 && (
        <>
          {/* Dots for mobile */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-black" : "bg-black/30"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter for desktop */}
          <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </motion.div>
  );
}

// Size Selector Component
function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}) {
  return (
    <div className="space-y-3">
      <span className="text-sm text-gray-600">Size</span>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`w-12 h-12 border text-sm font-medium transition-colors ${
              selectedSize === size
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:border-gray-400"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

// Color Selector Component
function ColorSelector({
  colors,
  selectedColor,
  onSelect,
}: {
  colors: { name: string; hex: string }[];
  selectedColor: string;
  onSelect: (color: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Color</span>
        <span className="text-sm">{selectedColor}</span>
      </div>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onSelect(color.name)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColor === color.name
                ? "border-black scale-110"
                : "border-transparent"
            }`}
            style={{ backgroundColor: color.hex }}
            aria-label={`Select ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
}

// Quantity Selector Component
function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="flex items-center border border-gray-300 w-fit">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-10 h-10 flex items-center justify-center text-sm">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

// Accordion Component
function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left"
      >
        <span className="text-sm font-medium">{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-gray-600 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

// You May Also Like Section
function YouMayAlsoLike() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-[#f5f1ec]">
      <h2 className="font-serif text-2xl md:text-3xl mb-8">
        You may also like
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {recommendedProducts.map((product) => (
          <Link key={product.id} href={product.href} className="group">
            <div className="relative aspect-square mb-4 bg-[#e8e4df] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-sm font-medium mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Main Product Page Component
export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: productId } = use(params);
  const product = products[productId];

  const [selectedSize, setSelectedSize] = useState("XS");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name || "Black"
  );
  const [quantity, setQuantity] = useState(1);

  // Show 404-like state if product not found
  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <p className="text-gray-500">Product not found</p>
          <Link href="/" className="text-[#5e1e20] underline">
            Return to home
          </Link>
        </div>
        <Newsletter />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Product Section */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Image Gallery */}
        <ImageGallery images={product.images} productId={productId} />

        {/* Product Details */}
        <div className="px-4 py-8 md:px-10 md:py-12 lg:px-16">
          <h1 className="font-serif text-3xl md:text-4xl mb-2">
            {product.name}
          </h1>
          <p className="text-lg mb-8">{product.price}</p>

          <div className="border-t border-gray-200 pt-6 space-y-6">
            {/* Size Selector */}
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            {/* Color Selector */}
            <ColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>

          {/* Quantity & Add to Cart */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#f8e8e8] text-[#5e1e20] py-3 px-6 text-sm font-medium hover:bg-[#f0dede] transition-colors">
              <ShoppingBag className="w-4 h-4" />
              Add to cart
            </button>
          </div>

          {/* Buy it now */}
          <button className="w-full mt-4 bg-[#5e1e20] text-white py-3.5 text-sm font-medium hover:bg-[#4a1719] transition-colors">
            Buy it now
          </button>

          {/* Accordions */}
          <div className="mt-8">
            <Accordion title="Description">{product.description}</Accordion>
            <Accordion title="Return">{product.returnPolicy}</Accordion>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <YouMayAlsoLike />

      <Newsletter />
      <Footer />
    </main>
  );
}
