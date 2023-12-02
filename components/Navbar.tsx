import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      <Link href="/link-1">Link 1</Link>
      <Link href="/link-2">Link 2</Link>
      <Link href="/link-3">Link 3</Link>
    </nav>
  );
};
