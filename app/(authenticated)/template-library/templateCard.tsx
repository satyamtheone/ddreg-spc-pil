import DynamicButton from "@/components/common/DynamicButton";
import MiniChip from "@/components/common/miniChip";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import { Template } from "@/lib/redux/apiTypes";
import { formatedDate } from "@/lib/utilMethods";
import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import ViewTemplateDrawer from "./viewTemplateDrawer";

type TemplatecardProps = {
  template: Template;
};

const Templatecard: React.FC<TemplatecardProps> = ({ template }) => {
  const { openDrawer } = useDrawer();
  return (
    <div className="spcBNS p-4 bg-white rounded-[10px] w-105 flex flex-col gap-2  ">
      <div className="flex justify-between items-center">
        <div className="p-3 spcBNS max-w-min rounded-lg bg-gradient">
          <IoDocumentTextOutline size={24} />
        </div>
        <div>
          <MiniChip status="Latest" />
        </div>
      </div>
      <div className="text-xl font-medium">{template?.name}</div>
      <div className="text-base font-normal text-zinc-800">
        Standard UK SPC template compliant with MHRA guidelines{" "}
      </div>
      <div className="text-xs font-normal text-neutral-400">
        {formatedDate(template?.createdAt)}
      </div>
      <div className="px-1 flex flex-col gap-2">
        <div className="text-xs font-normal text-zinc-800 flex justify-between ">
          <div>Country</div>
          <div className="text-base">{template?.type?.country?.code}</div>
        </div>
        <div className="text-xs font-normal text-zinc-800 flex justify-between ">
          <div>Agency</div>
          <div className="text-base">
            {template?.type?.country?.regulatoryBody}
          </div>
        </div>
        <div className="text-xs font-normal text-zinc-800 flex justify-between ">
          <div>Sections</div>
          <div className="text-base">{template?.sectionsCount}</div>
        </div>
        <div className="text-xs font-normal text-zinc-800 flex justify-between ">
          <div>Usage</div>
          <div className="text-base">{template?.usageCount} docs</div>
        </div>
        <div className="text-xs font-normal text-zinc-800 flex justify-between ">
          <div>Updated</div>
          <div className="text-base">{formatedDate(template?.updatedAt)}</div>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <DynamicButton
          text="Preview"
          variant="outline"
          icon={<MdOutlineRemoveRedEye size={20} />}
          onClick={() =>
            openDrawer({
              title: `${template?.name || "Template Preview"}`,
              children: <ViewTemplateDrawer templateId={template.id} />,
            })
          }
        />
        <DynamicButton
          text="Download"
          variant="outline"
          icon={<MdOutlineFileDownload size={20} />}
        />
      </div>
    </div>
  );
};

export default Templatecard;
