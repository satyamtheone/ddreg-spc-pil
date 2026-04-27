import { RepoDocument } from "@/lib/redux/apiTypes";
import React from "react";
import { useDownloadPdf } from "@/components/hooks/useDownloadPdf";
import DocumentTableRow from "./documentTableRow";

type DocumentsTableProps = {
  documents: RepoDocument[];
};

const DocumentsTable: React.FC<DocumentsTableProps> = ({ documents }) => {
  const { download } = useDownloadPdf();
  return (
    <div className="flex flex-col gap-4 pt-4">
      {documents.map((document, index) => (
        <DocumentTableRow
          document={document}
          index={index}
          key={index}
          isParent
        />
      ))}
    </div>
  );
};

export default DocumentsTable;
