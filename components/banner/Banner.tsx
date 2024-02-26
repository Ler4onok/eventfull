import { Overlay } from "../Overlay";
import { Navbar } from "./Navbar";
import { Slogan } from "./Slogan";

interface IBannerProps {
  image: string;
  title: string;
  categories?: string[];
}

export const Banner = ({ image, title, categories }: IBannerProps) => {
  return (
    <div className="w-full h-[32rem]">
      <div
        className="banner relative w-full h-full bg-bottom bg-cover"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <Navbar />
        <Slogan title={title} categories={categories}/>
        <Overlay />
      </div>
    </div>
  );
};
