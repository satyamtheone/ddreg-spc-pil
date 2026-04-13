"use client";
import React, { useState } from "react";
import Templatecard from "./templateCard";
import { useGetTemplatesQuery } from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { Option } from "@/lib/redux/apiTypes";
import TemplateCardSkeleton from "@/components/common/skletons/templateCardSkeleton";
import { useDebounce } from "@/components/hooks/useDebounce";

import { FaBoxOpen } from "react-icons/fa";
import FilterHead from "./filterHead";
import { FormikOptonType } from "@/components/FormikComponents/FormikSelect";

export type TemplatesProps = {
  options: FormikOptonType[];
  isLoading: boolean;
  types: FormikOptonType[];
};

const Templates: React.FC<TemplatesProps> = ({ options, isLoading, types }) => {
  const [activeTab, setActiveTab] = useState("All");
  const [params, setParams] = useState({
    country: "",
    type: "",
    title: "",
  });
  const debouncedParams = useDebounce(params, 500);
  const query = useGetTemplatesQuery(debouncedParams);
  const data = useQueryErrorHandler(query, "Get Templates");
  const handleSetParams = (key: string, value: string) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = (value: string) => {
    handleSetParams("title", value);
  };

  const handleSetCountry = (value: string) => {
    handleSetParams("country", value);
  };

  const handleSetType = (value: string) => {
    handleSetParams("type", value);
  };

  return (
    <div className="flex flex-col gap-4">
      <FilterHead
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        params={params}
        handleSearch={handleSearch}
        handleSetCountry={handleSetCountry}
        handleSetType={handleSetType}
        options={options}
        isLoading={isLoading}
        types={types}
        setParams={setParams}
      />

      <div className="flex gap-6 flex-wrap">
        {query.isLoading || query.isFetching ? (
          <TemplateCardSkeleton />
        ) : (
          <>
            {data?.data && data?.data?.length > 0 ? (
              data?.data.map((template, index) => (
                <Templatecard key={index} template={template} />
              ))
            ) : (
              <div className="w-full flex justify-center  ">
                <div className="flex flex-col items-center justify-center gap-2 py-20">
                  <FaBoxOpen
                    className="mx-auto text-4xl text-teal-500  "
                    size={300}
                  />
                  <p className="text-3xl font-bold text-gradient capitalize">
                    No templates found
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Templates;
