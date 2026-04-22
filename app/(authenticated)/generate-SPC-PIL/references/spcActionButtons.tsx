import DynamicButton from "@/components/common/DynamicButton";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import { Reference } from "@/lib/redux/apiTypes";
import React from "react";
import { FaEye } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ViewReferenceDrawer from "./viewReferenceDrawer";
import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/components/hooks/useNavigation";

type SpcActionButtonsProps = { references: Reference };

const SpcActionButtons: React.FC<SpcActionButtonsProps> = ({ references }) => {
const { goTo } = useNavigation();
  const searchParams = useSearchParams();
  const tempId = searchParams.get("templateId");
  const templateId = tempId ? tempId : "";
  const { openDrawer } = useDrawer();
  const handleNavigate = () => {
    localStorage.setItem(
      "multi-step-form",
      JSON.stringify({ formData: {}, step: 1 }),
    );
    goTo(
      `/generate-SPC-PIL/generateDocument?referenceId=${references.id}&templateId=${templateId}`,
    );
  };
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
        onClick={() => handleNavigate()}
      />
    </div>
  );
};

export default SpcActionButtons;
