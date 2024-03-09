import Link from "next/link";
import { Logo } from "./Logo";
import { Links } from "./banner/Links";
import { IoLogoFacebook as FacebookIcon } from "react-icons/io5";
import { IoLogoInstagram as InstagramIcon } from "react-icons/io5";
import { IoLogoTwitter as TwitterIcon } from "react-icons/io5";

const commonIconProps = {
  className: "text-3xl",
};

// todo: change links
export const Footer = () => {
  return (
    <div className="footer px-12 py-12 bg-brandPurple text-white flex items-center justify-between">
      <div>
        <Logo />
        <p>© 2024 Eventfull Madeira</p>
      </div>
      <div className="flex justify-center items-center gap-8">
        <Link href="http://google.com">
          <FacebookIcon {...commonIconProps} />
        </Link>
        <Link href="http://google.com">
          <InstagramIcon {...commonIconProps} />
        </Link>
        <Link href="http://google.com">
          <TwitterIcon {...commonIconProps} />
        </Link>
      </div>
      <Links />
    </div>
  );
};
