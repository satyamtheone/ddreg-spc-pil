"use client";
import { useState } from "react";
import { SpcSearchParams } from "./page";
import { useGetReferenceByIdQuery } from "@/lib/redux/slices/templateApi";
import { useQueryErrorHandler } from "@/components/hooks/useQueryErrorHandler";
import SectionEditor from "./sectionEditor";
import { useGetSingleDocumentVersionsQuery } from "@/lib/redux/slices/documentApi";

type NavigatorPageProps = {
  params?: SpcSearchParams;
};
const DocumentEditor: React.FC<NavigatorPageProps> = ({ params }) => {
  const [content, setContent] = useState<string>(``);
  const referenceId = params ? params.referenceId : "";
  const documentId = params ? params.documentId : "";
  const query = useGetReferenceByIdQuery(referenceId || "", {
    skip: !referenceId,
  });
  const data = useQueryErrorHandler(query, "Get Reference By Id");

  const documentQuery = useGetSingleDocumentVersionsQuery(
    { docId: documentId || "" },
    { skip: !documentId },
  );
  const documentData = useQueryErrorHandler(
    documentQuery,
    "Get Document By Id",
  );

  return (
    <div>
      <SectionEditor
        sections={data?.data?.sections || documentData?.data.sections || []}
      />
    </div>
  );
};

export default DocumentEditor;
