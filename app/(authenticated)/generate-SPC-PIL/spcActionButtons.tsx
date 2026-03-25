import DynamicButton from "@/components/common/DynamicButton";
import { goto } from "@/lib/navigation";
import { ProductDocument } from "@/lib/utils";
import React from "react";
import { FaEye } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type SpcActionButtonsProps = { item: ProductDocument };

const SpcActionButtons: React.FC<SpcActionButtonsProps> = ({ item }) => {
  return (
    <div className="flex gap-4 w-full px-4">
      <DynamicButton
        variant="card"
        text="Preview"
        size="slim"
        icon={<FaEye size={20} />}
      />

      <DynamicButton
        variant="card"
        text="Select"
        size="slim"
        icon={<IoMdCheckmarkCircleOutline size={20} />}
        iconPosition="right"
        onClick={() => goto("/generate-SPC-PIL/generateDocument")}
      />
    </div>
  );
};

export default SpcActionButtons;
