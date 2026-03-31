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
import UploadTemplateFrom from "../../template-library/uploadTemplateFrom";
import AddRefenceForm from "./addRefenceForm";

export type ViewType = "table" | "grid";

const GenerateSpc: React.FC = () => {
  const [view, setView] = useState<ViewType>("table");
  const [filter, setFilter] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const { openDrawer } = useDrawer();

  const query = useGetReferencesQuery();
  const data = useQueryErrorHandler(query, "Get References");
  console.log("References Data:", data);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    console.log("Filter:", value);
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    console.log("Country:", value);
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
      />
      {query.isLoading ? (
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
};

export default GenerateSpc;
