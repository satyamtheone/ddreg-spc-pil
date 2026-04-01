import DynamicButton from "@/components/common/DynamicButton";
import SelectForFilter from "@/components/common/selectForFilter";
import InputSkeleton from "@/components/common/skletons/inputSkeleton";
import SearchForm from "@/components/FormikComponents/SearchForm";
import { X } from "lucide-react";
import React from "react";
export type Params = {
  country: string;
  type: string;
  title: string;
};
type FilterHeadProps = {
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;
  activeTab?: string;
  params: Params;
  handleSearch: (value: string) => void;
  handleSetCountry: (value: string) => void;
  handleSetType: (value: string) => void;
  options: { option: string; value: string }[];
  isLoading: boolean;
  types: { option: string; value: string }[];
  setParams: (
    value: React.SetStateAction<{
      country: string;
      type: string;
      title: string;
    }>,
  ) => void;
};

const FilterHead: React.FC<FilterHeadProps> = ({
  setActiveTab,
  activeTab,
  params,
  handleSearch,
  handleSetCountry,
  handleSetType,
  options,
  isLoading,
  types,
  setParams,
}) => {
  return (
    <div className="spcBNS p-4 bg-white rounded-[10px] flex gap-4 items-center flex-wrap">
      {/* <DynamicTab
        tabs={[
          { label: "All", value: "All" },
          { label: "Latest", value: "Latest" },
        ]}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      /> */}

      <div className="min-w-130">
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
          <SelectForFilter
            handleOptionChange={handleSetCountry}
            optionTitle="Filter by"
            options={options}
          />

          <SelectForFilter
            handleOptionChange={handleSetType}
            optionTitle="Filter by"
            options={types}
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
    </div>
  );
};

export default FilterHead;
