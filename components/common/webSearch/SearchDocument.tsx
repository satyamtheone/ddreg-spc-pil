"use client";
import React, { useMemo, useState } from "react";
import SearchForm from "../../FormikComponents/SearchForm";
import InputSkeleton from "../skletons/inputSkeleton";
import {
  useGetCountriesQuery,
  useGetReferencesFromWebQuery,
} from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "../../hooks/useQueryErrorHandler";
import {
  getAllDocumentOptions,
  getCountryOptions,
  updateParam,
} from "@/lib/utilMethods";
import DynamicButton from "../DynamicButton";
import { X } from "lucide-react";
import WebReferences from "./webReferences";
import { useDebounce } from "@/components/hooks/useDebounce";
import SelectForm from "@/components/FormikComponents/SelectForm";
import Pagination from "../pagination";

type ParamsType = {
  page: number;
  search?: string;
  region?: string;
  type?: string;
};

export const SearchDocument: React.FC = () => {
  const [params, setParams] = useState<ParamsType>({
    region: "",
    type: "",
    search: "",
    page: 1,
  });

  const debouncedParams = useDebounce(params, 400);

  const countriesQuery = useGetCountriesQuery();
  const countriesData = useQueryErrorHandler(countriesQuery, "Get Countries");

  const countryOptions = useMemo(
    () => getCountryOptions(countriesData?.data || []),
    [countriesData],
  );

  const typeOptions = useMemo(
    () => getAllDocumentOptions(countriesData?.data || []),
    [countriesData],
  );

  const shouldFetchReferences = !!params.region && !!params.search;

  const referencesQuery = useGetReferencesFromWebQuery(debouncedParams, {
    skip: !shouldFetchReferences,
  });

  const references = useQueryErrorHandler(
    referencesQuery,
    "Get References from the web",
  );

  const update = (key: keyof ParamsType, value: string | number) => {
    updateParam(key, value, setParams);
  };

  const resetFilters = () => {
    setParams({ region: "", type: "", search: "", page: 1 });
    if (
      params.region === "" ||
      params.type === "" ||
      params.search === "" ||
      params.page === 1
    ) {
      return;
    } else {
      referencesQuery.refetch();
    }
  };

  // -------- UI Conditions --------
  const isLoading = referencesQuery.isLoading || referencesQuery.isFetching;

  const showPagination =
    references?.data &&
    references?.total > 0 &&
    references?.totalPages > 1 &&
    params.region &&
    params.search;

  const showClearButton = params.region || params.type || params.search;

  const showResults = references?.data && params.region && params.search;

  return (
    <div className="w-full flex flex-col  spcBNS rounded-xl transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient py-7 px-4   rounded-lg rounded-b-none">
        <h1 className="text-2xl font-semibold mb-2">Web Search</h1>
        <p className="mb-6">
          Find the SPC or PIL document for your product on the web
        </p>

        <div className="flex items-start gap-x-6 gap-y-2 flex-wrap">
          {/* Search */}
          <div className="min-w-140">
            <SearchForm
              value={params.search}
              onSearchChange={(val) => update("search", val)}
              isLoading={referencesQuery.isLoading}
              isColorBackground
              placeholder="Write the medicine name then Select the Country"
            />
          </div>

          {/* Filters */}
          {countriesQuery.isLoading ? (
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
                isGhost
                name="country"
                labelText="Country"
                options={countryOptions}
                value={params.region}
                onChange={(val) => update("region", val as string)}
              />
              <SelectForm
                isGhost
                name="type"
                labelText="Type"
                options={typeOptions}
                value={params.type}
                onChange={(val) => update("type", val as string)}
              />
            </div>
          )}

          {/* Clear Button */}
          {showClearButton && (
            <div>
              <DynamicButton
                variant="danger"
                icon={<X />}
                onClick={() => resetFilters()}
              />
            </div>
          )}
        </div>
        {referencesQuery.isLoading ? (
          <></>
        ) : (
          <div className="w-full flex items-center justify-between">
            {showResults && (
              <div className="border-b max-w-max pb-2">
                <p className="text-nowrap">
                  {references?.total} Documents Found
                </p>
              </div>
            )}
            <div className="text-black bg-white shadow-md px-4 rounded-lg animate-dialog-slide-down">
              {showPagination && (
                <Pagination
                  currentPage={params.page}
                  lengthPerPage={10}
                  totalDataLength={references?.total || 0}
                  updateCurrenPage={(val) => update("page", val)}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`border border-t-0 p-4 rounded-[10px]  transition-all duration-300 rounded-t-none bg-white text-black ${showResults && "h-120"}`}
      >
        {isLoading ? (
          <div className="flex flex-col gap-2 py-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-15 w-full skeleton"></div>
            ))}
          </div>
        ) : showResults ? (
          <WebReferences references={references.data || []} />
        ) : (
          <div className="py-2 text-gray-500">
            Now you can search directly on the web
          </div>
        )}
      </div>
    </div>
  );
};
