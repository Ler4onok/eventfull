"use client";
import { useState } from "react";

interface ChipProps {
  value: string;
  styles?: { basic: string; active: string };
}

export const Chip = ({ value, styles }: ChipProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`rounded-md bg-gray-200 p-2 cursor-pointer ${
        active ? styles?.active : styles?.basic
      }`}
      onClick={() => setActive(!active)}
    >
      {value}
    </div>
  );
};
