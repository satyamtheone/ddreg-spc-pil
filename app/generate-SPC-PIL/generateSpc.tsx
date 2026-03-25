"use client";
import React, { useState } from "react";
import SpcTableHeader from "./spcTableHeader";
import SpcGrid from "./spcGrid";
import SPCTable from "./spcTable";

export type ViewType = "table" | "grid";

const GenerateSpc: React.FC = () => {
  const [view, setView] = useState<ViewType>("table");
  const [filter, setFilter] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

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
    console.log("Add Reference Clicked");
  };

  return (
    <div className="flex flex-col gap-4">
      <SpcTableHeader
        view={view}
        totalDocuments={24}
        onFilterChange={handleFilterChange}
        onCountryChange={handleCountryChange}
        onViewChange={handleViewChange}
        onAddReference={handleAddReference}
      />

      {view === "table" ? <SPCTable /> : <SpcGrid />}
    </div>
  );
};

export default GenerateSpc;
