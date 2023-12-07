import Link from "next/link";
// components
import { Languages } from "../Languages";
import { Logo } from "../Logo";
import { Search } from "./Search";

// todo: add intl
export const Navbar = () => {
  return (
    <nav className="absolute z-20 text-white w-full flex justify-between items-center p-8">
      <Logo />
      <div className="flex items-center justify-end gap-8">
        <Search />
        <Link href="/map">Map</Link>
        <Link href="/calendar">Calendar</Link>
        <Languages />
      </div>
    </nav>
  );
};
