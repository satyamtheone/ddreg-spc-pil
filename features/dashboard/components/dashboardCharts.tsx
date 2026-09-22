"use client";
import React from "react";
import { NavCards } from "./NavCard";
import { mockNavCards } from "@/lib/apis/mockData";
import { PieChart } from "./PieChart";
import { AreaGraph } from "./AreaGraph";
import { BarGraph } from "./BarGraph";
import { LineGraph } from "./LineGraph";
import { GetDashboardReferenceResponseType } from "@/lib/redux/apiTypes";

type DashboardChartsProps = {
  dashboardReference: GetDashboardReferenceResponseType | undefined;
  taskStatusData: {
    week: string[];
    pending: number[];
    approved: number[];
  };
  pastSixMonthData: {
    month: string[];
    count: number[];
  };
  countryData: {
    label: string;
    value: number;
    spc: number;
    pil: number;
  }[];
  isDashboardLoading: boolean;
  isPastSixMonthLoading: boolean;
  isTaskStatusLoading: boolean;
  isCountriesLoading: boolean;
};

const DashboardCharts: React.FC<DashboardChartsProps> = ({
  dashboardReference,
  taskStatusData,
  pastSixMonthData,
  countryData,
  isDashboardLoading,
  isPastSixMonthLoading,
  isTaskStatusLoading,
  isCountriesLoading,
}) => {
  return (
    <div className="grid grid-cols-4 animate-dialog-slide-down">
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
              dotColor="#2563eb"
              data={dashboardReference?.data || []}
              isLoading={isDashboardLoading}
            />
          </div>
          <div className="col-span-1 bg-white rounded-xl border shadow-sm">
            <BarGraph
              title="Approval Status"
              description="Weekly approval vs pending Tasks"
              barStyle="soft"
              isLoading={isTaskStatusLoading}
              rightExtraSpacePercent={25}
              xLabels={taskStatusData.week || []}
              series={[
                {
                  label: "Approval",
                  color: "#08DD7D",
                  data: taskStatusData.approved || [],
                },
                {
                  label: "Pending",
                  color: "#FFB51D",
                  data: taskStatusData.pending || [],
                },
              ]}
            />
          </div>
          <div className="col-span-1 bg-white rounded-xl border shadow-sm">
            <AreaGraph
              isLoading={isPastSixMonthLoading}
              title="Document Generation Trend"
              description="Monthly SPC/PIL creation over the past 6 months"
              tooltipLabel="Documents"
              lineTurn="soft"
              lineType="solid"
              showDots={false}
              showBothLabels={true}
              xLabels={pastSixMonthData.month || []}
              series={[
                {
                  label: "SPC",
                  lineColor: "#268DF3",
                  fillOpacity: 0.35,
                  data: pastSixMonthData.count || [],
                },
              ]}
            />
          </div>
          <div className="col-span-1 bg-white rounded-xl border shadow-sm">
            <PieChart
              isLoading={isCountriesLoading}
              title="Documents by Country"
              description="Geographic distribution of generated documents"
              data={countryData || []}
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
                      {data.value} {" Documents "}
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
      </div>

      {/* Right Smaller Section */}
      <div className="col-span-1 ml-3 space-y-3">
        {/* Navingation Cards Section */}
        <NavCards navCards={mockNavCards} />
      </div>
    </div>
  );
};

export default DashboardCharts;
