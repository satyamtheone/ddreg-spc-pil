"use client";
import MiniChip from "@/components/common/miniChip";
import { crudOperationChipColors, formatedDate } from "@/lib/utilMethods";
import { SpcTableColumns } from "@/lib/utils";
import React from "react";
import SpcActionButtons from "./spcActionButtons";
import { Reference } from "@/lib/redux/apiTypes";

type SPCTableProps = {
  references: Reference[];
};

const SPCTable: React.FC<SPCTableProps> = ({ references }) => {
  return (
    <div className="">
      <div className="w-full overflow-x-auto pb-2 ">
        <div className="table-container spcBNS rounded-[10px] ">
          {/* Header */}
          <div className="grid grid-cols-9  text-white bg-sky-600 rounded-t-[10px] pl-1">
            {SpcTableColumns.map((p: any, index: number) => (
              <div key={index} className="table-header-cell   ">
                {p.name}
              </div>
            ))}

            <div className="table-header-lastCell">Action</div>
          </div>

          {/* Rows */}
          <div className="table-body ">
            {references.length > 0 ? (
              references.map((item, index) => (
                <div
                  key={index}
                  className={`${index % 2 === 0 ? "bg-purple-50" : ""} ${
                    index + 1 === references.length ? "rounded-b-[10px]" : ""
                  } transition-colors duration-150 group grid  animate-dialog-slide-down
                  } grid-cols-9 text-sm border-l-4 border-b-[0.5px] ${crudOperationChipColors({ variant: "Approved" }).border} `}
                >
                  <div className="table-body-cell">{item?.name}</div>
                  <div className="table-body-cell">
                    {item?.activeIngredient || "-"}
                  </div>
                  <div className="table-body-cell">
                    {item?.type?.country?.name}
                  </div>
                  <div className="table-body-cell">{item?.type?.name}</div>
                  <div className="table-body-cell">{item?.version}</div>
                  <div className="table-body-cell">
                    {formatedDate(item?.updatedAt)}
                  </div>

                  <div className="table-body-cell flex items-center gap-2">
                    <MiniChip status={"Approved"} />
                  </div>
                  <div className="col-span-2 flex gap-4 items-center w-full">
                    <SpcActionButtons references={item} />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center border border-gray-200">
                No data found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SPCTable;
