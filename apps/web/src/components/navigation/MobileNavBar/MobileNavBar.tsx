import Link from "next/link";
import { CustomMagnifyingGlassIcon } from "../../Icons/CustomIcons";

import { SideBar } from "./SideBar";

import "./MobileNavBar.css";
import "../../PWA.css";
import { LoomImage } from "@/components/LoomImage";
import HamburgerMenu from "./hamburger-menu";

export function MobileNavBar() {
  return (
    <>
      <div className="MobileNavBar">
        {/* <SideBar /> */}
        <HamburgerMenu />

        <Link href={"/"} className="loom-nav-icon">
          <LoomImage width={"80px"} src="/branding/loom.webp" alt="Loom logo" />
        </Link>
        <Link href={"/search"} className="search-icon">
          <CustomMagnifyingGlassIcon />
        </Link>
      </div>
    </>
  );
}
