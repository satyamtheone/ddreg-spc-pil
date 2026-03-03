"use client";

import React, { useState, useRef, useMemo, useCallback } from "react";
import Image from "next/image";

export interface PieDataItem {
  label: string;
  value: number;
  spc: number;
  pil: number;
}

interface TooltipData {
  label: string;
  value: number;
  color: string;
  percentage: number;
  spc: number;
  pil: number;
}

interface PieChartProps {
  title: string;
  description?: string;
  data: PieDataItem[];
  iconSrc?: string;
  renderTooltip?: (data: TooltipData) => React.ReactNode;
}

const COLORS_PALETTE = [
  "#1A7ECA",
  "#17BAD3",
  "#10C488",
  "#12E3B3",
  "#1BD3EB",
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#EF4444",
  "#22C55E",
  "#14B8A6",
  "#3B82F6",
  "#A855F7",
  "#F97316",
];

export const PieChart: React.FC<PieChartProps> = ({
  title,
  description,
  data = [],
  iconSrc = "/dashboard/chart/Icon-01.svg",
  renderTooltip,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const viewBoxSize = 200;
  const svgDisplaySize = 260;
  const cx = viewBoxSize / 2;
  const cy = viewBoxSize / 2;

  const colors = useMemo(
    () => data.map((_, i) => COLORS_PALETTE[i % COLORS_PALETTE.length]),
    [data],
  );

  const segments = useMemo(() => {
    if (!data || data.length === 0) return [];
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const baseRadii = [100, 95, 90, 85, 80, 75, 70];
    let currentAngle = -Math.PI / 2;

    return data.map((item, index) => {
      const percentage = item.value / total;
      const angle = percentage * 2 * Math.PI;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const radius = baseRadii[index % baseRadii.length];
      const x1 = cx + Math.cos(startAngle) * radius;
      const y1 = cy + Math.sin(startAngle) * radius;
      const x2 = cx + Math.cos(endAngle) * radius;
      const y2 = cy + Math.sin(endAngle) * radius;
      const largeArcFlag = angle > Math.PI ? 1 : 0;

      const pathData = [
        `M ${cx} ${cy}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        "Z",
      ].join(" ");

      return {
        pathData,
        label: item.label,
        value: item.value,
        color: colors[index],
        spc: item.spc,
        pil: item.pil,
        percentage: Math.round(percentage * 100),
      };
    });
  }, [data, colors, cx, cy]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGPathElement>, segData: TooltipData) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setTooltipData(segData);
    },
    [],
  );

  const handleMouseLeave = useCallback(() => setTooltipData(null), []);

  if (!data || data.length === 0) {
    return (
      <div className="p-4 h-full">
        <p className="text-lg font-medium text-theme-secondary">{title}</p>
        {description && (
          <p className="text-sm text-theme-secondary mt-0.5">{description}</p>
        )}
        <div className="mt-4 flex items-center justify-center h-40 text-gray-400 text-sm">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="p-4 h-full relative">
      <p className="text-lg font-medium text-theme-secondary">{title}</p>
      {description && (
        <p className="text-sm text-theme-secondary mt-0.5">{description}</p>
      )}

      <div className="border-b border-gray-200 my-3" />

      <div className="flex items-center">
        {/* Pie */}
        <div className="relative flex items-center justify-center">
          <svg
            width={svgDisplaySize}
            height={svgDisplaySize}
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            style={{ overflow: "visible" }}
          >
            {segments.map((seg, i) => (
              <path
                key={i}
                d={seg.pathData}
                fill={seg.color}
                stroke="#fff"
                strokeWidth="2"
                style={{ cursor: "pointer" }}
                onMouseMove={(e) =>
                  handleMouseMove(e, {
                    label: seg.label,
                    value: seg.value,
                    color: seg.color,
                    percentage: seg.percentage,
                    spc: seg.spc,
                    pil: seg.pil,
                  })
                }
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </svg>

          {/* Center icon */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ pointerEvents: "none" }}
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Image src={iconSrc} alt="Chart Icon" width={32} height={32} />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="ml-4 flex flex-col justify-center gap-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: colors[i] }}
              />
              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/*
        TOOLTIP — How it works:
        ========================
        "anchor" div: width=0, height=0, positioned at cursor (left=mouseX, top=mouseY).

        Inside anchor, "tooltip-wrapper" uses:
          position: absolute
          bottom: 0   → wrapper's bottom edge = anchor's top = cursor Y
          left: 0     → wrapper's left edge = cursor X

        So the bottom-left corner of tooltip-wrapper = cursor. ✓

        Inside wrapper: box + arrow (arrow is absolute inside box).

        Arrow = CSS border trick:
          Two divs stacked — border-shadow (slightly bigger, #e5e7eb) + fill (white).
          position: absolute; bottom: -10px; left: 0
          border-top: 10px solid <color>
          border-right: 16px solid transparent
          → right-angle triangle, tip at bottom-left, pointing down-left.
      */}
      {tooltipData && (
        <div
          // 0×0 anchor at cursor
          style={{
            position: "absolute",
            left: mousePos.x,
            top: mousePos.y,
            width: 0,
            height: 0,
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          {renderTooltip ? (
            // Custom tooltip: user handles positioning themselves
            <div style={{ position: "absolute", bottom: 0, left: 0 }}>
              {renderTooltip(tooltipData)}
            </div>
          ) : (
            // Default tooltip
            <div
              style={{
                position: "absolute",
                bottom: 0, // bottom of this div = cursor Y
                left: 0, // left of this div = cursor X
                display: "inline-block",
              }}
            >
              {/* Box — arrow is absolute inside it */}
              <div
                style={{
                  position: "relative",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  paddingBottom: "18px", // room for arrow (10px) + gap (8px)
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
                }}
              >
                {/* Content */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "2px",
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      display: "inline-block",
                      background: tooltipData.color,
                      flexShrink: 0,
                    }}
                  />
                  {tooltipData.label}
                </div>
                <div style={{ color: "#6b7280" }}>
                  Value:{" "}
                  <strong style={{ color: "#374151" }}>
                    {tooltipData.value}
                  </strong>
                </div>
                <div style={{ color: "#6b7280" }}>
                  Share:{" "}
                  <strong style={{ color: "#374151" }}>
                    {tooltipData.percentage}%
                  </strong>
                </div>

                {/* Arrow border (outer, darker) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -11,
                    left: -1,
                    width: 0,
                    height: 0,
                    borderTop: "11px solid #e5e7eb",
                    borderRight: "17px solid transparent",
                  }}
                />
                {/* Arrow fill (inner, white) */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -10,
                    left: 0,
                    width: 0,
                    height: 0,
                    borderTop: "10px solid white",
                    borderRight: "16px solid transparent",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
