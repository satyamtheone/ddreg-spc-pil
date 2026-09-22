"use client";
const GridSkeleton = () => {
  return (
    <div className=" w-full mt-4 flex flex-wrap  gap-4 ">
      <div className=" border-b border-slate-300  w-104 skeleton h-60 "></div>
      <div className=" border-b border-slate-300  w-104 skeleton h-60 "></div>
      <div className=" border-b border-slate-300  w-104 skeleton h-60 "></div>
      <div className=" border-b border-slate-300  w-104 skeleton h-60 "></div>
      <div className=" border-b border-slate-300  w-104 skeleton h-60 "></div>
      <div className=" border-b border-slate-300  w-104 skeleton h-60 "></div>
    </div>
  );
};

export default GridSkeleton;
