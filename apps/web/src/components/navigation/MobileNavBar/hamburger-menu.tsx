"use client";

import { useState } from "react";
import { ShoppingBag, Heart, User, ChevronRight, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetSession } from "@/lib/use-auth";
import { LoomHamburger } from "@/components/Icons/CustomIcons";
import Link from "next/link";
import {
  PiPants,
  PiDress,
  PiTShirt,
  PiShirtFolded,
  PiSneaker,
  PiWatch,
  PiBaby,
  PiPercent,
  PiSparkle,
  PiPackage,
  PiCoatHanger,
  PiBarbell,
} from "react-icons/pi";

type NavigationLink = {
  type: "link";
  label: string;
  href: string;
};

type NavigationCategory = {
  type: "category";
  label: string;
  subcategories: {
    label: string;
    icon: React.ReactNode;
    href: string;
  }[];
};

export type NavigationItem = NavigationLink | NavigationCategory;

const menuItems: NavigationItem[] = [
  {
    type: "link",
    label: "Home",
    href: "/",
  },
  {
    type: "category",
    label: "Unisex",
    subcategories: [
      {
        label: "T-Shirts",
        icon: <PiTShirt className="mr-2 h-4 w-4" />,
        href: "/categories/t-shirts",
      },
      {
        label: "Jeans",
        icon: <PiPants className="mr-2 h-4 w-4" />,
        href: "/categories/jeans",
      },
      {
        label: "Pants",
        icon: <PiPants className="mr-2 h-4 w-4" />,
        href: "/categories/pants",
      },
      {
        label: "Polos",
        icon: <PiShirtFolded className="mr-2 h-4 w-4" />,
        href: "/categories/polos",
      },
      {
        label: "Linen Pants",
        icon: <PiPants className="mr-2 h-4 w-4" />,
        href: "/categories/pants?materials=linen",
      },
      {
        label: "Shirts",
        icon: <PiShirtFolded className="mr-2 h-4 w-4" />,
        href: "/categories/shirts",
      },
      {
        label: "Shoes",
        icon: <PiSneaker className="mr-2 h-4 w-4" />,
        href: "/categories/shoes",
      },
    ],
  },
  {
    type: "category",
    label: "Women",
    subcategories: [
      {
        label: "Tops",
        icon: <PiTShirt className="mr-2 h-4 w-4" />,
        href: "/categories/tops?genders=FEMALE",
      },
      {
        label: "Sets",
        icon: <PiPackage className="mr-2 h-4 w-4" />,
        href: "/categories/sets?genders=FEMALE",
      },
      {
        label: "Skirts",
        icon: <PiDress className="mr-2 h-4 w-4" />,
        href: "/categories/skirts?genders=FEMALE",
      },
      {
        label: "Dresses",
        icon: <PiDress className="mr-2 h-4 w-4" />,
        href: "/categories/dresses?genders=FEMALE",
      },
      {
        label: "Leggings",
        icon: <PiPants className="mr-2 h-4 w-4" />,
        href: "/categories/leggings?genders=FEMALE",
      },
    ],
  },
  {
    type: "category",
    label: "Men",
    subcategories: [
      {
        label: "T-Shirts",
        icon: <PiTShirt className="mr-2 h-4 w-4" />,
        href: "/categories/t-shirts?genders=MALE",
      },
      {
        label: "Shirts",
        icon: <PiShirtFolded className="mr-2 h-4 w-4" />,
        href: "/categories/shirts?genders=MALE",
      },
      {
        label: "Polos",
        icon: <PiShirtFolded className="mr-2 h-4 w-4" />,
        href: "/categories/polos?genders=MALE",
      },
      {
        label: "Pants",
        icon: <PiPants className="mr-2 h-4 w-4" />,
        href: "/categories/pants?genders=MALE",
      },
      {
        label: "Jeans",
        icon: <PiPants className="mr-2 h-4 w-4" />,
        href: "/categories/jeans?genders=MALE",
      },
    ],
  },
  {
    type: "link",
    label: "Brands",
    href: "/brands",
  },
  {
    type: "link",
    label: "Categories",
    href: "/categories",
  },
  {
    type: "link",
    label: "About",
    href: "/about",
  },
];

const menuFooter = [
  {
    label: "Cart",
    icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    href: "/cart",
  },
  {
    label: "Likes",
    icon: <Heart className="mr-2 h-4 w-4" />,
    href: "/likes",
  },
  {
    label: "My Account",
    icon: <User className="mr-2 h-4 w-4" />,
    href: "/account",
  },
];

export default function HamburgerMenu() {
  // if user is logged in show Hi name,
  const session = useGetSession();

  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="h-full p-4">
        <LoomHamburger />
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="flex flex-row items-center justify-between border-b border-gray-200">
          <SheetClose className="h-full px-4">
            <X className="h-5 w-5" />
          </SheetClose>
          <SheetTitle className="mx-4">Loom</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col overflow-y-auto">
          <nav className="flex-1 py-2">
            {menuItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100">
                {item.type === "category" ? (
                  <button
                    onClick={() => handleCategoryClick(item.label)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">
                      {item.label}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 text-gray-400 transition-all duration-300 ease-in-out ${
                        activeCategory === item.label
                          ? "rotate-90 text-gray-600"
                          : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex w-full items-center justify-start px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}

                {item.type === "category" && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeCategory === item.label
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-gray-200 bg-gray-50">
                      {item.subcategories.map((subcategory) => (
                        <Link
                          href={subcategory.href}
                          key={subcategory.label}
                          className={`flex w-full transform items-center px-6 py-2 text-left text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 ${
                            activeCategory === item.label
                              ? "translate-x-0 opacity-100"
                              : "translate-x-2 opacity-0"
                          }`}
                          onClick={() => {
                            setIsOpen(false);
                          }}
                        >
                          {subcategory.icon}
                          {subcategory.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Menu Footer */}
          <div className="flex flex-col gap-2 border-t border-gray-200 p-4">
            {menuFooter.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                onClick={() => setIsOpen(false)}
              >
                <Button variant="outline" className="w-full justify-start">
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
