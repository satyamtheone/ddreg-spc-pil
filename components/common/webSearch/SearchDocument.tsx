"use client";
import React, { useState } from "react";
import SearchForm from "../../FormikComponents/SearchForm";
import InputSkeleton from "../skletons/inputSkeleton";
import SelectForFilter from "../selectForFilter";
import {
  useGetCountriesQuery,
  useGetReferencesFromWebQuery,
} from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "../../hooks/useQueryErrorHandler";
import { getAllDocumentOptions, getCountryOptions } from "@/lib/utilMethods";
import DynamicButton from "../DynamicButton";
import { X } from "lucide-react";
import WebReferences from "./webReferences";
import { useDebounce } from "@/components/hooks/useDebounce";

export const SearchDocument: React.FC = () => {
  const query = useGetCountriesQuery();
  const data = useQueryErrorHandler(query, "Get Countries");
  const options = getCountryOptions(data?.data || []);
  const allTypesOptions = getAllDocumentOptions(data?.data || []);
  const [params, setParams] = useState({
    region: "",
    type: "",
    search: "",
  });
  const debounceParams = useDebounce(params, 400);
  const referencesQuery = useGetReferencesFromWebQuery(debounceParams, {
    skip: !params.region,
  });
  const references = useQueryErrorHandler(
    referencesQuery,
    "Get References from the web",
  );

  const handleSetParams = (key: string, value: string) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = (value: string) => {
    handleSetParams("search", value);
  };
  const onFilterChange = (value: string) => {
    handleSetParams("type", value);
  };

  const onCountryChange = (value: string) => {
    handleSetParams("region", value);
  };

  return (
    <div className="w-full  flex flex-col text-white ">
      <div className="bg-gradient  py-7 px-5.5 rounded-lg rounded-b-none">
        <h1 className="text-2xl font-semibold mb-2">Web Search</h1>
        <p className="mb-6">
          Find the SPC or PIL document for your product on the web
        </p>
        <div className="flex  items-center gap-6 flex-wrap">
          <div className="min-w-140">
            <SearchForm
              value={params.search}
              onSearchChange={handleSearch}
              isLoading={referencesQuery.isLoading}
            />
          </div>
          {query.isLoading ? (
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
                label="Select Country"
                handleOptionChange={onCountryChange}
                optionTitle="Filter by"
                options={options}
              />

              <SelectForFilter
                label="Select Type"
                handleOptionChange={onFilterChange}
                optionTitle="Filter by"
                options={allTypesOptions}
              />
            </div>
          )}

          {(params.region || params.type || params.search) && (
            <div>
              <DynamicButton
                variant="danger"
                icon={<X />}
                onClick={() => setParams({ region: "", type: "", search: "" })}
              />
            </div>
          )}
        </div>
      </div>
      <div className="border border-t-0 p-4 rounded-[10px] rounded-t-none bg-white text-black">
        {referencesQuery.isLoading || referencesQuery.isFetching ? (
          <div className="flex flex-col gap-2 bg-white p-4 py-6 rounded-b-[10px]">
            <div className="h-15 w-full skeleton"></div>
            <div className="h-15 w-full skeleton"></div>
            <div className="h-15 w-full skeleton"></div>
            <div className="h-15 w-full skeleton"></div>
            <div className="h-15 w-full skeleton"></div>
          </div>
        ) : (
          <>
            {references?.data && params.region ? (
              <WebReferences references={references?.data || []} />
            ) : (
              <>Now You can search direct on the web</>
            )}
          </>
        )}
      </div>
    </div>
  );
};
