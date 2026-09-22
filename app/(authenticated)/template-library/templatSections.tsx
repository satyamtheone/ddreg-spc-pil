import { addSectionNumbers } from "@/lib/utilMethods";
import React, { useMemo } from "react";
import SectionItem from "./SectionItem";

type Props = {
  data: any;
};

const TemplateSections: React.FC<Props> = ({ data }) => {
  const sections = useMemo(() => {
    return addSectionNumbers(data?.sections || []);
  }, [data]);

  return (
    <div className=" p-4 spcBNS rounded-[10px] bg-purple-50 h-130 overflow-y-auto animate-dialog-slide-down">
      {sections.map((section) => (
        <SectionItem key={section.id} section={section} />
      ))}
    </div>
  );
};

export default TemplateSections;
