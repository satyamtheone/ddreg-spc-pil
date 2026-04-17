"use client";
import { useState } from "react";
import { SpcSearchParams } from "./page";
import { useGetReferenceByIdQuery } from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import SectionEditor from "./sectionEditor";

type NavigatorPageProps = {
  params?: SpcSearchParams;
};
const DocumentEditor: React.FC<NavigatorPageProps> = ({ params }) => {
  const [content, setContent] = useState<string>(``);
  const referenceId = params ? params.referenceId : "";
  const query = useGetReferenceByIdQuery(referenceId || "");
  const data = useQueryErrorHandler(query, "Get Reference By Id");

  const handleSubmit = () => {
    console.log("Submitted HTML Content:");
    console.log(content);

    const response = {
      body: content,
      length: content.length,
      timestamp: new Date().toISOString(),
    };
    console.log("Mock API Response:", response);
  };

  return (
    <div>
      <SectionEditor sections={data?.data?.sections || []} />
    </div>
  );
};

export default DocumentEditor;
