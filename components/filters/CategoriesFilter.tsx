"use client";
import { BetterDropdown } from "../BetterDropdown";
import { Chip } from "../Chip";

// todo: fetch categories
const categories = ["Music", "Sports", "Arts", "Food & Drink", "Festivals"];

export const CategoriesFilter = () => {
  // todo: change key to category.id
  return (
    <div className="flex items-center justify-start gap-2 flex-wrap">
      {categories.map((category, index) => {
        return (
          <Chip
            key={index}
            value={category}
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
