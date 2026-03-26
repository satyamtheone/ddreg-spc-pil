import MiniChip from "@/components/common/miniChip";
import React, { JSX } from "react";

type ContentBoxesProps = {
  title: string;
  subTitle?: string;
  chipText?: string;
};

const ContentBoxes: React.FC<ContentBoxesProps> = ({
  title,
  chipText,
  subTitle,
}) => {
  return (
    <div className="border-slate-300 border p-3 py-4 rounded-[10px]">
      <div className="flex flex-col gap-3">
        <div className="text-sm text-neutral-400 ">{title}</div>
        <div className="flex gap-4 flex-wrap">
          {subTitle && <div className="">{subTitle}</div>}
          {chipText && <MiniChip status={chipText} />}
        </div>
      </div>
    </div>
  );
};

export default ContentBoxes;
