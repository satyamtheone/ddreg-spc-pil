import MiniChip from "@/components/common/miniChip";
import { RepoDocument } from "@/lib/redux/apiTypes";
import { formatedDate } from "@/lib/utilMethods";
import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useDownloadPdf } from "@/components/hooks/useDownloadPdf";
import { IoMdCloudDownload } from "react-icons/io";
import { FaEdit, FaEye } from "react-icons/fa";
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
