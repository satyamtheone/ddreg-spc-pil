"use client";
import DynamicButton from "@/components/common/DynamicButton";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import React, { useMemo, useState } from "react";
import { Section } from "@/lib/utilMethods";

export type PreviewDocumentSectionType = {
  id: string;
  title: string;
  content?: string;
  type: "text" | "group";
  required?: boolean;
  children: Section[];
  matched?: boolean;
};

type Props = {
  sections: Section[];
};

const DocumentPreviewNavigator = ({ sections }: Props) => {
  const flattenSections = (items: Section[]): Section[] => {
    const result: Section[] = [];

    const traverse = (list: Section[]) => {
      for (const item of list) {
        result.push(item);

        if (item.children?.length) {
          traverse(item.children);
        }
      }
    };

    traverse(items);
    return result;
  };

  const flatSections = useMemo(() => flattenSections(sections), [sections]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSection = flatSections[currentIndex];

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev < flatSections.length - 1 ? prev + 1 : prev,
    );
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSelectSection = (id: string) => {
    const index = flatSections.findIndex((s) => s.id === id);
    if (index !== -1) setCurrentIndex(index);
  };

  const SidebarSections = ({
    items,
    level = 0,
  }: {
    items: Section[];
    level?: number;
  }) => {
    return (
      <div className="space-y-1">
        {items.map((section) => (
          <div key={section.id}>
            <div
              onClick={() => handleSelectSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm cursor-pointer transition
              ${
                currentSection?.id === section.id
                  ? "bg-blue-100 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              style={{ paddingLeft: `${level * 16 + 12}px` }}
            >
              <strong>{section.id}.</strong> {section.title}
            </div>

            {section.children && section.children?.length > 0 && (
              <SidebarSections
                items={section?.children || []}
                level={level + 1}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-x-3 h-140 overflow-auto pb-2  ">
      <div className="col-span-4  p-3 h-full bg-white overflow-auto border shadow-md border-t-0 rounded-t-none  rounded-[10px]">
        <h3 className="text-sm font-semibold mb-3 text-gray-600  text-gradient">
          Document Sections
        </h3>
        <SidebarSections items={sections} />
      </div>

      <div className="col-span-8 flex flex-col h-full overflow-auto rounded-b-[10px] shadow-md">
        <div className="flex-1 overflow-auto p-6 border-l border-r bg-white">
          <h2 className="text-xl font-semibold">
            {currentSection?.id}. {currentSection?.title}
          </h2>
          <div
            className="mt-4 text-sm leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: currentSection?.content || "No content available",
            }}
          />
        </div>

        <div className="border-t px-4 py-1 flex items-center bg-purple-50 rounded-b-[10px] border justify-between">
          <div>
            <DynamicButton
              text="Previous Section"
              onClick={goPrev}
              size="slim"
              variant="card"
              className="min-w-max px-2"
              icon={<FaArrowLeft />}
              isSubmitting={currentIndex === 0}
            />
          </div>

          <span className="text-sm text-gray-500">
            Section {currentIndex + 1} out of {flatSections.length}
          </span>
          <div>
            <DynamicButton
              text=" Next Section"
              iconPosition="right"
              onClick={goNext}
              size="slim"
              variant="card"
              className="min-w-max px-2"
              icon={<FaArrowRight />}
              isSubmitting={currentIndex === flatSections.length - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewNavigator;
