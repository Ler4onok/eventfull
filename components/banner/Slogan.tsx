import { Chip } from "../Chip";

interface ISloganProps {
  title: string;
  categories?: string[];
}

export const Slogan = ({ title, categories }: ISloganProps) => {
  return (
    <div className="absolute text-white z-10 w-full h-full flex items-center justify-center">
      <div className="relative text-center">
        <p className="text-7xl font-semibold py-8 px-4">{title}</p>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-4">
          {categories?.map((category, index) => (
            <Chip
              key={index}
              value={category}
              disabled
              styles={{
                basic: "border-[1px] border-white bg-transparent",
                active: "",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
