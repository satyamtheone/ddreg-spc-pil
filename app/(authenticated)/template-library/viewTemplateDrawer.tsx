import { useGetTemplateByIdQuery } from "@/lib/redux/slices/templateApi";
import React from "react";
import TemplateSections from "./templatSections";
import ContentBoxes from "../generate-SPC-PIL/generateDocument/generateDocumentForm/forms/contetntBoxes";
import { formatedDate } from "@/lib/utilMethods";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import TemplateDrawerSkeleton from "@/components/common/skletons/templateDrwaerSkeleton";
import DynamicButton from "@/components/common/DynamicButton";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigation } from "@/components/hooks/useNavigation";
import { useDrawer } from "@/components/hooks/DrawerProvider";

type ViewTemplateDrawerProps = {
  templateId: string;
};

const ViewTemplateDrawer: React.FC<ViewTemplateDrawerProps> = ({
  templateId,
}) => {
  const { goTo } = useNavigation();
  const { closeDrawer } = useDrawer();
  const query = useGetTemplateByIdQuery(templateId);
  const data = useQueryErrorHandler(query, "Get Template By Id");
  return (
    <div className="flex flex-col gap-6 mt-4 h-full pb-13 scrollbar-hide">
      {query.isLoading ? (
        <TemplateDrawerSkeleton />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2  gap-4">
              <ContentBoxes
                title="Country / Authority"
                subTitle={data?.data?.type?.country?.name}
              />
              <ContentBoxes
                title="SourceType"
                subTitle={data?.data?.sourceType}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <ContentBoxes
                title="Approval Date"
                subTitle={formatedDate(data?.data?.updatedAt || "")}
              />
              <ContentBoxes
                title="Document Type"
                chipText={data?.data?.schemaMeta?.type}
              />
              <ContentBoxes
                title="Version"
                subTitle={data?.data?.version}
                chipText="Latest"
              />
            </div>
          </div>

          <TemplateSections data={data?.data} />
        </>
      )}
      <div className="absolute left-0 right-0 bg-white border-t border-gray-300  bottom-0">
        <div className="w-full px-4 py-2">
          <DynamicButton
            isSubmitting={query.isLoading || query.isFetching}
            icon={<IoMdCheckmarkCircleOutline size={24} />}
            size="slim"
            variant="submit"
            text={"Select As A template"}
            onClick={() => {
              goTo(
                `/generate-SPC-PIL?templateId=${templateId}&countryCode=${data?.data?.type?.country?.code}&type=${data?.data?.type?.name}`,
              );
              closeDrawer();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTemplateDrawer;


