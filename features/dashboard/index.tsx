"use client";

import React from "react";
import { SearchDocument } from "@/components/common/SearchDocument";
import { Cards } from "@/features/dashboard/components/Cards";
import { mockDashboardCards } from "@/lib/apis/mockData";

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-2.5">
      <SearchDocument />
      <Cards cards={mockDashboardCards} />
    </div>
  );
};
