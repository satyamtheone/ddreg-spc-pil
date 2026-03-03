"use client";

import React from "react";
import { SearchDocument } from "@/components/common/SearchDocument";
import { Cards } from "@/features/dashboard/components/Cards";
import { LineGraph } from "@/features/dashboard/components/LineGraph";
import { BarGraph } from "@/features/dashboard/components/BarGraph";
import { AreaGraph } from "@/features/dashboard/components/AreaGraph";
import { PieChart } from "@/features/dashboard/components/PieChart";
import { NavCards } from "./components/NavCard";
import { mockDashboardCards, mockNavCards } from "@/lib/apis/mockData";

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-2.5">
      {/* Search Section */}
      <SearchDocument />

      {/* Top Cards Section */}
      <Cards cards={mockDashboardCards} />

      {/* Body Section */}
      <div className="grid grid-cols-4">
        {/* Left Bigger Section */}
        <div className="col-span-3">
          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1 bg-white rounded-xl border shadow-sm">
              <LineGraph
                title="Document Activity"
                description="Monthly document submissions over the year"
                tooltipLabel="Total Documents"
                lineType="dotted"
                lineTurn="soft"
                showDots={true}
                dotStyle="stroke"
                lineColor="#17BDD3"
                dotColor="#17BDD3"
                data={[
                  { x: "Jan", y: 8 },
                  { x: "Feb", y: 0 },
                  { x: "Mar", y: 33 },
                  { x: "Apr", y: 26 },
                  { x: "May", y: 6 },
                  { x: "Jun", y: 2 },
                  { x: "Jul", y: 5 },
                ]}
              />
            </div>
            <div className="col-span-1 bg-white rounded-xl border shadow-sm">
              <BarGraph
                title="Approval Status"
                description="Weekly approval vs pending documents"
                barStyle="soft"
                rightExtraSpacePercent={25}
                xLabels={["Week 1", "Week 2", "Week 3", "Week 4"]}
                series={[
                  {
                    label: "Approval",
                    color: "#08DD7D",
                    data: [12, 8, 20, 15],
                  },
                  {
                    label: "Pending",
                    color: "#FFB51D",
                    data: [8, 14, 10, 22],
                  },
                ]}
              />
            </div>
            <div className="col-span-1 bg-white rounded-xl border shadow-sm">
              <AreaGraph
                title="Document Generation Trend"
                description="Monthly SPC/PIL creation over the past 6 months"
                tooltipLabel="Documents"
                lineTurn="soft"
                lineType="solid"
                showDots={false}
                showBothLabels={true}
                xLabels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
                series={[
                  {
                    label: "SPC",
                    lineColor: "#268DF3",
                    fillOpacity: 0.35,
                    data: [15, 18, 15, 20, 22, 18, 24],
                  },
                  {
                    label: "PIL",
                    lineColor: "#26F3DE",
                    fillOpacity: 0.35,
                    data: [5, 10, 8, 12, 13, 9, 14],
                  },
                ]}
              />
            </div>
            <div className="col-span-1 bg-white rounded-xl border shadow-sm">
              <PieChart
                title="Documents by Country"
                description="Geographic distribution of generated documents"
                data={[
                  { label: "United Kingdom", value: 45, spc: 32, pil: 13 },
                  { label: "Germany", value: 32, spc: 16, pil: 16 },
                  { label: "France", value: 18, spc: 10, pil: 8 },
                  { label: "Spain", value: 12, spc: 8, pil: 4 },
                  { label: "Italy", value: 8, spc: 4, pil: 4 },
                ]}
                renderTooltip={(data) => (
                  <div
                    className="bg-white border border-gray-200 shadow-md rounded-md px-2.5 py-1.5 whitespace-nowrap"
                    style={{
                      transform: "translate(-10%, -10%)",
                      marginTop: "-8px",
                    }}
                  >
                    <div>
                      <div className="text-xs text-[#8A8894]">
                        Document Generation
                      </div>
                      <p className="text-xs font-medium text-theme-secondary">
                        {data.label}
                      </p>
                    </div>
                    <div className="flex gap-3 text-[#8A8894] text-xs">
                      <p>
                        {data.spc} {" SPC | "}
                      </p>
                      <p>
                        {data.pil} {" PIL"}
                      </p>
                    </div>
                    <div className="flex justify-start">
                      <div className="w-2.5 h-2.5 bg-white border-b border-r border-white rotate-45 -mb-9" />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Table Section */}
          <div></div>
        </div>

        {/* Right Smaller Section */}
        <div className="col-span-1 ml-3 space-y-3">
          {/* Navingation Cards Section */}
          <NavCards navCards={mockNavCards} />
        </div>
      </div>
    </div>
  );
};
