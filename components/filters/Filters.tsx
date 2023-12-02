import { CategoriesFilter } from "./CategoriesFilter";
import { DateFilter } from "./DateFilter";
import { LocationFilter } from "./LocationFilter";

export const Filters = () => {
  return (
    <div className="flex align-center justify-between w-full">
      <LocationFilter />
      <CategoriesFilter />
      <DateFilter />
    </div>
  );
};
