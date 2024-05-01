"use client";
import { BetterDropdown } from "../BetterDropdown";
import { Chip } from "../Chip";

// todo: change key to category.id
export const CategoriesFilter = ({categories}: {categories: string[]}) => {
  const chipsCategories = ['Music', 'Sports', 'Gastronomy', 'Parade']
  const dropdownCategories = categories.filter((category) => !chipsCategories.includes(category));
  return (
    <div className="flex items-stretch justify-start gap-2 flex-wrap h-full">
      {chipsCategories.map((category, index) => {
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
        options={dropdownCategories}
        paramType="categories"
      />
    </div>
  );
};
