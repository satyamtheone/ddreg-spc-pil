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
import { useSearchParams } from "next/navigation";

export type ViewType = "table" | "grid";
export type ReferencesProps = {
  options: Option[];
  isLoading: boolean;
  types: Option[];
};

const GenerateSpc: React.FC<ReferencesProps> = ({
  options,
  isLoading,
  types,
}) => {
  const searchParams = useSearchParams();
  const country = searchParams.get("countryCode");
  const type = searchParams.get("type");
  const templateType = type ? type : "";
  const countryCode = country ? country : "";
  const [view, setView] = useState<ViewType>("table");
  const [params, setParams] = useState({
    country: countryCode,
    type: templateType,
    title: "",
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
    console.log("View:", viewType);
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
        totalDocuments={24}
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
        <SPCTable references={data?.data || []} />
      ) : (
        <SpcGrid references={data?.data || []} />
      )}
    </div>
  );
};;

export default GenerateSpc;
