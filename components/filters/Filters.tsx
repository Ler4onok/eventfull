// types
import { EOrientation } from "@/types/enums";
// components
import { Separator } from "../Separator";
import { CategoriesFilter } from "./CategoriesFilter";
import { DateFilter } from "./DateFilter";
import { LocationFilter } from "./LocationFilter";

export const Filters = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <LocationFilter />
      <Separator orientation={EOrientation.VERTICAL} />
      <CategoriesFilter />
      <Separator orientation={EOrientation.VERTICAL} />
      <DateFilter />
    </div>
  );
};
