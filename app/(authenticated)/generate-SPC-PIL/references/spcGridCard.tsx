"use client";
import MiniChip from "@/components/common/miniChip";
import { crudOperationChipColors, formatedDate } from "@/lib/utilMethods";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import SpcActionButtons from "./spcActionButtons";
import { Reference } from "@/lib/redux/apiTypes";

type SpcGridCardProps = {
  item: Reference;
};

const SpcGridCard: React.FC<SpcGridCardProps> = ({ item }) => {
  return (
    <div
      className={`shadow-md  rounded-[10px] py-4  relative flex flex-col justify-between gap-4 w-104 border ${crudOperationChipColors({ variant: "Approved" }).border} animate-dialog-slide-down`}
    >
      <div className="absolute right-0 bg-emerald-400 p-1 top-3 text-sm font-semibold text-white px-4 rounded-l-3xl">
        <div>Approved</div>
      </div>

      <div
        className={` border-l-4 px-4  ${crudOperationChipColors({ variant: "Approved" }).border}`}
      >
        <div className=" text-sm font-normal text-neutral-400">
          Product Name
        </div>
        <div className=" font-semibold">{item?.name} </div>
      </div>
      <div className="flex gap-4 px-4">
        <div>
          <MiniChip status={item?.type?.name} />
        </div>
        <div>{item?.version}</div>
        <div>
          <MiniChip status={"Approved"} />
        </div>
        <div className="flex gap-1  items-center">
          <div>
            <CiCalendar size={24} />
          </div>
          <span>{formatedDate(item?.updatedAt)}</span>
        </div>
      </div>
      <div className="flex justify-between gap-4 bg-purple-50 px-2 py-1 rounded-sm ">
        <div
          data-tip={item?.activeIngredient}
          className={`${item?.activeIngredient && item?.activeIngredient?.length > 24 ? "tooltip tooltip-info tooltip-top" : ""}`}
        >
          <div className=" text-sm font-normal text-neutral-400">
            Active Ingredient
          </div>
          <div className="line-clamp-2">{item?.activeIngredient}</div>
        </div>
        <div>
          <div className=" text-sm font-normal text-neutral-400">Country</div>
          <div className=""> {item?.type?.country?.name}</div>
        </div>
      </div>
      <SpcActionButtons references={item} />
    </div>
  );
};

export default SpcGridCard;
