import React, { JSX } from "react";

type TemplateStatsCardProps = {
  stats?: string;
  title?: string;
  icon?: JSX.Element;
  bg?: string;
};

const TemplateStatsCard: React.FC<TemplateStatsCardProps> = ({
  stats,
  icon,
  title,
  bg,
}) => {
  return (
    <div className="spcBNS p-4 rounded-[10px] bg-white flex justify-between items-start gap-6  ">
      <div className="flex flex-col gap-1 items-start">
        <div className="text-4xl font-medium">{stats}</div>
        <div className="text-base font-normal">{title}</div>
      </div>
      <div
        className={`h-17 w-17 spcBNS p-2 rounded-xl flex justify-center items-center text-white ${bg}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default TemplateStatsCard;
