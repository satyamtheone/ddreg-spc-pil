"use client";

import { crudOperationChipColors } from "@/lib/utilMethods";

const MiniChip = ({ status, size }: { status: string; size?: "small" }) => {
  return (
    <div
      className={`${size === "small" ? "text-[10px] p-0.5" : "text-sm px-2 py-1"} max-h-min border max-w-max text-sm text-nowrap capitalize rounded-sm ${crudOperationChipColors({ variant: status }).text} ${crudOperationChipColors({ variant: status }).border} `}
    >
      {status}
    </div>
  );
};

export default MiniChip;
