"use client";

import {
  endOfWeek,
  getMonthGrid,
  getWeekGrid,
  startOfWeek,
} from "@/lib/calendar";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

type ViewMode = "month" | "week";

type Props = {
  renderCell?: (date: Date) => React.ReactNode;
};

export default function calenderComponent({ renderCell }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewMode>("month");

  const today = new Date();

  const days =
    view === "month" ? getMonthGrid(currentDate) : getWeekGrid(currentDate);

  const next = () => {
    const d = new Date(currentDate);
    if (view === "month") d.setMonth(d.getMonth() + 1);
    else d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const prev = () => {
    const d = new Date(currentDate);
    if (view === "month") d.setMonth(d.getMonth() - 1);
    else d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const isToday = (date: Date) => date.toDateString() === today.toDateString();

  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

  const monthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const weekLabel = () => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    return `Week of ${start.getDate()} to ${end.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    })}`;
  };

  const isDateInCurrentMonth = (date: Date) => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  };

  return (
    <div className="w-full ">
      {/* Header */}

      <div className="grid grid-cols-3 mb-4 animate-dialog-slide-down ">
        <div className="flex items-center gap-2 ">
          <FaRegCalendarAlt />
          <h2 className="text-lg font-semibold">{monthYear}</h2>
          {view === "week" && (
            <p className="text-sm text-gray-500">{weekLabel()}</p>
          )}
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            onClick={prev}
            className="px-3 py-1 custom-button-hover-classes bg-gray-200 rounded"
          >
            ◀
          </button>
          <button
            onClick={next}
            className="px-3 py-1 custom-button-hover-classes bg-gray-200 rounded"
          >
            ▶
          </button>
        </div>
        <div className="flex justify-end items-center gap-2 ">
          <button
            onClick={() => setView("month")}
            className={`px-3 py-1 rounded cursor-pointer custom-button-hover-classes ${
              view === "month" ? "bg-gradient text-white" : "bg-gray-200"
            }`}
          >
            Month
          </button>

          <button
            onClick={() => setView("week")}
            className={`px-3 py-1 rounded cursor-pointer custom-button-hover-classes ${
              view === "week" ? "bg-gradient text-white" : "bg-gray-200"
            }`}
          >
            Week
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center font-semibold rounded-[10px]  animate-dialog-slide-down  rounded-b-none bg-gradient ">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="border-l  py-4 border-gray-300">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className={`grid grid-cols-7 gap-2 p-2 bg-white  shadow-md  `}>
        {days.map((date) => {
          const weekend = isWeekend(date);
          const todayCell = isToday(date);

          return (
            <div
              key={date.toISOString()}
              className={` spcBNS rounded-[10px] ${isDateInCurrentMonth(date) ? "bg-sky-600/20" : "bg-teal-500/20"} min-h-28 flex flex-col  animate-dialog-slide-down
               
                ${todayCell ? "border-blue-500 bg-blue-500/10 border-2" : ""}
              `}
            >
              <span
                className={`text-xs font-bold  m-2 flex justify-between items-center
                  ${todayCell ? "text-blue-600 font-bold" : "text-gray-600"}
                `}
              >
                <span>{date.getDate()}</span> {todayCell && <span>Today</span>}
              </span>
              {weekend && (
                <div className=" flex justify-center h-full items-center">
                  week off
                </div>
              )}
              <div className="overflow-x-visible">{renderCell?.(date)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
