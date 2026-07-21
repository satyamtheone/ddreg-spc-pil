import React, { useRef, useState } from "react";
import LoadingCard from "./loadingCard";

interface DataPoint {
  month: string;
  count: number;
  name?: string;
}

interface TooltipState {
  containerX: number;
  containerY: number;
  label: string;
  value: number;
}

interface LineGraphProps {
  title: string;
  description?: string;
  tooltipLabel?: string;
  lineType?: "solid" | "dotted";
  lineTurn?: "soft" | "sharp";
  data: DataPoint[];
  showDots?: boolean;
  dotStyle?: "solid" | "stroke";
  showBothLabels?: boolean;
  lineColor?: string;
  dotColor?: string;
  isLoading: boolean;
}

export const LineGraph: React.FC<LineGraphProps> = ({
  title,
  description,
  tooltipLabel,
  lineType = "solid",
  lineTurn = "sharp",
  data = [],
  showDots = true,
  dotStyle = "solid",
  showBothLabels = false,
  lineColor = "#6366f1",
  dotColor = "#6366f1",
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

  if (!data || data.length === 0) {
    return (
      <LoadingCard
        description={description || ""}
        isLoading={isLoading}
        title={title}
      />
    );
  }

  const yValues = data.map((d) => d.count);
  const rawMin = Math.min(...yValues);
  const rawMax = Math.max(...yValues);

  const padding = (rawMax - rawMin) * 0.1 || 5;
  const yMin = Math.max(0, Math.floor((rawMin - padding) / 5) * 5);
  const yMax = Math.ceil((rawMax + padding) / 5) * 5;
  const yRange = yMax === yMin ? 1 : yMax - yMin;

  const points = data.map((d, i) => ({
    svgX: paddingLeft + (i / (data.length - 1)) * chartWidth,
    svgY: paddingTop + chartHeight - ((d.count - yMin) / yRange) * chartHeight,
    label: d.name ?? String(d.month),
    value: d.count,
  }));

  const buildSmoothPath = () => {
    if (points.length === 0) return "";
    let d = `M ${points[0].svgX},${points[0].svgY}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const tension = 0.2;
      const cp1X = prev.svgX + (curr.svgX - prev.svgX) * tension;
      const cp2X = curr.svgX - (curr.svgX - prev.svgX) * tension;
      d += ` C ${cp1X},${prev.svgY} ${cp2X},${curr.svgY} ${curr.svgX},${curr.svgY}`;
    }
    return d;
  };

  const polylinePoints = points.map((p) => `${p.svgX},${p.svgY}`).join(" ");
  const strokeDash = lineType === "dotted" ? "6,4" : undefined;

  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks }, (_, i) => {
    const value = yMin + (i / (yTicks - 1)) * yRange;
    const yPos = paddingTop + chartHeight - (i / (yTicks - 1)) * chartHeight;
    return { value: Math.round(value), yPos };
  });

  const handleMouseEnter = (
    svgX: number,
    svgY: number,
    label: string,
    value: number,
  ) => {
    if (!svgRef.current || !containerRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const scaleX = svgRect.width / viewBoxWidth;
    const scaleY = svgRect.height / viewBoxHeight;

    const containerX = svgRect.left - containerRect.left + svgX * scaleX;
    const containerY = svgRect.top - containerRect.top + svgY * scaleY;

    setTooltip({ containerX, containerY, label, value });
  };

  const handleMouseLeave = () => setTooltip(null);

  const renderDot = (
    p: { svgX: number; svgY: number; label: string; value: number },
    i: number,
  ) => {
    const events = {
      onMouseEnter: () => handleMouseEnter(p.svgX, p.svgY, p.label, p.value),
      onMouseLeave: handleMouseLeave,
    };

    if (dotStyle === "stroke") {
      return (
        <g key={i} style={{ cursor: "pointer" }}>
          <circle cx={p.svgX} cy={p.svgY} r={5} fill="white" stroke="none" />
          <circle
            cx={p.svgX}
            cy={p.svgY}
            r={5}
            fill="transparent"
            stroke={dotColor}
            strokeWidth={2}
            {...events}
          />
        </g>
      );
    }

    return (
      <circle
        key={i}
        cx={p.svgX}
        cy={p.svgY}
        r={4}
        fill={dotColor}
        stroke="transparent"
        strokeWidth={0}
        style={{ cursor: "pointer" }}
        {...events}
      />
    );
  };

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

          {points.map((p, i) => (
            <text
              key={i}
              x={p.svgX}
              y={viewBoxHeight - paddingBottom + 16}
              textAnchor="middle"
              fontSize={10}
              fill="#9ca3af"
            >
              {p.label}
            </text>
          ))}

          {lineTurn === "soft" ? (
            <path
              d={buildSmoothPath()}
              fill="none"
              stroke={lineColor}
              strokeWidth={2}
              strokeDasharray={strokeDash}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <polyline
              points={polylinePoints}
              fill="none"
              stroke={lineColor}
              strokeWidth={2}
              strokeDasharray={strokeDash}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Invisible hit area for line hover */}
          {lineTurn === "soft" ? (
            <path
              d={buildSmoothPath()}
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
                  const distance = Math.abs(p.svgX - mouseX);
                  if (distance < minDistance) {
                    minDistance = distance;
                    nearestIndex = pi;
                  }
                });

                const nearestPoint = points[nearestIndex];
                handleMouseEnter(
                  nearestPoint.svgX,
                  nearestPoint.svgY,
                  nearestPoint.label,
                  nearestPoint.value,
                );
              }}
              onMouseLeave={handleMouseLeave}
            />
          ) : (
            <polyline
              points={polylinePoints}
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
                  const distance = Math.abs(p.svgX - mouseX);
                  if (distance < minDistance) {
                    minDistance = distance;
                    nearestIndex = pi;
                  }
                });

                const nearestPoint = points[nearestIndex];
                handleMouseEnter(
                  nearestPoint.svgX,
                  nearestPoint.svgY,
                  nearestPoint.label,
                  nearestPoint.value,
                );
              }}
              onMouseLeave={handleMouseLeave}
            />
          )}

          {showDots && points.map((p, i) => renderDot(p, i))}
        </svg>
      </div>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-40 -translate-y-full"
          style={{
            left: tooltip.containerX - 16,
            top: tooltip.containerY - 10,
          }}
        >
          <div className="bg-white border border-gray-200 shadow-md rounded-md px-2.5 py-1.5 whitespace-nowrap">
            <p className="text-xs font-medium text-theme-secondary">
              {showBothLabels && tooltipLabel
                ? `${tooltip.label} ${tooltipLabel}`
                : (tooltipLabel ?? tooltip.label)}
            </p>
            <p className="text-lg font-medium text-theme-secondary">
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
