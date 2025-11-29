import { useState } from "react";
import { IconButton } from "@radix-ui/themes";
import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { brandsPages } from "@/data/brandsPages";

import {
  CustomMagnifyingGlassIcon,
  CartIcon,
  CustomHeartIcon,
} from "../../Icons/CustomIcons";

import "./NavigationBar.css";
import { UnivyrImage } from "@/components/clyo-image";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

function NavigationBar() {
  const currentPath = usePathname();

  function highlightSearchBar() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  let [cartCount, setCartCount] = useState(0);

  // useEffect(() => {
  //     const monitorCart = () => {
  //         const cartItems = getFromLocalStorage('cart');
  //         setCartCount(cartItems.length);
  //     };

  //     monitorCart();
  //     window.addEventListener('localStorageChanged', monitorCart);

  //     return () => {
  //         window.removeEventListener('localStorageChanged', monitorCart);
  //     };
  // }, []);

  return (
    <>
      <div className="NavBar">
        <Link href={"/"}>
          <UnivyrImage
            style={{ height: "22px", maxWidth: "none" }}
            src="/branding/loom.png"
            alt=""
          />
        </Link>

        <NavigationMenu.Root className="NavigationMenuRoot">
          <NavigationMenu.List className="NavigationMenuList">
            <NavigationMenu.Item>
              <NavigationMenu.Link className="NavigationMenuLink" asChild>
                <Link className="navmenu-trigger" href={"/"}>
                  Home
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger" asChild>
                <span>
                  <Link className="navmenu-trigger" href={"/categories"}>
                    Shop
                  </Link>
                  <ChevronDown className="CaretDown" aria-hidden />
                </span>
              </NavigationMenu.Trigger>
              {/* <NavigationMenu.Content className="NavigationMenuContent">
                <div className="mega-menu-content">
                  {Object.keys(extendedCategories).map(
                    (parentCategory, index) => (
                      <div className="mega-menu-section" key={index}>
                        <p className="mega-menu-section-title">
                          {parentCategory}
                        </p>
                        {Object.keys(extendedCategories[parentCategory]).map(
                          (categoryKey, indexTwo) => {
                            const category =
                              extendedCategories[parentCategory][categoryKey];
                            return (
                              <NavigationMenu.Item key={indexTwo}>
                                <NavigationMenu.Link>
                                  <Link
                                    className="navmenu-link"
                                    href={category.link}
                                  >
                                    {category.term}
                                  </Link>
                                </NavigationMenu.Link>
                              </NavigationMenu.Item>
                            );
                          },
                        )}
                      </div>
                    ),
                  )}
                </div>
              </NavigationMenu.Content> */}
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger" asChild>
                <span>
                  <Link className="navmenu-trigger" href={"/brands"}>
                    Brands
                  </Link>
                  <ChevronDown className="CaretDown" aria-hidden />
                </span>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <div className="mega-menu-content">
                  <div className="mega-menu-section">
                    {Object.keys(brandsPages).map((brandPage, index) => (
                      <NavigationMenu.Item
                        className="NavigationMenuItem"
                        key={index}
                      >
                        <NavigationMenu.Link>
                          <Link
                            className="navmenu-link"
                            href={brandsPages[brandPage]["link"]}
                          >
                            {brandPage}
                          </Link>
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    ))}
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="NavigationMenuTrigger" asChild>
                <span>
                  <Link className="navmenu-trigger" href={"/likes"}>
                    You
                  </Link>
                  <ChevronDown className="CaretDown" aria-hidden />
                </span>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="NavigationMenuContent">
                <div className="mega-menu-content">
                  <div className="mega-menu-section">
                    <NavigationMenu.Item>
                      <NavigationMenu.Link>
                        <Link className="navmenu-link" href={"/cart"}>
                          Cart
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link>
                        <Link className="navmenu-link" href={"/likes"}>
                          Likes
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link>
                        <Link className="navmenu-link" href={"/following"}>
                          Following
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                    <NavigationMenu.Item>
                      <NavigationMenu.Link>
                        <Link className="navmenu-link" href={"/history"}>
                          History
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link className="NavigationMenuLink" asChild>
                <Link className="navmenu-trigger" href={"/about"}>
                  About
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            {/* <NavigationMenu.Item>
                        <NavigationMenu.Link className='NavigationMenuLink' asChild>
                            <Link className='navmenu-trigger' href={'/add-items'}>Add Items</Link>
                        </NavigationMenu.Link>
                    </NavigationMenu.Item> */}

            <NavigationMenu.Indicator className="NavigationMenuIndicator">
              <div className="Arrow" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="ViewportPosition">
            <NavigationMenu.Viewport className="NavigationMenuViewport" />
          </div>
        </NavigationMenu.Root>

        <IconButton ml={"6"} className="navmenu-button" variant="ghost" asChild>
          <Link href={"/liked-items"}>
            <CustomHeartIcon />
          </Link>
        </IconButton>
        <IconButton ml={"6"} className="navmenu-button" variant="ghost" asChild>
          <Link href={"/cart"}>
            <CartIcon />
            <div className="cart-count-badge cart-count-desktop">
              {cartCount}
            </div>
          </Link>
        </IconButton>

        {currentPath === "/search" ? (
          <IconButton
            ml={"6"}
            className="navmenu-button"
            variant="ghost"
            onClick={highlightSearchBar}
          >
            <Link href={"/search"}>
              <CustomMagnifyingGlassIcon />
            </Link>
          </IconButton>
        ) : (
          <IconButton
            ml={"6"}
            className="navmenu-button"
            variant="ghost"
            asChild
          >
            <Link href={"/search"}>
              <CustomMagnifyingGlassIcon />
            </Link>
          </IconButton>
        )}
      </div>
    </>
  );
}
