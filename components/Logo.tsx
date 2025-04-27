import Link from "next/link";
import Image from "next/image";
// png
import logo from "../public/eventfull-logo-white-png-cropped.png";

// todo: change to text logo
export const Logo = () => {
  return (
    <Link href="/">
      <Image src={logo} alt="Logo" width={100}/>
    </Link>
  );
};
