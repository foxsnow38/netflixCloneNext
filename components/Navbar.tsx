import React from "react";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";

import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
const TOP_OFFSET = 66;

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);
  const [showBackground, setShowBackground] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.screenY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = React.useCallback(() => {
    setShowAccountMenu((prev) => !prev);
  }, []);

  const toggleMobileMenu = React.useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`
          px-4
          md:px-16
          py-6
          flex
          flex-row
          transition
          items-center
          justify-center
          duration-500
          ${showBackground ? "bg-zinc-900/90" : ""}           
          `}
      >
        <img src=" /images/logo.png" className="h-4 lg:h-7 " alt="logo" />
        <div
          className="
        flex-row
        ml-8
        gap-7
        hidden
        lg:flex"
        >
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="News & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={() => toggleMobileMenu()}
          className=" lg:hidden  flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm  ">Browse</p>
          <BsChevronDown className="text-white transition " size={18} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className=" flex flex-row ml-auto items-center gap-7 ">
          <div className=" text-gray-200 hover:text-gray-300  cursor-pointer transition ">
            <BsSearch size={20} />
          </div>
          <div className=" text-gray-200 hover:text-gray-300  cursor-pointer transition ">
            <BsBell size={20} />
          </div>
          <div
            className="flex-row items-center   gap-2 cursor-pointer   flex relative  "
            onClick={() => toggleAccountMenu()}
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden ">
              <img src="/images/default-blue.png" alt="profile" />
            </div>
            <BsChevronDown className="text-white transition " size={18} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
