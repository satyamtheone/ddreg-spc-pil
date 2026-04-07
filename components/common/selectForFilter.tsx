import React from "react";
import { FiFilter } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";


type OptionType = {
  value: string;
  option: string;
};

type SelectForFilterProps = {
  handleOptionChange: (value: string) => void;
  options: OptionType[];
  optionTitle?: string;
  label: string;
};

const SelectForFilter: React.FC<SelectForFilterProps> = ({
  handleOptionChange,
  options,
  optionTitle,
  label,
}) => {
  return (
    <div className="relative min-w-70 cursor-pointer animate-dialog-slide-down">
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
          rounded-md border 
          md:px-10 md:h-14 h-10 p-2.5 pl-10
          text-sm 
          transition-all duration-200 ease-in-out
          hover:border-gray-300
          focus:outline-none
          focus:ring-[0.5px] focus:ring-cyan-600
          focus:border-cyan-800
          hover:shadow-md
          shadow-sm
          cursor-pointer
        "
      >
        <option
          value={""}
          hidden
          style={{
            color: "grey",
          }}
        >
          {label}
        </option>
        {options.map((a, index) => (
          <option
            key={index}
            value={a.value}
            style={{
              color: "black",
            }}
          >
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
