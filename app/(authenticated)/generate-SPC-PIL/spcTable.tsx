"use client";
import MiniChip from "@/components/common/miniChip";
import { crudOperationChipColors } from "@/lib/utilMethods";
import { productDocuments, SpcTableColumns } from "@/lib/utils";
import React from "react";
import SpcActionButtons from "./spcActionButtons";

type SPCTableProps = {};

const SPCTable: React.FC<SPCTableProps> = (props) => {
  const isLoading = false;
  return (
    <div className="">
      <div className="w-full overflow-x-auto pb-2 animate-fadeIn ">
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
            {productDocuments.length > 0 ? (
              productDocuments.map((item, index) => (
                <div
                  key={index}
                  className={`${index % 2 === 0 ? "bg-purple-50" : ""} ${
                    index + 1 === productDocuments.length
                      ? "rounded-b-[10px]"
                      : ""
                  } transition-colors duration-150 group grid  ${
                    isLoading
                      ? "pointer-events-none animate-pulse opacity-20"
                      : ""
                  } grid-cols-9 text-sm border-l-4 border-b-[0.5px] ${crudOperationChipColors({ variant: item?.status[0] }).border} `}
                >
                  <div className="table-body-cell">{item?.productName}</div>
                  <div className="table-body-cell">
                    {item?.activeIngredient}
                  </div>
                  <div className="table-body-cell">{item?.country}</div>
                  <div className="table-body-cell">{item?.type}</div>
                  <div className="table-body-cell">{item?.version}</div>
                  <div className="table-body-cell">{item?.lastModified}</div>

                  <div className="table-body-cell flex items-center gap-2">
                    {item?.status.map((p, i) => (
                      <MiniChip status={p} key={i} />
                    ))}
                  </div>
                  <div className="col-span-2 flex gap-4 items-center w-full">
                    <SpcActionButtons item={item} />
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
