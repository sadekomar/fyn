import Link from "next/link";
import { CustomMagnifyingGlassIcon } from "../../Icons/CustomIcons";

import { SideBar } from "./SideBar";

import "./MobileNavBar.css";
import "../../PWA.css";
import { ClyoImage } from "@/components/clyo-image";
import HamburgerMenu from "./hamburger-menu";

export function MobileNavBar() {
  return (
    <>
      <div className="MobileNavBar">
        {/* <SideBar /> */}
        <HamburgerMenu />

        <Link
          href={"/"}
          className="loom-nav-icon text-2xl font-bold text-white"
        >
          Clyo
        </Link>
        <Link href={"/search"} className="search-icon">
          <CustomMagnifyingGlassIcon />
        </Link>
      </div>
    </>
  );
}
