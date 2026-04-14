import MiniChip from "@/components/common/miniChip";
import { RepoDocument } from "@/lib/redux/apiTypes";
import { formatedDate } from "@/lib/utilMethods";
import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMdCloudDownload } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useDownloadPdf } from "@/components/hooks/useDownloadPdf";

type DocumenrsTableProps = {
  documents: RepoDocument[];
};

const DocumenrsTable: React.FC<DocumenrsTableProps> = ({ documents }) => {
  const { download } = useDownloadPdf();
  return (
    <div>
      {documents.map((document, index) => (
        <div
          className={`border border-gray-300 grid grid-cols-10 shadow-md rounded-xl animate-dialog-slide-down px-4 mt-4 ${index % 2 === 0 ? "bg-purple-50" : ""}`}
          key={index}
        >
          <div className="flex gap-2 items-start border-r p-4 col-span-2">
            <div className="bg-gradient p-1 h-10 w-10 rounded-md shadow-md text-white">
              <IoDocumentTextOutline strokeWidth={1} size={30} />
            </div>
            <div>
              <div className="text-sm text-gray-400">Product Name</div>
              <div>{document?.title}</div>
            </div>
          </div>
          <div className="flex gap-2 items-start border-r p-4 col-span-2">
            <div>
              <div className="text-sm text-gray-400">Country</div>
              <div>{document?.country}</div>
            </div>
          </div>
          <div className="flex gap-2 items-start border-r p-4 col-span-1">
            <div>
              <div className="text-sm text-gray-400">Type</div>
              <div>
                <MiniChip status={"type"} />
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start border-r p-4 col-span-1">
            <div>
              <div className="text-sm text-gray-400">Version</div>
              <div>{document?.currentVersion?.versionNumber}</div>
            </div>
          </div>
          <div className="flex gap-2 items-start border-r p-4 col-span-1">
            <div>
              <div className="text-sm text-gray-400">Last Modified</div>
              <div>{formatedDate(document.createdAt)}</div>
            </div>
          </div>
          <div className="flex gap-2 items-start overflow-hidden border-r p-4 col-span-1">
            <div>
              <div className="text-sm text-gray-400">Author</div>
              <div className="line-clamp-1 text-clip ">
                {" "}
                {document.createdById}
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start p-4 col-span-1">
            <div>
              <div className="text-sm text-gray-400">Status</div>
              <div>
                <MiniChip status={document.currentVersion.status} />
              </div>
            </div>
          </div>
          {/* <div className="flex gap-2 items-start p-4 col-span-3">
            <div>
              <div className="text-sm text-gray-400">Actions</div>
              <div className="flex gap-2 text-teal-900">
                <div className="custom-button-hover-classes p-2 bg-white border">
                  <IoMdCloudDownload size={20} />
                </div>
                <div className="custom-button-hover-classes p-2 bg-white border">
                  <FaEye size={20} />
                </div>
                <div className="custom-button-hover-classes p-2 bg-white  border">
                  <FaEdit size={20} />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default DocumenrsTable;
