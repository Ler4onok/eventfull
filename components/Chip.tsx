"use client";
import { useDropdownSelect } from "@/hooks/useDropdownSelect";
import { FormEvent } from "react";

interface ChipProps {
  value: string;
  paramType?: string;
  styles?: { basic: string; active: string };
  disabled?: boolean;
}

export const Chip = ({ value, styles, paramType, disabled }: ChipProps) => {
  const { onSelect, isActive } = useDropdownSelect({
    paramType: paramType as string,
  });

  const isActiveValue = isActive(value);

  return (
    <div
      className={`rounded-md p-2  ${
        isActiveValue ? styles?.active : styles?.basic
      } ${!disabled && "cursor-pointer"}`}
      {...(!disabled && {
        onClick: (event: FormEvent<HTMLDivElement>) => onSelect(event),
      })}
    >
      {value}
    </div>
  );
};
