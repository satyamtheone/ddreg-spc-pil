"use client";
import React, { useState } from "react";
import { useFormikContext } from "formik";
import { PreviewDocumentSectionType } from "@/lib/redux/apiTypes";
import FormikTextarea from "@/components/FormikComponents/FormikTextArea";
import FormikInput from "@/components/FormikComponents/FormikInput";
import DynamicButton from "@/components/common/DynamicButton";
import { FaXmark } from "react-icons/fa6";

type Props = {
  section: PreviewDocumentSectionType;
  path: string;
};

type FormValues = {
  sections: PreviewDocumentSectionType[];
};

const FromSectionRenderer: React.FC<Props> = ({ section, path }) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  const [isPreview, setIsPreview] = useState(true);

  const childrenPath = `${path}.children`;

  const handleAddSubSection = () => {
    const children = section.children || [];

    const nextIndex = children.length + 1;
    const newId = `${section.id}.${nextIndex}`;

    const newSection: PreviewDocumentSectionType = {
      id: newId,
      title: "",
      content: "",
      type: "text",
      required: false,
      children: [],
      matched: false,
    };

    setFieldValue(childrenPath, [...children, newSection]);
  };

  const handleRemoveSection = () => {
    const parts = path.split(".");
    const index = Number(parts.pop());
    const parentPath = parts.join(".");

    const parentArray =
      parentPath === "sections"
        ? values.sections
        : parts.reduce((acc: any, key) => acc?.[key], values);

    const updated = parentArray.filter((_: any, i: number) => i !== index);

    setFieldValue(parentPath, updated);
  };

  const getContentValue = () => {
    return (
      path.split(".").reduce((acc: any, key) => acc?.[key], values)?.content ||
      ""
    );
  };

  return (
    <div className="mb-6 p-4 spcBNS rounded-[10px]">
      <div className="flex items-center gap-2 mb-6 ">
        <div className="font-semibold">{section.id}</div>

        {section.matched ? (
          <div className="font-semibold">{section.title}</div>
        ) : (
          <div className="w-full">
            <FormikInput
              name={`${path}.title`}
              placeholder="SECTION TITLE"
              onInput={(e: any) =>
                (e.target.value = e.target.value.toUpperCase())
              }
              containerMargin="mb-0"
            />
          </div>
        )}

        {!section.matched && (
          <div>
            <DynamicButton
              icon={<FaXmark size={20} />}
              variant="danger"
              onClick={handleRemoveSection}
            />
          </div>
        )}
      </div>

      {section.type === "text" && (
        <>
          {/* ✅ Toggle Button */}
          <div className="flex justify-end mb-2">
            <button
              type="button"
              onClick={() => setIsPreview((prev) => !prev)}
              className="text-xs px-3 py-1 border rounded cursor-pointer"
            >
              {isPreview ? "Edit" : "Preview"}
            </button>
          </div>

          {/* ✅ Conditional Rendering */}
          {isPreview ? (
            <div className="p-3 mb-4 border spcBNS rounded-lg animate-dialog-slide-down bg-gray-50 max-h-100 text-sm overflow-auto">
              {getContentValue() ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: getContentValue(),
                  }}
                />
              ) : (
                <div className="text-gray-400 text-sm">
                  No content to preview
                </div>
              )}
            </div>
          ) : (
            <FormikTextarea
              name={`${path}.content`}
              rows={6}
              placeholder="Write HTML Content..."
            />
          )}
        </>
      )}

      {section.children?.map((child, index) => (
        <FromSectionRenderer
          key={child.id}
          section={child}
          path={`${path}.children.${index}`}
        />
      ))}

      <button
        type="button"
        onClick={handleAddSubSection}
        className="mt-2 text-sm cursor-pointer text-gradient"
      >
        + Add Sub Section
      </button>
    </div>
  );
};

export default FromSectionRenderer;
