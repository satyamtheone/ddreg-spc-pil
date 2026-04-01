import DynamicButton from "@/components/common/DynamicButton";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import { goto } from "@/lib/navigation";
import { Reference } from "@/lib/redux/apiTypes";
import React from "react";
import { FaEye } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ViewReferenceDrawer from "./viewReferenceDrawer";

type SpcActionButtonsProps = { references: Reference };

const SpcActionButtons: React.FC<SpcActionButtonsProps> = ({ references }) => {
  const { openDrawer } = useDrawer();
  return (
    <div className="flex gap-4 w-full px-4">
      <DynamicButton
        variant="card"
        text="Preview"
        size="slim"
        icon={<FaEye size={20} />}
        onClick={() =>
          openDrawer({
            width: "w-2/3",
            title: `${references.name}`,
            children: <ViewReferenceDrawer references={references} />,
          })
        }
      />

      <DynamicButton
        variant="card"
        text="Select"
        size="slim"
        icon={<IoMdCheckmarkCircleOutline size={20} />}
        iconPosition="right"
        onClick={() =>
          goto(
            `/generate-SPC-PIL/generateDocument?referenceId=${references.id}`,
          )
        }
      />
    </div>
  );
};

export default SpcActionButtons;
