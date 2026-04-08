"use client";
import React from "react";
import CalenderComponent from "./calenderComponent";

type PageProps = {};

const taskList = [
  { id: 1, title: "Meeting", date: "2026-04-08" },
  { id: 2, title: "Deploy", date: "2026-06-09" },
];

const Page: React.FC<PageProps> = (props) => {
  return (
    <CalenderComponent
      renderCell={(date) => {
        const tasks = taskList.filter(
          (t) => new Date(t.date).toDateString() === date.toDateString(),
        );

        return (
          <>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="text-xs  text-white rounded px-1 mb-1"
              >
                <div className="text-black">{task.title}</div>
                <div className="w-full bg-gray-300 rounded-xl h-3">
                  <div
                    className="bg-gradient h-3 rounded-xl transition-all"
                    style={{ width: `30%` }}
                  />
                </div>
              </div>
            ))}
          </>
        );
      }}
    />
  );
};

export default Page;
