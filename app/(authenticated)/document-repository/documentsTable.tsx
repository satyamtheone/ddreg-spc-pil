import { RepoDocument } from "@/lib/redux/apiTypes";
import React from "react";
import DocumentTableRow from "./documentTableRow";

type DocumentsTableProps = {
  documents: RepoDocument[];
};

const DocumentsTable: React.FC<DocumentsTableProps> = ({ documents }) => {
  return (
    <div className="flex flex-col gap-4 pt-4">
      {documents.map((document, index) => (
        <DocumentTableRow
          document={document as any}
          index={index}
          key={index}
          isParent
        />
      ))}
    </div>
  );
};

export default DocumentsTable;
