import Link from "next/link";
import { Logo } from "./Logo";
import { Section } from "./Section";
import { Links } from "./banner/Links";

export const Footer = () => {
  return (
    <div className="px-12 py-6 bg-brandPurple text-white flex  items-center justify-between">
      <div>
        <Logo />
        <p>© 2024 Eventfull</p>
      </div>
      <div>icons</div>
      <Links />
    </div>
  );
};
