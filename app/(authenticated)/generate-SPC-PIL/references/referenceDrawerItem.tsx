import DynamicButton from "@/components/common/DynamicButton";
import React from "react";

export type Section = {
  id: string;
  title: string;
  content: string;
  type: string;
  required: boolean;
  children?: Section[];
};

type SectionProps = {
  section: Section;
  level?: number;
};

const ReferenceDrawerItem: React.FC<SectionProps> = ({
  section,
  level = 0,
}) => {
  return (
    <div className="">
      <div className="rounded-md p-2 mb-2  text-zinc-800 ">
        <div className="flex justify-between items-center ">
          <div className="font-bold flex gap-3">
            <p>{section.id}.</p>
            <p>{section.title}</p>
          </div>
        </div>

        <div
          className=" mt-1"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </div>

      {section.children && section.children.length > 0 && (
        <div className="ml-4 border-l pl-2 border-gray-300">
          {section.children.map((child) => (
            <ReferenceDrawerItem
              key={child.id}
              section={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferenceDrawerItem;
