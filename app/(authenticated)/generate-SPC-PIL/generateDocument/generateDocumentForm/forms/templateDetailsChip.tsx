import { Template } from "@/lib/redux/apiTypes";
import { formatedDate } from "@/lib/utilMethods";
import React from "react";
import { MdInfoOutline } from "react-icons/md";

type TemplateDetailsChipProps = {
  templateById: Template | undefined;
};

const TemplateDetailsChip: React.FC<TemplateDetailsChipProps> = ({
  templateById,
}) => {
  return (
    <div className="p-4 rounded-[10px] shadow-md shadow-cyan-100 border-cyan-500 border flex flex-col gap-2 bg-sky-500/3">
      <div>Template Details</div>
      <div className="grid grid-cols-3 justify-between gap-4">
        <div>
          <div className="text-sm text-neutral-400 mb-2">Template Name</div>
          <div>{templateById?.name}</div>
        </div>
        <div>
          <div className="text-sm text-neutral-400 mb-2">Version</div>
          <div>{templateById?.version}</div>
        </div>
        <div>
          <div className="text-sm text-neutral-400 mb-2">Release Date</div>
          <div>{formatedDate(templateById?.updatedAt || "")}</div>
        </div>
      </div>
      <div className="p-4  rounded-[10px] shadow-md shadow-emerald-100 border-emerald-500 border flex gap-2 items-center bg-emerald-50">
        <div className="flex justify-center items-center h-10 w-10 bg-emerald-100 rounded-[10px]">
          <MdInfoOutline className="text-green-600" size={24} />
        </div>
        <div className="text-zinc-800 text-sm">
          This is the current approved template for{" "}
          {templateById?.type.country.name}
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailsChip;
