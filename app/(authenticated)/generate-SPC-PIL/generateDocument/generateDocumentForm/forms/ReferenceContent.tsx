import React from "react";
import ContentBoxes from "./contetntBoxes";
import ReferenceDrawerItem from "../../../references/referenceDrawerItem";
import ReferenceFormSkeleton from "@/components/common/skletons/referenceFormSkeleton";
import { GetReferenceByIdResponse } from "@/lib/redux/apiTypes";

type ReferenceContentProps = {
  data: GetReferenceByIdResponse | undefined;
  isLoading: boolean;
};

const ReferenceContent: React.FC<ReferenceContentProps> = ({
  data,
  isLoading,
}) => {
  return (
    <div className="spcBNS p-4 rounded-[10px]  ">
      <div className="grid grid-cols-12 gap-3 h-120">
        {isLoading ? (
          <ReferenceFormSkeleton />
        ) : (
          <>
            <div className="col-span-4  h-full overflow-auto animate-dialog-slide-down">
              <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                <ContentBoxes
                  title="Product Name"
                  subTitle={data?.data?.title}
                />
                <ContentBoxes
                  title="Country / Authority"
                  subTitle={data?.data?.type.country.name}
                />
                {/* <ContentBoxes title="Authority" subTitle="MHRA" />
            <ContentBoxes
              title="Active Ingredient"
              subTitle="Acetylsalicylic Acid"
            /> */}
                <ContentBoxes
                  title="Document Type"
                  chipText={data?.data?.schemaMeta?.type}
                />
                <ContentBoxes
                  title="Version"
                  subTitle={data?.data?.version}
                  chipText="Approved"
                />
                {/* <ContentBoxes title="Shelf life" subTitle="3 Years" /> */}
              </div>
            </div>
            <div className="col-span-8 border-slate-300 border p-4 bg-purple-50 rounded-[10px]  h-full overflow-auto animate-fadeIn  ">
              {data?.data?.sections.map((section, i) => (
                <ReferenceDrawerItem section={section} key={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReferenceContent;
