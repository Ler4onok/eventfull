import Image from "next/image";
// components
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
    <div className="relative w-full h-[32rem]">
      <Image
        src={image}
        alt=""
        layout="fill"
        objectFit="cover"
        className="banner relative w-full h-full bg-bottom bg-cover"
        objectPosition="bottom"
        // todo: compress images on server
        // blurDataURL={image}
        // placeholder="blur"
        priority
      />
      <Navbar />
      <Slogan title={title} categories={categories} />
      <Overlay />
    </div>
  );
};
