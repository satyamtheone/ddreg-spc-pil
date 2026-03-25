import DynamicButton from "@/components/common/DynamicButton";
import MiniChip from "@/components/common/miniChip";
import { crudOperationChipColors } from "@/lib/utilMethods";
import { ProductDocument } from "@/lib/utils";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import SpcActionButtons from "./spcActionButtons";

type SpcGridCardProps = {
  item: ProductDocument;
};

const SpcGridCard: React.FC<SpcGridCardProps> = ({ item }) => {
  return (
    <div
      className={`shadow-md  rounded-[10px] py-4  relative flex flex-col gap-4 w-104 border ${crudOperationChipColors({ variant: item?.status[0] }).border} animate-dialog-slide-down`}
    >
      {item.status.find((f) => f === "Approved") && (
        <div className="absolute right-0 bg-emerald-400 p-1 text-sm font-semibold text-white px-4 rounded-l-3xl">
          <div>Approved</div>
        </div>
      )}
      <div
        className={` border-l-4 px-4  ${crudOperationChipColors({ variant: item?.status[0] }).border}`}
      >
        <div className=" text-sm font-normal text-neutral-400">
          Product Name
        </div>
        <div className=" font-semibold">{item?.productName} </div>
      </div>
      <div className="flex gap-4 px-4">
        <div>
          <MiniChip status={item?.type} />
        </div>
        <div>{item?.version}</div>
        <div>
          <MiniChip status={item?.status[0]} />
        </div>
        <div className="flex gap-1  items-center">
          <div>
            <CiCalendar size={24} />
          </div>
          <span>{item?.lastModified}</span>
        </div>
      </div>
      <div className="flex justify-between gap-4 bg-purple-50 px-2 py-1 rounded-sm ">
        <div>
          <div className=" text-sm font-normal text-neutral-400">
            Active Ingredient
          </div>
          <div className="">{item?.activeIngredient}</div>
        </div>
        <div>
          <div className=" text-sm font-normal text-neutral-400">Country</div>
          <div className="">{item?.country}</div>
        </div>
      </div>

      <SpcActionButtons  item={item} />
    </div>
  );
};

export default SpcGridCard;
