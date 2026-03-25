"use client";
import SelectForFilter from "@/components/common/selectForFilter";
import React from "react";
import { TbTableDashed } from "react-icons/tb";
import { FiGrid } from "react-icons/fi";
import DynamicButton from "@/components/common/DynamicButton";
import { FaRegSquarePlus } from "react-icons/fa6";
import { ViewType } from "./generateSpc";

type SpcTableHeaderProps = {
  totalDocuments?: number;
  onFilterChange?: (value: string) => void;
  onCountryChange?: (value: string) => void;
  onViewChange?: (view: "table" | "grid") => void;
  onAddReference?: () => void;
  view: ViewType;
};

const SpcTableHeader: React.FC<SpcTableHeaderProps> = ({
  totalDocuments = 24,
  onFilterChange,
  onCountryChange,
  onViewChange,
  onAddReference,
  view,
}) => {
  return (
    <div className="flex  w-full justify-between items-center gap-6 flex-wrap">
      <div>
        <div className="text-xl font-medium">Search Results</div>
        <div className="text-base font-normal">
          {totalDocuments} Documents Found
        </div>
      </div>
      {/* FILTER 1 */}
      <div className="flex  items-center gap-6 flex-wrap">
        <SelectForFilter
          handleOptionChange={(value: string) => onFilterChange?.(value)}
          optionTitle="Filter by"
          options={[
            { value: "status", option: "Status" },
            { value: "email", option: "Email" },
            { value: "role", option: "Role" },
          ]}
        />
        {/* FILTER 2 */}
        <SelectForFilter
          handleOptionChange={(value: string) => onCountryChange?.(value)}
          optionTitle="Country"
          options={[
            { value: "india", option: "India" },
            { value: "usa", option: "USA" },
            { value: "uk", option: "UK" },
          ]}
        />
        {/* TABLE VIEW */}
        <div
          className={`custom-button font-bold border flex gap-4 items-center cursor-pointer ${view == "table" && "bg-gradient"}`}
          onClick={() => onViewChange?.("table")}
        >
          <TbTableDashed size={24} />
        </div>
        {/* GRID VIEW */}
        <div
          className={`custom-button font-bold border  flex gap-4 items-center cursor-pointer ${view == "grid" && "bg-gradient"}`}
          onClick={() => onViewChange?.("grid")}
        >
          <FiGrid size={24} />
        </div>

        <div>
          <DynamicButton
            icon={<FaRegSquarePlus />}
            text="Add Reference"
            variant="outline"
            onClick={onAddReference}
          />
        </div>
      </div>
    </div>
  );
};

export default SpcTableHeader;
