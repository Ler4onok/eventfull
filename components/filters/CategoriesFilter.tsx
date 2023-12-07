"use client";
import { Chip } from "../Chip";
import { Dropdown } from "../Dropdown";

const categories = [
  "All",
  "Music",
  "Sports",
  "Arts",
  "Food & Drink",
  "Festivals",
];

export const CategoriesFilter = () => {
  // todo: change key to category.id
  return (
    <>
      {categories.map((category, index) => {
        return (
          <Chip
            key={index}
            value={category}
            styles={{ basic: "bg-gray-200", active: "bg-gray-500 text-white" }}
          />
        );
      })}
      <Dropdown
        label="More"
        options={[{ value: "Business" }, { value: "Gastronomy" }]}
      />
    </>
  );
};
