import React from "react";
import { FiFilter } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";

/* ================= TYPES ================= */

type OptionType = {
  value: string;
  option: string;
};

type SelectForFilterProps = {
  handleOptionChange: (value: string) => void;
  options: OptionType[];
  optionTitle?: string;
};

/* ================= COMPONENT ================= */

const SelectForFilter: React.FC<SelectForFilterProps> = ({
  handleOptionChange,
  options,
  optionTitle,
}) => {
  return (
    <div className="relative min-w-70 cursor-pointer">
      {/* Icon */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2">
        <FiFilter className="h-6 w-6 font-semibold" />
      </span>

      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleOptionChange(e.target.value)
        }
        className="
          w-full appearance-none
          rounded-md border border-gray-200
          md:px-10 md:h-14 h-10 p-2.5 pl-10
          text-sm text-gray-700
          transition-all duration-200 ease-in-out
          hover:border-gray-300
          focus:outline-none
          focus:ring-[0.5px] focus:ring-cyan-600
          focus:border-cyan-600
          focus:bg-white
          shadow-sm
          cursor-pointer
          animate-fadeIn
        "
      >
        {options.map((a, index) => (
          <option key={index} value={a.value}>
            {optionTitle ? optionTitle : "Filter By"} {a.option}
          </option>
        ))}
      </select>

      {/* Dropdown arrow */}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <GoChevronDown className="h-6 w-6 font-semibold" />
      </span>
    </div>
  );
};

export default SelectForFilter;
