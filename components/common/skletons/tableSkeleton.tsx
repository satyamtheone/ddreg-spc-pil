"use client";
const TableSkeleton = () => {
  return (
    <div className="rounded-[10px] border border-slate-300 w-full p-4 mt-4 flex flex-col gap-2 ">
      <div className=" border-b border-slate-300 w-full skeleton h-10 "></div>
      <div className=" border-b border-slate-300 w-full skeleton h-16 "></div>
      <div className=" border-b border-slate-300 w-full skeleton h-16 "></div>
      <div className=" border-b border-slate-300 w-full skeleton h-16 "></div>
      <div className=" border-b border-slate-300 w-full skeleton h-16 "></div>
    </div>
  );
};

export default TableSkeleton;
