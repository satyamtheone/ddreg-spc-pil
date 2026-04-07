"use client";
import { SearchDocument } from "@/components/common/webSearch/SearchDocument";
import GenerateSpc from "./references/generateSpc";
import { useGetCountriesQuery } from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { getAllDocumentOptions, getCountryOptions } from "@/lib/utilMethods";
import { SpcSearchParams } from "./page";

export default function SpcPilPage({ params }: { params: SpcSearchParams }) {
  const query = useGetCountriesQuery();
  const data = useQueryErrorHandler(query, "Get Countries");
  const options = getCountryOptions(data?.data || []);
  const allTypesOptions = getAllDocumentOptions(data?.data || []);
  return (
    <div className="flex  flex-col gap-4">
      <SearchDocument />
      <GenerateSpc
        searchparams={params}
        isLoading={query.isLoading}
        options={options}
        types={allTypesOptions}
      />
    </div>
  );
}
