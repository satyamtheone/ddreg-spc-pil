"use client";
import DynamicTab from "@/components/common/DynamicTab";
import SelectForFilter from "@/components/common/selectForFilter";
import SearchForm from "@/components/FormikComponents/SearchForm";
import React, { useState } from "react";
import Templatecard from "./templateCard";
import { useGetTemplatesQuery } from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { Option } from "@/lib/redux/apiTypes";
import InputSkeleton from "@/components/common/skletons/inputSkeleton";
import TemplateCardSkeleton from "@/components/common/skletons/templateCardSkeleton";

type TemplatesProps = {
  options: Option[];
  isLoading: boolean;
  types: Option[];
};

const Templates: React.FC<TemplatesProps> = ({ options, isLoading, types }) => {
  const [activeTab, setActiveTab] = useState("All");

  const query = useGetTemplatesQuery();
  const data = useQueryErrorHandler(query, "Get Templates");

  // const { user, isLoading } = useAuth();
  const activeChild = (tab: string) => {
    switch (tab) {
      case "General":
        return <>hi</>;
      case "Security":
        return <>hiujkm</>;
      case "User":
        return <>hi</>;
      case "Roles":
        return <>hi</>;
      default:
        return <>hisdf</>;
    }
  };

  const handleSetActiveTabs = (value: string) => {
    setActiveTab(value);
  };
  const handleSearch = (value: string) => {
    console.log(value);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="spcBNS p-4 bg-white rounded-[10px] flex gap-4 items-center flex-wrap">
        <DynamicTab
          tabs={[
            { label: "All", value: "All" },
            { label: "Latest", value: "Latest" },
          ]}
          setActiveTab={handleSetActiveTabs}
          activeTab={activeTab}
        />
        <div className="min-w-130">
          <SearchForm
            onSearchChange={handleSearch}
            isLoading={query.isLoading}
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
              handleOptionChange={(value: string) => console.log(value)}
              optionTitle="Filter by"
              options={options}
            />

            <SelectForFilter
              handleOptionChange={(value: string) => console.log(value)}
              optionTitle="Filter by"
              options={types}
            />
          </div>
        )}
      </div>
      <div className="flex gap-6 flex-wrap ">
        {query.isLoading ? (
          <div>
            <TemplateCardSkeleton />
          </div>
        ) : (
          <>
            {data?.data.map((template, index) => (
              <Templatecard key={index} template={template} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Templates;
