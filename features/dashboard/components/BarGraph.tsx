import React, { useRef, useState } from "react";
import LoadingCard from "./loadingCard";

export interface BarSeries {
  label: string;
  color: string;
  data: number[];
}

interface TooltipState {
  containerX: number;
  containerY: number;
  seriesLabel: string;
  xLabel: string;
  value: number;
  color: string;
}

interface BarGraphProps {
  title: string;
  description?: string;
  tooltipLabel?: string;
  barStyle?: "soft" | "sharp";
  showBothLabels?: boolean;
  xLabels: string[];
  series: BarSeries[];
  isLoading: boolean;
  rightExtraSpacePercent?: number;
}

const buildBarPath = (
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): string => {
  if (h <= 0) return "";
  const cr = Math.min(r, h, w / 2);
  return [
    `M ${x},${y + h}`,
    `L ${x},${y + cr}`,
    `Q ${x},${y} ${x + cr},${y}`,
    `L ${x + w - cr},${y}`,
    `Q ${x + w},${y} ${x + w},${y + cr}`,
    `L ${x + w},${y + h}`,
    "Z",
  ].join(" ");
};

export const BarGraph: React.FC<BarGraphProps> = ({
  title,
  description,
  tooltipLabel,
  isLoading,
  barStyle = "sharp",
  showBothLabels = false,
  xLabels = [],
  series = [],
  rightExtraSpacePercent = 0,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const viewBoxWidth = 500;
  const viewBoxHeight = 220;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = viewBoxWidth - paddingLeft - paddingRight;
  const chartHeight = viewBoxHeight - paddingTop - paddingBottom;

  const handleMouseEnter = (
    svgX: number,
    svgY: number,
    seriesLabel: string,
    xLabel: string,
    value: number,
    color: string,
  ) => {
    if (!svgRef.current || !containerRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const scaleX = svgRect.width / viewBoxWidth;
    const scaleY = svgRect.height / viewBoxHeight;

    const containerX = svgRect.left - containerRect.left + svgX * scaleX;
    const containerY = svgRect.top - containerRect.top + svgY * scaleY;

    setTooltip({ containerX, containerY, seriesLabel, xLabel, value, color });
  };

  const handleMouseLeave = () => setTooltip(null);

  if (!series.length || !xLabels.length) {
    return (
      <LoadingCard
        description={description || ""}
        isLoading={isLoading}
        title={title}
      />
    );
  }

  const allValues = series.flatMap((s) => s.data);
  const rawMax = Math.max(...allValues, 1);

  const yMax = Math.ceil((rawMax + rawMax * 0.1) / 5) * 5;

  const groupCount = xLabels.length;
  const seriesCount = series.length;

  const barAreaWidth = chartWidth * (1 - rightExtraSpacePercent / 100);

  const groupWidth = barAreaWidth / groupCount;
  const groupGap = groupWidth * 0.2;
  const barGap = seriesCount > 1 ? 2 : 0;
  const totalBarWidth = groupWidth - groupGap;
  const barWidth = (totalBarWidth - barGap * (seriesCount - 1)) / seriesCount;
  const cornerRadius = barStyle === "soft" ? 8 : 0;

  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks }, (_, i) => {
    const value = (i / (yTicks - 1)) * yMax;
    const yPos = paddingTop + chartHeight - (i / (yTicks - 1)) * chartHeight;
    return { value: Math.round(value), yPos };
  });

  return (
    <div ref={containerRef} className="p-4 relative">
      <p className="text-lg font-medium text-theme-secondary">{title}</p>

      {description && (
        <p className="text-sm text-theme-secondary mt-0.5">{description}</p>
      )}

      <div className="border-b my-3"></div>

      <div className="mt-4 w-full overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full"
          style={{ minWidth: "260px" }}
        >
          {yTickValues.map((tick, i) => (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={tick.yPos}
                x2={viewBoxWidth - paddingRight}
                y2={tick.yPos}
                stroke="#e5e7eb"
                strokeWidth={1}
              />
              <text
                x={paddingLeft - 6}
                y={tick.yPos}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={10}
                fill="#9ca3af"
              >
                {tick.value}
              </text>
            </g>
          ))}

          {xLabels.map((xLabel, gi) => {
            const groupX = paddingLeft + gi * groupWidth + groupGap / 2;

            return (
              <g key={gi}>
                <text
                  x={groupX + totalBarWidth / 2}
                  y={viewBoxHeight - paddingBottom + 16}
                  textAnchor="middle"
                  fontSize={10}
                  fill="#9ca3af"
                >
                  {xLabel}
                </text>

                {series.map((s, si) => {
                  const value = s.data[gi] ?? 0;
                  const barH = value > 0 ? (value / yMax) * chartHeight : 0;
                  const barX = groupX + si * (barWidth + barGap);
                  const barY = paddingTop + chartHeight - barH;
                  const barCenterX = barX + barWidth / 2;

                  return (
                    <path
                      key={si}
                      d={buildBarPath(barX, barY, barWidth, barH, cornerRadius)}
                      fill={s.color}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() =>
                        handleMouseEnter(
                          barCenterX,
                          barY,
                          s.label,
                          xLabel,
                          value,
                          s.color,
                        )
                      }
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {series.length > 0 && (
        <div className="mt-3 flex items-center justify-center gap-4 flex-wrap">
          {series.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {tooltip && (
        <div
          className="pointer-events-none absolute z-40 -translate-y-full"
          style={{
            left: tooltip.containerX - 16,
            top: tooltip.containerY - 10,
          }}
        >
          <div className="bg-white border border-gray-200 shadow-md rounded-md px-2.5 py-1.5 whitespace-nowrap">
            <div className="flex items-center gap-1.5">
              {/* <div
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ backgroundColor: tooltip.color }}
              /> */}
              <p className="text-xs font-medium text-theme-secondary">
                {showBothLabels && tooltipLabel
                  ? `${tooltip.seriesLabel} ${tooltipLabel}`
                  : (tooltipLabel ?? tooltip.seriesLabel)}
              </p>
            </div>
            <p className="text-xl font-medium text-theme-secondary mt-0.5">
              {tooltip.value}
            </p>
          </div>
          <div className="flex justify-start pl-3">
            <div className="w-2 h-2 bg-white border-b border-r border-gray-200 rotate-45 -mt-1" />
          </div>
        </div>
      )}
    </div>
  );
};
