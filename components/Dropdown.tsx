"use client";
import { useState } from "react";
// icons
import { IoIosArrowDown as ArrowDownIcon } from "react-icons/io";

interface IDropdown {
  options: { value: string }[];
  onOptionClick?: (value: string) => void;
  styles?: string;
}

// todo: cleanup
// todo: close on overlay click
export const Dropdown = ({
  options,
  onOptionClick = (value) => {},
  styles = "",
}: IDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(options[0].value);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex justify-start items-center rounded-md border pr-2 pl-1 py-2text-sm ${styles}`}
        >
          {value}
          <ArrowDownIcon className="ml-1" />
        </button>
      </div>

      {isOpen && options && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={(event) => {
                    const chosenValue = event.currentTarget.textContent || "";
                    setValue(chosenValue);
                    onOptionClick(chosenValue);
                    setIsOpen(false);
                  }}
                >
                  {option.value}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
