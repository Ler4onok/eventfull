"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

interface ChipProps {
  value: string;
  styles?: { basic: string; active: string };
}

export const Chip = ({ value, styles }: ChipProps) => {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const onSelect = (event: FormEvent<HTMLDivElement>) => {
    const queryParams = new URLSearchParams(searchParams);

    const categories = queryParams.getAll("categories");
    let params = categories.length === 0 ? [] : categories.toString().split(",");
    const category = event.currentTarget.textContent as string;

    if (params.includes(category)) {
      params = params.filter((param) => param !== category);
      params.length === 0 ? queryParams.delete("categories") : queryParams.set("categories", params.join(","));
      return router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });
    }

    queryParams.set("categories", [...params, category].join(","));
    router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  return (
    <div
      className={`rounded-md bg-gray-200 p-2 cursor-pointer ${
        active ? styles?.active : styles?.basic
      }`}
      onClick={(event) => {
        onSelect(event);
        setActive((prev) => !prev);
      }}
    >
      {value}
    </div>
  );
};
