"use client";
import { useState } from "react";

interface IDropdown {
  options: { value: string }[];
}

// todo: cleanup
export const Dropdown = ({ options }: IDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(options[0].value);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-start items-center rounded-md border border-2 shadow-sm pr-2 pl-1 py-2text-sm"
        >
          {value}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
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
                    setValue(event.currentTarget.textContent || "");
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
