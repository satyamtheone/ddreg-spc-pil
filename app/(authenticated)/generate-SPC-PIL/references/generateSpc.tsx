"use client";
import React, { useState } from "react";
import SpcTableHeader from "./spcTableHeader";
import SpcGrid from "./spcGrid";
import SPCTable from "./spcTable";
import { useGetReferencesQuery } from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import RoleTableSkeleton from "@/components/common/skletons/tableSkeleton";
import GridSkeleton from "@/components/common/skletons/gridSkeleton";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import AddRefenceForm from "./addRefenceForm";
import { useDebounce } from "@/components/hooks/useDebounce";
import { Option } from "@/lib/redux/apiTypes";
import { SpcSearchParams } from "../page";
import { FormikOptonType } from "@/components/FormikComponents/FormikSelect";
import Pagination from "@/components/common/pagination";

export type ViewType = "table" | "grid";
export type ReferencesProps = {
  options: FormikOptonType[];
  isLoading: boolean;
  types: FormikOptonType[];
  searchparams: SpcSearchParams;
};

const GenerateSpc: React.FC<ReferencesProps> = ({
  options,
  isLoading,
  types,
  searchparams,
}) => {
  const templateType = searchparams.type ? searchparams.type : "";
  const countryCode = searchparams.countryCode ? searchparams.countryCode : "";
  const [view, setView] = useState<ViewType>("table");
  const [params, setParams] = useState({
    country: countryCode,
    type: templateType,
    title: "",
    page: 1,
  });
  const { openDrawer } = useDrawer();
  const debouncedParams = useDebounce(params, 500);

  const query = useGetReferencesQuery(debouncedParams);
  const data = useQueryErrorHandler(query, "Get References");

  const handleSetParams = (key: string, value: string) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = (value: string) => {
    handleSetParams("title", value);
  };
  const handleFilterChange = (value: string) => {
    handleSetParams("type", value);
  };

  const handleCountryChange = (value: string) => {
    handleSetParams("country", value);
  };

  const handleViewChange = (viewType: ViewType) => {
    setView(viewType);
  };

  const handleAddReference = () => {
    openDrawer({
      title: "Add Reference",
      children: <AddRefenceForm />,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white spcBNS rounded-[10px] min-h-120">
      <SpcTableHeader
        view={view}
        totalDocuments={data?.data?.data?.length}
        onFilterChange={handleFilterChange}
        onCountryChange={handleCountryChange}
        onViewChange={handleViewChange}
        onAddReference={handleAddReference}
        handleSearch={handleSearch}
        setParams={setParams}
        params={params}
        options={options}
        types={types}
        isLoading={isLoading || query.isLoading}
      />
      {query.isLoading || query.isFetching ? (
        view === "table" ? (
          <RoleTableSkeleton />
        ) : (
          <GridSkeleton />
        )
      ) : view === "table" ? (
        <SPCTable references={data?.data?.data || []} />
      ) : (
        <SpcGrid references={data?.data?.data || []} />
      )}
      {data?.data && data?.data?.pagination?.pageSize > 1 && (
        <Pagination
          currentPage={Number(params.page)}
          lengthPerPage={10}
          totalDataLength={data?.data?.pagination?.total || 0}
          updateCurrenPage={(val) => handleSetParams("page", String(val))}
        />
      )}
    </div>
  );
};;

export default GenerateSpc;
