"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// icons
import { IoIosArrowDown as ArrowDownIcon } from "react-icons/io";
// types
import { IDropdown } from "./Dropdown";
import { useDropdownSelect } from "@/hooks/useDropdownSelect";

export const BetterDropdown = ({
  options,
  icon,
  paramType,
  label: customLabel,
  styles,
}: // todo: pick to smth more
Pick<IDropdown, "label" | "options" | "icon" | "paramType" | "styles">) => {
  const { onSelect, isActive, label } = useDropdownSelect({
    paramType,
    options,
    customLabel,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <button
            type="button"
            className={`flex justify-start items-center h-full rounded-md border px-2 py-2text-sm hover:bg-gray-100 ${styles?.button}`}
          >
            {icon && icon}
            {label}
            <ArrowDownIcon className="ml-1" />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-[200px] overflow-auto">
        {options.map((option, index) => {
          return (
            <DropdownMenuCheckboxItem
              key={index}
              checked={isActive(option)}
              onClick={(event) => {
                event.preventDefault();
                onSelect(event);
              }}
            >
              {option}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
