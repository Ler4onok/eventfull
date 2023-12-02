import { Overlay } from "../Overlay";
import { Navbar } from "./Navbar";
import { Slogan } from "./Slogan";

export const Banner = () => {
  return (
    <div className="w-full h-[32rem]">
      <div className="banner relative w-full h-full bg-bottom bg-cover">
        <Navbar />
        <Slogan />
        <Overlay />
      </div>
    </div>
  );
};
