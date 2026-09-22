import { Reference, Section } from "@/lib/redux/apiTypes";
import { useGetReferenceByIdQuery } from "@/lib/redux/slices/templateApi";
import React from "react";
import ReferenceDrawerItem from "./referenceDrawerItem";
import ContentBoxes from "../generateDocument/generateDocumentForm/forms/contetntBoxes";
import { formatedDate } from "@/lib/utilMethods";
import DynamicButton from "@/components/common/DynamicButton";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import TemplateDrawerSkeleton from "@/components/common/skletons/templateDrwaerSkeleton";
import { useSearchParams } from "next/navigation";
import { useNavigation } from "@/components/hooks/useNavigation";
import { useDrawer } from "@/components/hooks/DrawerProvider";
import { MdVisibility } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";

type ViewReferenceDrawerProps = {
  references: Reference;
};

const ViewReferenceDrawer: React.FC<ViewReferenceDrawerProps> = ({
  references,
}) => {
  const { goTo } = useNavigation();
  const { closeDrawer } = useDrawer();
  const searchParams = useSearchParams();
  const tempId = searchParams.get("templateId");
  const templateId = tempId ? tempId : "";
  const query = useGetReferenceByIdQuery(references.id);
  const data = useQueryErrorHandler(query, "Get Reference By Id");

  return (
    <div className="w-full h-full flex flex-col gap-4 mt-4 justify-between">
      {query.isLoading ? (
        <TemplateDrawerSkeleton />
      ) : (
        <>
          <div className="flex flex-col gap-4 animate-dialog-slide-down">
            <div className="grid grid-cols-2  gap-4">
              <ContentBoxes
                title="Country / Authority"
                subTitle={data?.data?.type?.country?.name}
              />
              <ContentBoxes
                title="Regulatory Body"
                subTitle={data?.data?.type?.country?.regulatoryBody}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <ContentBoxes
                title="Approval Date"
                subTitle={formatedDate(data?.data?.updatedAt || "")}
              />
              <ContentBoxes
                title="Version"
                subTitle={data?.data?.version}
                chipText="Latest"
              />
            </div>
          </div>
          <div className="spcBNS bg-purple-50 p-4 h-8/12 overflow-auto rounded-[10px] mb-15 animate-dialog-slide-down">
            {data?.data &&
              data?.data?.sections.map((section, i) => (
                <ReferenceDrawerItem section={section} key={i} />
              ))}
          </div>
        </>
      )}
      <div className="absolute left-0 right-0 flex gap-4 bg-white border-t border-gray-300  bottom-0">
        <div className="w-full px-4 py-2">
          <DynamicButton
            isSubmitting={query.isLoading || query.isFetching}
            icon={<FaCloudDownloadAlt size={24} />}
            size="slim"
            variant="submit"
            text={"Download document"}
            onClick={() => {
              window.open(data?.data?.referenceFile?.key, "_blank");
            }}
          />
        </div>
        <div className="w-full px-4 py-2">
          <DynamicButton
            isSubmitting={query.isLoading || query.isFetching}
            icon={<MdVisibility size={24} />}
            size="slim"
            variant="outline"
            text={"View In Navigator"}
            onClick={() => {
              goTo(
                `/document-repository/previewDocument?referenceId=${references.id}`,
              );
              closeDrawer();
            }}
          />
        </div>
        <div className="w-full px-4 py-2">
          <DynamicButton
            isSubmitting={query.isLoading || query.isFetching}
            icon={<IoMdCheckmarkCircleOutline size={24} />}
            size="slim"
            variant="submit"
            text={"Select As A Reference"}
            onClick={() => {
              goTo(
                `/generate-SPC-PIL/generateDocument?referenceId=${references.id}&templateId=${templateId}`,
              );
              closeDrawer();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewReferenceDrawer;
