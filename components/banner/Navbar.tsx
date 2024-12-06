// components
import { Logo } from "../Logo";
import { Search } from "./Search";
import { Links } from "./Links";

// todo: add intl
export const Navbar = () => {
  return (
    <nav className="absolute z-20 text-white w-full flex justify-between items-center p-8">
      <Logo />
      <div className="flex items-center justify-end gap-8">
        <Search />
        <Links />
        {/* todo: add support of pt lang */}
        {/* <Languages /> */}
      </div>
    </nav>
  );
};
