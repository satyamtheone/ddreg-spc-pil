"use client";
import React from "react";
import { TbTableDashed } from "react-icons/tb";
import { FiGrid } from "react-icons/fi";
import DynamicButton from "@/components/common/DynamicButton";
import { FaRegSquarePlus } from "react-icons/fa6";
import { ViewType } from "./generateSpc";
import SearchForm from "@/components/FormikComponents/SearchForm";
import InputSkeleton from "@/components/common/skletons/inputSkeleton";
import { X } from "lucide-react";
import { FormikOptonType } from "@/components/FormikComponents/FormikSelect";
import SelectForm from "@/components/FormikComponents/SelectForm";

type SpcTableHeaderProps = {
  totalDocuments?: number;
  onFilterChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onViewChange?: (view: "table" | "grid") => void;
  onAddReference?: () => void;
  view: ViewType;
  handleSearch: (value: string) => void;
  params: {
    country: string;
    type: string;
    title: string;
  };
  options: FormikOptonType[];
  isLoading: boolean;
  types: FormikOptonType[];
  setParams: (
    value: React.SetStateAction<{
      country: string;
      type: string;
      title: string;
    }>,
  ) => void;
};

const SpcTableHeader: React.FC<SpcTableHeaderProps> = ({
  totalDocuments = 24,
  onFilterChange,
  onCountryChange,
  onViewChange,
  onAddReference,
  handleSearch,
  isLoading,
  params,
  view,
  types,
  options,
  setParams,
}) => {
  return (
    <div className="flex  w-full justify-between flex-col gap-6 flex-wrap">
      <div>
        <div className="text-xl font-medium">Local Results</div>
        <div className="text-base font-normal">
          {totalDocuments} Documents Found
        </div>
      </div>
      {/* FILTER 1 */}
      <div className="flex  items-start gap-x-6 flex-wrap">
        <div className="min-w-130 mb-6">
          <SearchForm
            value={params.title}
            onSearchChange={handleSearch}
            isLoading={isLoading}
          />
        </div>
        {isLoading ? (
          <div className="flex gap-4 items-center">
            <div className="min-w-70">
              <InputSkeleton />
            </div>
            <div className="min-w-70">
              <InputSkeleton />
            </div>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <SelectForm
              name="mySelect"
              labelText="Region"
              options={options}
              value={params.country}
              onChange={(val) => onCountryChange(val as string)}
            />
            <SelectForm
              name="mySelect"
              labelText="Type"
              options={types}
              value={params.type}
              onChange={(val) => onFilterChange(val as string)}
            />
          </div>
        )}
        {(params.country || params.type || params.title) && (
          <div>
            <DynamicButton
              text="Clear Filter"
              variant="submit"
              icon={<X />}
              onClick={() => setParams({ country: "", type: "", title: "" })}
            />
          </div>
        )}

        <div
          className={`custom-button font-bold border flex gap-4 items-center cursor-pointer bg-white ${view == "table" && "bg-gradient"}`}
          onClick={() => onViewChange?.("table")}
        >
          <TbTableDashed size={24} />
        </div>

        <div
          className={`custom-button font-bold border  flex gap-4 items-center cursor-pointer  bg-white ${view == "grid" && "bg-gradient"}`}
          onClick={() => onViewChange?.("grid")}
        >
          <FiGrid size={24} />
        </div>

        <div>
          <DynamicButton
            icon={<FaRegSquarePlus />}
            text="Add Reference"
            variant="card"
            onClick={onAddReference}
          />
        </div>
      </div>
    </div>
  );
};

export default SpcTableHeader;
