import Image from "next/image";
import Link from "next/link";
import { Languages } from "./Languages";

export const Navbar = () => {
  return (
    <nav className="w-full h-20 px-10 flex items-center justify-start gap-12 bg-white shadow">
      <Link href="/">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/6608/6608901.png"
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>
      <Link href="/events">Events</Link>
      <Link href="/calendar">Calendar</Link>
      <Link href="/map">Map</Link>
      <Languages />
    </nav>
  );
};
