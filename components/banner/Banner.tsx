import Image from "next/image";
// components
import { Overlay } from "../Overlay";
import { Navbar } from "./Navbar";
import { Slogan } from "./Slogan";

interface IBannerProps {
  image?: string;
  title?: string;
  categories?: string[];
}

export const homeImage =
  "https://images.unsplash.com/photo-1567351344506-b2e8a94e273b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const homeTitle = "Let your life be eventfull";


export const Banner = ({ image = homeImage, title = homeTitle, categories }: IBannerProps) => {
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
