import React, { useRef, useState } from "react";
import LoadingCard from "./loadingCard";

export interface AreaSeries {
  label: string;
  lineColor: string;
  fillOpacity?: number;
  data: number[];
}

interface TooltipState {
  containerX: number;
  containerY: number;
  seriesLabel: string;
  value: number;
  color: string;
}

interface AreaGraphProps {
  title: string;
  description?: string;
  tooltipLabel?: string;
  lineTurn?: "soft" | "sharp";
  lineType?: "solid" | "dotted";
  showDots?: boolean;
  showBothLabels?: boolean;
  xLabels: string[];
  series: AreaSeries[];
  isLoading: boolean;
}

export const AreaGraph: React.FC<AreaGraphProps> = ({
  title,
  description,
  tooltipLabel,
  lineTurn = "sharp",
  lineType = "solid",
  showDots = true,
  showBothLabels = false,
  xLabels = [],
  series = [],
  isLoading,
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
  const bottomY = paddingTop + chartHeight;

  const handleMouseEnter = (
    svgX: number,
    svgY: number,
    seriesLabel: string,
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
    setTooltip({ containerX, containerY, seriesLabel, value, color });
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
  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues, 1);

  const padding = (rawMax - rawMin) * 0.1 || 5;
  const yMin = Math.max(0, Math.floor((rawMin - padding) / 5) * 5);
  const yMax = Math.ceil((rawMax + padding) / 5) * 5;
  const yRange = yMax === yMin ? 1 : yMax - yMin;

  const toSvgX = (i: number) =>
    paddingLeft + (i / (xLabels.length - 1)) * chartWidth;
  const toSvgY = (v: number) =>
    paddingTop + chartHeight - ((v - yMin) / yRange) * chartHeight;

  const tension = 0.3;

  const buildAreaPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    let linePart = `M ${points[0].x},${points[0].y}`;
    if (lineTurn === "soft") {
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cp1X = prev.x + (curr.x - prev.x) * tension;
        const cp2X = curr.x - (curr.x - prev.x) * tension;
        linePart += ` C ${cp1X},${prev.y} ${cp2X},${curr.y} ${curr.x},${curr.y}`;
      }
    } else {
      for (let i = 1; i < points.length; i++) {
        linePart += ` L ${points[i].x},${points[i].y}`;
      }
    }
    const last = points[points.length - 1];
    const first = points[0];
    return `${linePart} L ${last.x},${bottomY} L ${first.x},${bottomY} Z`;
  };

  const buildLinePath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x},${points[0].y}`;
    if (lineTurn === "soft") {
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cp1X = prev.x + (curr.x - prev.x) * tension;
        const cp2X = curr.x - (curr.x - prev.x) * tension;
        d += ` C ${cp1X},${prev.y} ${cp2X},${curr.y} ${curr.x},${curr.y}`;
      }
    } else {
      for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i].x},${points[i].y}`;
      }
    }
    return d;
  };

  const strokeDash = lineType === "dotted" ? "6,4" : undefined;

  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks }, (_, i) => {
    const value = yMin + (i / (yTicks - 1)) * yRange;
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
          <defs>
            {series.map((s, si) => (
              <linearGradient
                key={si}
                id={`area-grad-${si}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={s.lineColor}
                  stopOpacity={s.fillOpacity ?? 0.2}
                />
                <stop offset="100%" stopColor={s.lineColor} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

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

          {xLabels.map((label, i) => (
            <text
              key={i}
              x={toSvgX(i)}
              y={viewBoxHeight - paddingBottom + 16}
              textAnchor="middle"
              fontSize={10}
              fill="#9ca3af"
            >
              {label}
            </text>
          ))}

          {[...series].reverse().map((s, ri) => {
            const origIndex = series.length - 1 - ri;
            const points = s.data.map((v, i) => ({
              x: toSvgX(i),
              y: toSvgY(v),
            }));
            return (
              <path
                key={ri}
                d={buildAreaPath(points)}
                fill={`url(#area-grad-${origIndex})`}
                stroke="none"
              />
            );
          })}

          {series.map((s, si) => {
            const points = s.data.map((v, i) => ({
              x: toSvgX(i),
              y: toSvgY(v),
            }));
            return (
              <g key={si}>
                <path
                  d={buildLinePath(points)}
                  fill="none"
                  stroke={s.lineColor}
                  strokeWidth={2}
                  strokeDasharray={strokeDash}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d={buildLinePath(points)}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={20}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ cursor: "pointer" }}
                  onMouseMove={(e) => {
                    const svg = svgRef.current;
                    if (!svg) return;
                    const rect = svg.getBoundingClientRect();
                    const scaleX = rect.width / viewBoxWidth;
                    const mouseX = (e.clientX - rect.left) / scaleX;

                    let nearestIndex = 0;
                    let minDistance = Infinity;
                    points.forEach((p, pi) => {
                      const distance = Math.abs(p.x - mouseX);
                      if (distance < minDistance) {
                        minDistance = distance;
                        nearestIndex = pi;
                      }
                    });

                    const nearestPoint = points[nearestIndex];
                    handleMouseEnter(
                      nearestPoint.x,
                      nearestPoint.y,
                      s.label,
                      s.data[nearestIndex],
                      s.lineColor,
                    );
                  }}
                  onMouseLeave={handleMouseLeave}
                />

                {showDots &&
                  points.map((p, pi) => (
                    <g key={pi} style={{ cursor: "pointer" }}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={5}
                        fill="white"
                        stroke="none"
                      />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={4}
                        fill={s.lineColor}
                        stroke="white"
                        strokeWidth={1.5}
                        onMouseEnter={() =>
                          handleMouseEnter(
                            p.x,
                            p.y,
                            s.label,
                            s.data[pi],
                            s.lineColor,
                          )
                        }
                        onMouseLeave={handleMouseLeave}
                      />
                    </g>
                  ))}
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
                style={{ backgroundColor: s.lineColor }}
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
              <div
                className="w-2.5 h-2.5 rounded-sm shrink-0"
                style={{ backgroundColor: tooltip.color }}
              />
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
