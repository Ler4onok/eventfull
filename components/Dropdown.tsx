"use client";
import { useState, ReactNode } from "react";
// icons
import { IoIosArrowDown as ArrowDownIcon } from "react-icons/io";

export interface IDropdown {
  options: string[];
  paramType: string;
  label?: string;
  onOptionClick?: (value: string) => void;
  styles?: { button?: string; dropdown?: string };
  icon?: ReactNode;
}

// todo: cleanup
// todo: close on overlay click
export const Dropdown = ({
  options,
  label = options[0],
  onOptionClick = (value) => {},
  styles = { button: "", dropdown: "" },
  icon,
}: IDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(label);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex justify-start items-center rounded-md border pr-2 pl-1 py-2text-sm ${styles.button}`}
        >
          {icon && icon}
          {value}
          <ArrowDownIcon className="ml-1" />
        </button>
      </div>

      {isOpen && options && (
        <div
          className={`absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 ${styles.dropdown}`}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => {
              return (
                <a
                  key={index}
                  href="#"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                  role="menuitem"
                  onClick={(event) => {
                    const chosenValue = event.currentTarget.textContent || "";
                    setValue(chosenValue);
                    onOptionClick(chosenValue);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

