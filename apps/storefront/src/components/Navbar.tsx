import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu } from "lucide-react";

export function Navbar() {
  return (
    <>
      <div className="w-full bg-[#5e1e20] text-white md:text-xs text-center h-10 flex items-center justify-center tracking-wide relative z-50">
        Shop our latest arrivals
      </div>
      <header className="sticky top-0 left-0 right-0 z-50 flex flex-col">
        <div className="relative w-full bg-white/80 backdrop-blur-md transition-all duration-300 border-b border-gray-100">
          <div className="flex h-16 items-center justify-between px-4 md:px-10">
            {/* Mobile Menu & Search (Left) */}
            <div className="flex items-center gap-4 md:hidden">
              <button className="text-black hover:text-gray-600">
                <Menu className="h-6 w-6" />
              </button>
              <button className="text-black hover:text-gray-600">
                <Search className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/" className="block">
                <Image
                  src="/nagskin-assets/LOGO_BLACK (1).png"
                  alt="NAGSKIN"
                  width={120}
                  height={30}
                  className="h-6 w-auto md:h-8"
                />
              </Link>
              <nav className="hidden md:flex items-center gap-8 text-sm">
                <a href="#" className="hover:text-maroon transition-colors">
                  Home
                </a>
                <a href="#" className="hover:text-maroon transition-colors">
                  Women
                </a>
                <a href="#" className="hover:text-maroon transition-colors">
                  Genderless
                </a>
                <a href="#" className="hover:text-maroon transition-colors">
                  Exclusive Release
                </a>
              </nav>
            </div>

            {/* Icons (Right) */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex md:items-center">
                <button className="text-black hover:text-gray-600">
                  <Search className="h-5 w-5" />
                </button>
              </div>
              <Link href="/account" className="text-black hover:text-gray-600">
                <User className="h-5 w-5" />
              </Link>
              <button className="relative text-black hover:text-gray-600">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
