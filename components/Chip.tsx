"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

interface ChipProps {
  value: string;
  styles?: { basic: string; active: string };
}

export const Chip = ({ value, styles }: ChipProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryParams = new URLSearchParams(searchParams);
  const categories = queryParams.getAll("categories");
  let params = categories.length === 0 ? [] : categories.toString().split(",");

  const onSelect = (event: FormEvent<HTMLDivElement>) => {
    const category = event.currentTarget.textContent as string;

    if (params.includes(category)) {
      params = params.filter((param) => param !== category);
      params.length === 0
        ? queryParams.delete("categories")
        : queryParams.set("categories", params.join(","));
      return router.push(`${pathname}?${queryParams.toString()}`, {
        scroll: false,
      });
    }

    queryParams.set("categories", [...params, category].join(","));
    router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  const isActive = (value: string): boolean => {
    return params.includes(value);
  };

  const isActiveValue = isActive(value);

  return (
    <div
      className={`rounded-md p-2 cursor-pointer ${
        isActiveValue ? styles?.active : styles?.basic
      }`}
      onClick={(event) => {
        onSelect(event);
      }}
    >
      {value}
    </div>
  );
};
