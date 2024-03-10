"use client";
import { BetterDropdown } from "../BetterDropdown";
import { Chip } from "../Chip";

// todo: fetch categories
const categories = ["Music", "Sports", "Arts", "Festivals"];

export const CategoriesFilter = () => {
  // todo: change key to category.id
  return (
    <div className="flex items-stretch justify-start gap-2 flex-wrap h-full">
      {categories.map((category, index) => {
        return (
          <Chip
            key={index}
            value={category}
            paramType="categories"
            styles={{
              basic: "bg-gray-200",
              active: "bg-brandPurple text-white",
            }}
          />
        );
      })}

      <BetterDropdown
        label="More"
        options={["Business", "Gastronomy", "Christmas"]}
        paramType="categories"
      />
    </div>
  );
};
