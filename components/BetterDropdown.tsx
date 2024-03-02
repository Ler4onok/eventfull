"use client";

import * as React from "react";
// router
import { usePathname, useSearchParams, useRouter } from "next/navigation";

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

export const BetterDropdown = ({
  options,
  icon,
  paramType,
  label: customLabel,
}: Pick<IDropdown, "label" | "options" | "icon" | "paramType">) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryParams = new URLSearchParams(searchParams);
  const categories = queryParams.getAll(paramType);
  let params = categories.length === 0 ? [] : categories.toString().split(",");

  // todo: DRY DRY DRY
  const onSelect = (event: React.FormEvent<HTMLDivElement>) => {
    const category = event.currentTarget.textContent as string;

    if (params.includes(category)) {
      params = params.filter((param) => param !== category);
      params.length === 0
        ? queryParams.delete(paramType)
        : queryParams.set(paramType, params.join(","));
      return router.push(`${pathname}?${queryParams.toString()}`, {
        scroll: false,
      });
    }

    queryParams.set(paramType, [...params, category].join(","));
    router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  const isActive = (value: string): boolean => {
    return params.includes(value);
  };

  const dropdownLabelCategories = params
    .filter((param) => options.includes(param))
    .join(", ");

  const label = dropdownLabelCategories
    ? dropdownLabelCategories?.length > 16
      ? dropdownLabelCategories?.slice(0, 16) + "..."
      : dropdownLabelCategories
    : customLabel;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <button
            type="button"
            className={`flex justify-start items-center rounded-md border pr-2 pl-1 py-2text-sm`}
          >
            {icon && icon}
            {label}
            <ArrowDownIcon className="ml-1" />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
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
