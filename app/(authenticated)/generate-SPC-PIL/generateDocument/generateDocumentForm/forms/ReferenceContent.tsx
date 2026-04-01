import React from "react";
import ContentBoxes from "./contetntBoxes";
import { useGetReferenceByIdQuery } from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import ReferenceDrawerItem from "../../../references/referenceDrawerItem";

type ReferenceContentProps = { referenceId: string };

const ReferenceContent: React.FC<ReferenceContentProps> = ({ referenceId }) => {
  const query = useGetReferenceByIdQuery(referenceId);
  const data = useQueryErrorHandler(query, "Get Reference By Id");
  return (
    <div className="spcBNS p-4 rounded-[10px]  ">
      <div className="grid grid-cols-12 gap-3 h-120">
        <div className="col-span-4  h-full overflow-auto animate-dialog-slide-down">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <ContentBoxes title="Product Name" subTitle="Aspirin 100mg" />
            <ContentBoxes
              title="Country / Authority"
              subTitle="United Kingdom"
            />
            <ContentBoxes title="Authority" subTitle="MHRA" />
            <ContentBoxes
              title="Active Ingredient"
              subTitle="Acetylsalicylic Acid"
            />
            <ContentBoxes title="Document Type" chipText="SPC" />
            <ContentBoxes title="Version" subTitle="3.1" chipText="Approved" />
            <ContentBoxes title="Shelf life" subTitle="3 Years" />

            <ContentBoxes title="Version" subTitle="3.1" chipText="Latest" />
          </div>
        </div>
        <div className="col-span-8 border-slate-300 border p-4 bg-purple-50 rounded-[10px]  h-full overflow-auto animate-dialog-slide-down ">
          {data?.data?.sections.map((section, i) => (
            <ReferenceDrawerItem section={section} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferenceContent;
