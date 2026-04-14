"use client";
import PageHeader from "@/components/common/pageHeader";
import SearchForm from "@/components/FormikComponents/SearchForm";
import { useGetDocumentQuery } from "@/lib/redux/slices/documentApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import { useState } from "react";
import { useDebounce } from "@/components/hooks/useDebounce";
import Pagination from "@/components/common/pagination";
import { updateParam } from "@/lib/utilMethods";
import DocumentsTable from "./documentsTable";

type ParamsType = {
  page: number;
  search?: string;
  country?: string;
  type?: string;
};

export default function DocumentRepository() {
  const [params, setParams] = useState<ParamsType>({
    page: 1,
    country: "",
    type: "",
    search: "",
  });
  const debouncedParams = useDebounce(params, 500);
  const query = useGetDocumentQuery(debouncedParams);
  const data = useQueryErrorHandler(query, "Get Documents");

  const handleSearchChange = (value: string) => {
    updateParam("search", value, setParams);
  };
  const handleUpdateCurrentPage = (value: number) => {
    updateParam("page", value, setParams);
  };

  return (
    <div>
      <PageHeader
        title="Document Repository"
        subTitle="Manage and access your regulatory documents"
      />
      <div className="spcBNS p-4 bg-white rounded-md">
        <SearchForm
          value={params.search}
          onSearchChange={handleSearchChange}
          isLoading={query.isLoading}
        />

        {query.isLoading || query.isFetching ? (
          <div className="flex flex-col gap-4 mt-4">
            <div className="skeleton h-20"></div>
            <div className="skeleton h-20"></div>
            <div className="skeleton h-20"></div>
            <div className="skeleton h-20"></div>
          </div>
        ) : (
          <DocumentsTable documents={data?.data.data || []} />
        )}

        {data?.data && data?.data?.pagination?.totalPages > 1 && (
          <Pagination
            currentPage={params.page}
            lengthPerPage={10}
            totalDataLength={data?.data?.pagination.total || 0}
            updateCurrenPage={handleUpdateCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
