import Link from "next/link";
// components
import { Logo } from "./Logo";
import { Links } from "./banner/Links";
// icons
import { IoLogoFacebook as FacebookIcon } from "react-icons/io5";
import { IoLogoInstagram as InstagramIcon } from "react-icons/io5";
import { IoLogoTwitter as TwitterIcon } from "react-icons/io5";

const commonIconProps = {
  className: "text-3xl",
};

export const Footer = () => {
  return (
    <div className="footer pt-12 pb-8 md:p-12 bg-brandPurple text-white flex items-center justify-between flex-col-reverse gap-12 md:gap-0 md:flex-row">
      <div className="flex flex-col gap-2 align-center items-center md:block">
        <Logo />
        <p>© 2024 Eventfull Madeira</p>
      </div>
      <div className="flex justify-center items-center gap-8">
        {/* <Link href="http://google.com">
          <FacebookIcon {...commonIconProps} />
        </Link> */}
        <Link href="https://www.instagram.com/eventfull.app/">
          <InstagramIcon {...commonIconProps} />
        </Link>
        <Link href="https://x.com/eventfull.app">
          <TwitterIcon {...commonIconProps} />
        </Link>
      </div>
      <Links />
    </div>
  );
};
